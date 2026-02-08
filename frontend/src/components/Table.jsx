import { ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function Table({ columns, data, sortable = true, striped = true, onSort = null }) {
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const handleSort = (key) => {
    if (!sortable || !key) return;

    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });

    if (onSort) {
      onSort(key, direction);
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-surface-200/50 dark:border-surface-800">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-surface-200/50 dark:border-surface-800 bg-surface-50/50 dark:bg-surface-900/50">
            {columns.map((col) => (
              <th key={col.key} className="px-6 py-4 text-left font-semibold text-surface-700 dark:text-surface-300">
                <button
                  onClick={() => handleSort(col.key)}
                  className="flex items-center gap-2 hover:text-surface-900 dark:hover:text-white transition-colors"
                >
                  {col.label}
                  {sortable && col.key && (
                    <span className="text-surface-400">
                      {sortConfig.key === col.key ? (
                        sortConfig.direction === 'asc' ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )
                      ) : (
                        <div className="w-4 h-4 opacity-30" />
                      )}
                    </span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr
              key={idx}
              className={`border-b border-surface-100/50 dark:border-surface-800/50 transition-colors ${
                striped && idx % 2 === 0 ? 'bg-surface-50/30 dark:bg-surface-900/20' : ''
              } hover:bg-surface-100/50 dark:hover:bg-surface-800/50`}
            >
              {columns.map((col) => (
                <td key={col.key} className="px-6 py-4">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
