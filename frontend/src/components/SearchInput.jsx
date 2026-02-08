import { Search, X } from 'lucide-react';

export function SearchInput({ 
  value, 
  onChange, 
  placeholder = 'Search...', 
  onClear = null,
  className = ''
}) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-400 dark:text-surface-500 pointer-events-none" size={18} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input-base input-icon pr-10"
      />
      {value && onClear && (
        <button
          onClick={() => {
            onChange('');
            onClear?.();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 transition-colors"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}
