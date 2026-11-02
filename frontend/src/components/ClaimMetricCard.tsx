import React from 'react';

interface ClaimMetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  variant?: 'emerald' | 'indigo' | 'amber' | 'slate';
}

const variantStyles = {
  emerald: 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
  indigo: 'border-indigo-500/20 bg-indigo-500/5 text-indigo-400',
  amber: 'border-amber-500/20 bg-amber-500/5 text-amber-400',
  slate: 'border-slate-700/40 bg-slate-800/40 text-slate-300',
};

/**
 * Reusable KPI card for displaying claim statistics and policy telemetry metrics.
 */
export const ClaimMetricCard: React.FC<ClaimMetricCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  variant = 'indigo',
}) => {
  return (
    <div
      className={`rounded-2xl border p-5 backdrop-blur-md shadow-sm transition-all hover:border-indigo-500/40 ${variantStyles[variant]}`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
          {title}
        </span>
        {trend && (
          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-mono text-emerald-400">
            {trend}
          </span>
        )}
      </div>

      <div className="mt-2 text-2xl font-bold tracking-tight text-white">{value}</div>

      {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
    </div>
  );
};
