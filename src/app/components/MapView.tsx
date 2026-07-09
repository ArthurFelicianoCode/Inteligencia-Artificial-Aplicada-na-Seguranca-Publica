import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { OcorrenciaMapa } from '../../utils/mockData';

export function MapView({ data }: { data: OcorrenciaMapa[] }) {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Initialize map with a dark theme tile layer
    const map = L.map(containerRef.current, {
      zoomControl: false,
      scrollWheelZoom: true,
    }).setView([-23.9618, -46.3322], 12);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>',
      maxZoom: 19
    }).addTo(map);

    markersLayerRef.current = L.layerGroup().addTo(map);
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;

    const layerGroup = markersLayerRef.current;
    layerGroup.clearLayers();

    if (data.length === 0) return;

    const lats: number[] = [];
    const lngs: number[] = [];

    data.forEach(oc => {
      lats.push(oc.lat);
      lngs.push(oc.lng);

      const isRoubo = oc.delito === 'roubo_veiculo';
      const isHomicidio = oc.delito === 'homicidio';
      
      // We simulate hotspots by rendering slightly overlapping semi-transparent circles
      const color = isHomicidio ? '#9333ea' : (isRoubo ? '#f43f5e' : '#eab308');
      const radius = 6;
      const fillOpacity = 0.6;

      const marker = L.circleMarker([oc.lat, oc.lng], {
        radius,
        color: color,
        fillColor: color,
        fillOpacity,
        weight: 1
      });

      const nomeMunicipio = oc.municipio.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase());
      const nomeDelito = isHomicidio ? 'Homicídio' : (isRoubo ? 'Roubo de Veículo' : 'Furto de Veículo');

      const popupContent = `
        <div style="font-family: ui-sans-serif, system-ui, sans-serif; min-width: 140px; color: #171717;">
          <div style="font-weight: 600; font-size: 15px; margin-bottom: 4px;">${nomeDelito}</div>
          <div style="font-size: 13px; color: #404040;">Cidade: ${nomeMunicipio}</div>
          <div style="font-size: 13px; color: #404040;">Bairro: ${oc.bairro}</div>
        </div>
      `;

      marker.bindPopup(popupContent, {
        className: 'custom-popup',
        closeButton: false
      });
      
      marker.addTo(layerGroup);
    });

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLng = Math.min(...lngs);
    const maxLng = Math.max(...lngs);

    if (lats.length > 0) {
      mapRef.current.fitBounds(
        [[minLat, minLng], [maxLat, maxLng]],
        { padding: [50, 50], animate: true }
      );
    }

  }, [data]);

  return (
    <div className="h-full w-full relative group bg-neutral-900 overflow-hidden">
      {/* Map Container */}
      <div ref={containerRef} className="absolute inset-0 z-0" />
      
      {/* Overlay legend */}
      <div className="absolute bottom-6 right-6 z-10 bg-neutral-950/80 backdrop-blur border border-neutral-800 p-4 rounded-xl shadow-xl flex flex-col gap-2 pointer-events-none">
        <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">Legenda de Calor</h4>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500 opacity-80" />
          <span className="text-sm text-neutral-200">Roubos de Veículos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <span className="text-sm text-neutral-200">Furtos de Veículos</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-purple-600 opacity-80" />
          <span className="text-sm text-neutral-200">Homicídios</span>
        </div>
      </div>
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background-color: #f5f5f5;
          border-radius: 8px;
          border: 1px solid #e5e5e5;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        .custom-popup .leaflet-popup-tip {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
}
