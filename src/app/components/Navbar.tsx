import React from 'react';
import { ShieldAlert, LogOut, Settings, User } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="h-16 flex items-center justify-between px-6 bg-neutral-950 border-b border-neutral-800 shrink-0">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="p-2 bg-indigo-500 rounded-lg group-hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20">
          <ShieldAlert className="w-5 h-5 text-white" />
        </div>
        <div className="flex flex-col leading-tight">
          <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            SafeZone AI
            <span className="text-[10px] bg-red-500/10 text-red-500 px-1.5 py-0.5 rounded uppercase border border-red-500/20 tracking-wider">
              Baixada Santista
            </span>
          </h1>
          <span className="text-xs text-neutral-500 font-medium">Monitoramento Inteligente & Predição</span>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-neutral-400 hover:text-white transition-colors bg-neutral-900 border border-neutral-800 rounded-lg hover:border-neutral-700">
          <Settings className="w-4 h-4" />
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors border border-neutral-800 rounded-lg hover:border-neutral-700">
          <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center mr-1">
            <User className="w-3 h-3 text-neutral-400" />
          </div>
          <span className="text-sm font-medium">Analista CPL</span>
        </button>
        <button className="p-2 text-neutral-500 hover:text-red-400 transition-colors border border-transparent hover:bg-red-500/10 hover:border-red-500/20 rounded-lg">
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </nav>
  );
}