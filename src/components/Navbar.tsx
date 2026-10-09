import React from 'react';
import { Bot, Sparkles, Activity } from 'lucide-react';

export const Navbar: React.FC<{ projectName: string }> = ({ projectName }) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl px-6 py-3.5 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
          <Bot size={20} />
        </div>
        <div>
          <h1 className="text-sm font-extrabold text-white tracking-tight flex items-center gap-2">
            {projectName}
            <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
              Live v1.0
            </span>
          </h1>
          <p className="text-[11px] text-slate-400">Autonomous Multi-Agent Production Workspace</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
          <Activity size={14} className="text-indigo-400 animate-pulse" />
          <span>Pipeline: Active</span>
        </div>
        <button className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-xs transition-all cursor-pointer">
          <Sparkles size={14} />
          <span>Deploy Live</span>
        </button>
      </div>
    </header>
  );
};
