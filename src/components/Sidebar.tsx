import React from 'react';
import { Home, Layers, Settings, Database, Activity, ShieldCheck } from 'lucide-react';

export const Sidebar: React.FC<{ activeNav: string; onNavChange: (k: string) => void }> = ({ activeNav, onNavChange }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'pipeline', label: 'Agents & Pipeline', icon: Layers },
    { id: 'database', label: 'Schemas & Models', icon: Database },
    { id: 'metrics', label: 'Live Telemetry', icon: Activity },
    { id: 'security', label: 'Security & Audit', icon: ShieldCheck },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-800/80 bg-slate-950 p-4 space-y-4 hidden md:flex md:flex-col">
      <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 px-3">
        Workspace Navigation
      </div>
      <nav className="space-y-1 flex-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon size={16} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
      <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
        <p className="font-semibold text-slate-300">Environment</p>
        <p className="text-[10px] text-slate-500">Autonomous Node Runner</p>
      </div>
    </aside>
  );
};
