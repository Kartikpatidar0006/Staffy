import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function FilterBar({ filters = [], onFilterChange = () => {} }) {
  const [openFilter, setOpenFilter] = useState(null);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {filters.map((filter, idx) => (
        <div key={idx} className="relative group">
          <button
            onClick={() => setOpenFilter(openFilter === idx ? null : idx)}
            className="flex items-center gap-2 rounded-xl px-4 py-2.5 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 text-sm font-medium text-surface-700 dark:text-surface-300 hover:bg-surface-50 dark:hover:bg-surface-700 transition-all"
          >
            {filter.label}
            <ChevronDown size={16} className={`transition-transform ${openFilter === idx ? 'rotate-180' : ''}`} />
          </button>

          {openFilter === idx && (
            <div className="absolute top-full left-0 mt-2 bg-white dark:bg-surface-800 border border-surface-200 dark:border-surface-700 rounded-xl shadow-lg z-10 min-w-48 py-2">
              {filter.options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onFilterChange(filter.key, option.value);
                    setOpenFilter(null);
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-surface-700 dark:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-700 transition-colors"
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
