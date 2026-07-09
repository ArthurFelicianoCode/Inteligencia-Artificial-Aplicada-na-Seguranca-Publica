import React from 'react';
import { estatisticasMock, initialMapData } from '../utils/mockData';
import { MapView } from './components/MapView';
import { FilterPanel } from './components/FilterPanel';
import { StatsPanel } from './components/StatsPanel';
import { AIInsights } from './components/AIInsights';
import { Navbar } from './components/Navbar';
import "leaflet/dist/leaflet.css";

export default function App() {
  const [filters, setFilters] = React.useState({
    ano: 2023,
    municipio: 'todos', // 'todos' ou nome do municipio
    delitos: ['roubo_veiculo', 'furto_veiculo', 'homicidio'],
  });

  // Filter stats based on year, municipio, and delitos
  const filteredStats = React.useMemo(() => {
    return estatisticasMock.filter(d => {
      const matchAno = d.ano === filters.ano;
      const matchMun = filters.municipio === 'todos' || d.municipio === filters.municipio;
      const matchDelito = filters.delitos.includes(d.delito);
      return matchAno && matchMun && matchDelito;
    });
  }, [filters]);

  // Filter map data
  const filteredMapData = React.useMemo(() => {
    return initialMapData.filter(d => {
      const matchMun = filters.municipio === 'todos' || d.municipio === filters.municipio;
      const matchDelito = filters.delitos.includes(d.delito);
      return matchMun && matchDelito;
    });
  }, [filters]);

  return (
    <div className="flex flex-col h-screen bg-neutral-950 text-neutral-100 overflow-hidden font-sans">
      <Navbar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Filters */}
        <aside className="w-80 flex flex-col border-r border-neutral-800 bg-neutral-900 overflow-y-auto">
          <FilterPanel 
            filters={filters} 
            setFilters={setFilters} 
          />
          <AIInsights data={filteredStats} />
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Stats Bar */}
          <div className="h-64 border-b border-neutral-800 bg-neutral-900 shrink-0 p-4">
            <StatsPanel 
              data={filteredStats} 
              fullHistory={estatisticasMock.filter(d => 
                (filters.municipio === 'todos' || d.municipio === filters.municipio) &&
                filters.delitos.includes(d.delito)
              )}
            />
          </div>

          {/* Map View */}
          <div className="flex-1 relative bg-neutral-900">
             <MapView data={filteredMapData} />
          </div>
        </main>
      </div>
    </div>
  );
}
