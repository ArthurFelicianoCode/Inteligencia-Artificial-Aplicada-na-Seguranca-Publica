import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell } from 'recharts';
import { EstatisticaCriminal } from '../../utils/mockData';

interface StatsPanelProps {
  data: EstatisticaCriminal[]; // filtered by everything including year
  fullHistory: EstatisticaCriminal[]; // filtered by everything EXCEPT year (so we can show time series)
}

export function StatsPanel({ data, fullHistory }: StatsPanelProps) {
  
  // Aggregate occurrences over years
  const timeData = useMemo(() => {
    const grouped = fullHistory.reduce((acc, curr) => {
      if (!acc[curr.ano]) {
        acc[curr.ano] = { name: curr.ano.toString(), ano: curr.ano, roubo_veiculo: 0, furto_veiculo: 0, homicidio: 0, taxaMedia: 0, total: 0 };
      }
      if (curr.delito === 'roubo_veiculo') acc[curr.ano].roubo_veiculo += curr.ocorrencia;
      if (curr.delito === 'furto_veiculo') acc[curr.ano].furto_veiculo += curr.ocorrencia;
      if (curr.delito === 'homicidio') acc[curr.ano].homicidio += curr.ocorrencia;
      acc[curr.ano].total += curr.ocorrencia;
      acc[curr.ano].taxaMedia += curr.taxa_de_delito;
      return acc;
    }, {} as Record<number, any>);
    
    // Average taxa Media for each year based on number of items contributing
    Object.keys(grouped).forEach(k => {
      const numItems = fullHistory.filter(f => f.ano.toString() === k).length || 1;
      grouped[Number(k)].taxaMedia = (grouped[Number(k)].taxaMedia / numItems).toFixed(1);
    });

    return Object.values(grouped).sort((a, b) => a.ano - b.ano);
  }, [fullHistory]);

  // Aggregate by city for the current selected year
  const cityData = useMemo(() => {
    const grouped = data.reduce((acc, curr) => {
      const name = curr.municipio.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
      if (!acc[name]) acc[name] = { name, ocorrencias: 0, taxa: 0 };
      acc[name].ocorrencias += curr.ocorrencia;
      // if multiple delitos, sum taxa or average? Let's average.
      return acc;
    }, {} as Record<string, { name: string, ocorrencias: number, taxa: number }>);

    return Object.values(grouped).sort((a, b) => b.ocorrencias - a.ocorrencias);
  }, [data]);

  const totalOcorrencias = data.reduce((sum, curr) => sum + curr.ocorrencia, 0);
  const avgTaxa = data.length > 0 ? (data.reduce((sum, curr) => sum + curr.taxa_de_delito, 0) / data.length).toFixed(1) : '0';

  return (
    <div className="h-full flex px-4 gap-6 bg-transparent overflow-x-auto">
      
      {/* KPI Cards */}
      <div className="flex flex-col gap-3 min-w-[220px] shrink-0">
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex-1 flex flex-col justify-center relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500 rounded-l"></div>
          <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-1">Total Ocorrências</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-white tabular-nums tracking-tight">{totalOcorrencias}</span>
            <span className="text-xs text-neutral-500">registros</span>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex-1 flex flex-col justify-center relative overflow-hidden group hover:border-red-500/50 transition-colors">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500 rounded-l"></div>
          <span className="text-xs text-neutral-400 font-semibold uppercase tracking-wider mb-1">Taxa de Delito (Média)</span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-black text-red-400 tabular-nums tracking-tight">{avgTaxa}</span>
            <span className="text-xs text-neutral-500">por 10k hab.</span>
          </div>
        </div>
      </div>

      {/* Time Series Chart */}
      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col min-w-[350px] shrink-0">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xs text-neutral-300 font-bold uppercase tracking-wider">Evolução Histórica</h3>
        </div>
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0">
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart data={timeData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <defs key="defs">
                  <linearGradient id="colorRoubo" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorFurto" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorHomicidio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#9333ea" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#9333ea" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#262626" vertical={false} />
                <XAxis key="xaxis" dataKey="name" stroke="#525252" fontSize={11} tickLine={false} axisLine={false} dy={10} />
                <YAxis key="yaxis" stroke="#525252" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  key="tooltip"
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ color: '#e5e5e5', fontSize: '13px' }}
                  labelStyle={{ color: '#a3a3a3', marginBottom: '4px', fontSize: '12px' }}
                />
                <Legend key="legend" iconType="circle" wrapperStyle={{ fontSize: '12px', color: '#a3a3a3', paddingTop: '10px' }} />
                <Area key="area1" name="Roubo" type="monotone" dataKey="roubo_veiculo" stroke="#f43f5e" fillOpacity={1} fill="url(#colorRoubo)" strokeWidth={2} />
                <Area key="area2" name="Furto" type="monotone" dataKey="furto_veiculo" stroke="#eab308" fillOpacity={1} fill="url(#colorFurto)" strokeWidth={2} />
                <Area key="area3" name="Homicídio" type="monotone" dataKey="homicidio" stroke="#9333ea" fillOpacity={1} fill="url(#colorHomicidio)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Cities Chart */}
      <div className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col min-w-[300px] shrink-0 max-w-[400px]">
        <h3 className="text-xs text-neutral-300 font-bold uppercase tracking-wider mb-4">Cidades mais Afetadas no Ano</h3>
        <div className="flex-1 w-full relative">
          <div className="absolute inset-0">
            <ResponsiveContainer width="99%" height="100%">
              <BarChart data={cityData} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid key="grid" strokeDasharray="3 3" stroke="#262626" horizontal={true} vertical={false} />
                <XAxis key="xaxis" type="number" stroke="#525252" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis key="yaxis" dataKey="name" type="category" stroke="#a3a3a3" fontSize={11} tickLine={false} axisLine={false} width={80} />
                <Tooltip 
                  key="tooltip"
                  cursor={{ fill: '#262626' }}
                  contentStyle={{ backgroundColor: '#171717', border: '1px solid #262626', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '13px' }}
                />
                <Bar key="bar" dataKey="ocorrencias" name="Ocorrências" radius={[0, 4, 4, 0]} barSize={20}>
                  {cityData.map((entry, index) => (
                    <Cell key={`cell-${entry.name}`} fill={index === 0 ? '#6366f1' : '#4f46e5'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
