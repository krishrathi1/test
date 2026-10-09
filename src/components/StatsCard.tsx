import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
}

export const StatsCard: React.FC<StatsCardProps> = ({ label, value, change, isPositive = true, icon: Icon }) => {
  return (
    <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 hover:border-slate-700 transition-colors">
      <div>
        <p className="text-xs text-slate-400 font-medium">{label}</p>
        <p className="text-xl font-bold text-white mt-1">{value}</p>
        {change && (
          <span className={`text-[10px] font-semibold ${isPositive ? 'text-emerald-400' : 'text-rose-400'}`}>
            {change}
          </span>
        )}
      </div>
      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
        <Icon size={20} />
      </div>
    </div>
  );
};
