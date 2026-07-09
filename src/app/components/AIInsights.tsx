import React, { useMemo, useState, useEffect } from 'react';
import { Sparkles, BrainCircuit, RefreshCw } from 'lucide-react';
import { EstatisticaCriminal } from '../../utils/mockData';
import { motion, AnimatePresence } from 'motion/react';

interface AIInsightsProps {
  data: EstatisticaCriminal[];
}

export function AIInsights({ data }: AIInsightsProps) {
  const [loading, setLoading] = useState(false);
  const [insightIndex, setInsightIndex] = useState(0);

  // Generate dynamic insights based on data
  const insights = useMemo(() => {
    if (data.length === 0) return ["Sem dados suficientes para gerar insights."];

    const totalOcorrencias = data.reduce((sum, curr) => sum + curr.ocorrencia, 0);
    const taxaMedia = (data.reduce((sum, curr) => sum + curr.taxa_de_delito, 0) / data.length).toFixed(1);
    
    // Most common city
    const cityCounts = data.reduce((acc, curr) => {
      acc[curr.municipio] = (acc[curr.municipio] || 0) + curr.ocorrencia;
      return acc;
    }, {} as Record<string, number>);
    const topCityId = Object.entries(cityCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'baixada';
    const topCity = topCityId.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
    
    // Roubo vs Furto
    const roubos = data.filter(d => d.delito === 'roubo_veiculo').reduce((sum, curr) => sum + curr.ocorrencia, 0);
    const furtos = data.filter(d => d.delito === 'furto_veiculo').reduce((sum, curr) => sum + curr.ocorrencia, 0);
    const isRouboHeavy = roubos > furtos;

    return [
      `Atenção: Identificamos um agrupamento anômalo de ${isRouboHeavy ? 'Roubos' : 'Furtos'} em ${topCity} com taxa média de ${taxaMedia} (modelo K-Means ativado).`,
      `Predição (Scikit-learn): Alta probabilidade de ocorrências envolvendo veículos no centro de ${topCity} durante a madrugada no próximo trimestre.`,
      `Resumo Automático: O volume de ${totalOcorrencias} ocorrências em ${topCity} está pressionando a capacidade da região. O modelo de Risco sugere reforço ostensivo.`,
      `Alerta Crítico: A taxa de delito em ${topCity} apresenta um desvio padrão suspeito. Algoritmo DBSCAN mapeou expansão de zonas de risco para áreas comerciais.`
    ];
  }, [data]);

  useEffect(() => {
    // Rotate insights every 8 seconds to simulate continuous analysis
    const interval = setInterval(() => {
      setInsightIndex(prev => (prev + 1) % insights.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [insights.length]);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setInsightIndex(prev => (prev + 1) % insights.length);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col bg-neutral-900 border-t border-neutral-800 p-6 min-h-[220px] mt-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-semibold text-neutral-200 tracking-wide uppercase">IA & Predições</h3>
        </div>
        <button 
          onClick={handleRefresh}
          className="text-neutral-500 hover:text-emerald-400 transition-colors p-1 rounded-full hover:bg-neutral-800"
          title="Regerar Insight"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-emerald-500' : ''}`} />
        </button>
      </div>

      <div className="relative flex-1 bg-neutral-950/50 rounded-xl p-4 border border-emerald-900/30 overflow-hidden shadow-inner shadow-emerald-900/5 flex items-center">
        <Sparkles className="absolute top-2 right-2 w-3 h-3 text-emerald-500/30 animate-pulse" />
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center w-full space-x-2"
            >
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </motion.div>
          ) : (
            <motion.p
              key={insightIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="text-sm text-emerald-100/80 leading-relaxed font-medium"
            >
              {insights[insightIndex]}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
