import React, { useState } from 'react';
import { Layers, Terminal, Send } from 'lucide-react';
import type { FlowTask } from '../types';

export const Dashboard: React.FC<{ goal: string; leadAgent: string }> = ({ goal, leadAgent }) => {
  const [tasks] = useState<FlowTask[]>([
    { id: '1', title: 'System Blueprint & API Specs', stage: 1, status: 'COMPLETED', agent: leadAgent, updatedAt: 'Just now' },
    { id: '2', title: 'Frontend UI & React Component Suite', stage: 2, status: 'COMPLETED', agent: 'UX/UI Specialist', updatedAt: 'Just now' },
    { id: '3', title: 'Node Express Backend Handlers', stage: 3, status: 'RUNNING', agent: 'Backend Architect', updatedAt: 'Running...' },
    { id: '4', title: 'Vitest Automated Regression Suite', stage: 4, status: 'PENDING', agent: 'QA Lead', updatedAt: 'Queued' },
  ]);

  const [inputVal, setInputVal] = useState('');
  const [consoleLogs, setConsoleLogs] = useState<string[]>([
    '[INIT] Workspace mounted successfully',
    `[CHAIN] Agent ${leadAgent} completed architectural synthesis`,
    `[READY] Live preview online at ${process.env.PREVIEW_BASE_URL}`,
  ]);

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    setConsoleLogs((prev) => [...prev, `[USER] Sent command: ${inputVal}`, `[FLOW] Processing via ${leadAgent}...`]);
    setInputVal('');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 border border-slate-800 glow-card space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Production Objective</span>
          <span className="text-xs font-mono text-slate-400">Lead: {leadAgent}</span>
        </div>
        <p className="text-sm font-medium text-slate-200 leading-relaxed">{goal}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Layers size={15} />
            Execution Stages & Deliverables
          </h2>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center text-indigo-400 font-bold text-xs">
                    {task.stage}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{task.title}</h3>
                    <p className="text-xs text-slate-400">Assigned to: <span className="text-indigo-400 font-semibold">{task.agent}</span></p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    {task.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <Terminal size={15} />
            Live Execution Stream
          </h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-4 space-y-3 font-mono text-xs flex flex-col h-[320px]">
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-2">
              {consoleLogs.map((log, i) => (
                <div key={i} className="text-slate-300 leading-relaxed">
                  <span className="text-emerald-400 mr-1.5">❯</span>
                  {log}
                </div>
              ))}
            </div>
            <form onSubmit={handleExecute} className="flex gap-2 pt-2 border-t border-slate-800">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Send prompt to agent pipeline..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500"
              />
              <button type="submit" className="p-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-colors">
                <Send size={13} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
