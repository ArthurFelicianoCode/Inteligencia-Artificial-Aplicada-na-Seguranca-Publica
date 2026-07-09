import React from 'react';
import { Calendar, Filter, MapPin } from 'lucide-react';

interface FilterPanelProps {
  filters: {
    ano: number;
    municipio: string;
    delitos: string[];
  };
  setFilters: React.Dispatch<React.SetStateAction<{
    ano: number;
    municipio: string;
    delitos: string[];
  }>>;
}

export function FilterPanel({ filters, setFilters }: FilterPanelProps) {
  
  const toggleDelito = (value: string) => {
    setFilters(prev => {
      const current = prev.delitos;
      const next = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, delitos: next.length > 0 ? next : current };
    });
  };

  const setAno = (ano: number) => setFilters(prev => ({ ...prev, ano }));
  const setMunicipio = (municipio: string) => setFilters(prev => ({ ...prev, municipio }));

  return (
    <div className="flex flex-col h-full bg-neutral-900 border-r border-neutral-800 p-6 space-y-8 overflow-y-auto">
      {/* Title */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-neutral-200">
          <Filter className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold tracking-tight">Filtros Avançados</h2>
        </div>
        <p className="text-xs text-neutral-400">Dados integrados via SSP/SP & Prefeituras (Baixada Santista)</p>
      </div>

      <div className="space-y-6">
        {/* Municipio Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-neutral-300">Município</span>
            <MapPin className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="flex flex-col gap-2">
            {[
              { id: 'todos', label: 'Toda Baixada Santista' },
              { id: 'santos', label: 'Santos' },
              { id: 'sao_vicente', label: 'São Vicente' },
              { id: 'praia_grande', label: 'Praia Grande' },
              { id: 'guaruja', label: 'Guarujá' },
              { id: 'cubatao', label: 'Cubatão' },
              { id: 'mongagua', label: 'Mongaguá' },
              { id: 'itanhaem', label: 'Itanhaém' },
              { id: 'peruibe', label: 'Peruíbe' },
              { id: 'bertioga', label: 'Bertioga' },
            ].map(m => (
              <button
                key={m.id}
                onClick={() => setMunicipio(m.id)}
                className={`text-left px-3 py-2 rounded-md text-sm transition-colors ${
                  filters.municipio === m.id 
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                    : 'bg-neutral-800 text-neutral-400 border border-transparent hover:bg-neutral-700'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ano Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-neutral-300">Ano Letivo</span>
            <Calendar className="w-4 h-4 text-neutral-500" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[2018, 2019, 2020, 2021, 2022, 2023].map(a => (
              <button
                key={a}
                onClick={() => setAno(a)}
                className={`py-1.5 rounded text-sm transition-colors ${
                  filters.ano === a
                  ? 'bg-indigo-500 text-white'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                }`}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Delito Filter */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-neutral-300">Natureza do Delito</span>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { id: 'roubo_veiculo', label: 'Roubo de Veículo' },
              { id: 'furto_veiculo', label: 'Furto de Veículo' },
              { id: 'homicidio', label: 'Homicídio' }
            ].map(d => (
              <label key={d.id} className="flex items-center space-x-3 cursor-pointer group" onClick={() => toggleDelito(d.id)}>
                <div className={`
                  w-5 h-5 rounded border flex items-center justify-center transition-colors
                  ${filters.delitos.includes(d.id) 
                    ? 'bg-indigo-500 border-indigo-500' 
                    : 'bg-neutral-800 border-neutral-600 group-hover:border-neutral-500'}
                `}>
                  {filters.delitos.includes(d.id) && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className={`text-sm ${filters.delitos.includes(d.id) ? 'text-neutral-200' : 'text-neutral-400'}`}>
                  {d.label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
