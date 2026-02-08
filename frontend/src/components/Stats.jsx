import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export function StatCard({ 
  label, 
  value, 
  icon: Icon, 
  gradient = 'from-blue-500 to-blue-400',
  bgLight = 'bg-blue-50',
  bgDark = 'dark:bg-blue-950/30',
  textColor = 'text-blue-600 dark:text-blue-400',
  trend = null,
  subtext = null,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white dark:bg-surface-900 border border-surface-200/50 dark:border-surface-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 p-6">
      {/* Gradient background decoration */}
      <div className={`absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br ${gradient} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity duration-300`} />

      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-surface-600 dark:text-surface-400 mb-2">{label}</p>
            <div className="flex items-baseline gap-3">
              <h3 className="text-4xl font-bold text-surface-900 dark:text-white">{value}</h3>
              {trend && (
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold ${
                  trend > 0 
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400'
                    : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400'
                }`}>
                  {trend > 0 ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                  {Math.abs(trend)}%
                </div>
              )}
            </div>
            {subtext && (
              <p className="text-xs text-surface-500 dark:text-surface-400 mt-2">{subtext}</p>
            )}
          </div>
          <div className={`flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} ${bgLight} ${bgDark} shadow-lg`}>
            <Icon className={`${textColor}`} size={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function StatGrid({ children }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {children}
    </div>
  );
}
