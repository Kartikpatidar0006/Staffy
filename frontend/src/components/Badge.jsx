export function StatusBadge({ status }) {
  const isPresent = status === 'Present';
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-bold tracking-wide ${
        isPresent
          ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 shadow-sm shadow-emerald-500/20'
          : 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 shadow-sm shadow-red-500/20'
      }`}
    >
      <span className={`w-2 h-2 rounded-full animate-pulse ${
        isPresent ? 'bg-emerald-500' : 'bg-red-500'
      }`} />
      {status}
    </span>
  );
}

export function DepartmentBadge({ department }) {
  const colors = {
    'HR': { bg: 'bg-blue-100 dark:bg-blue-900/40', text: 'text-blue-700 dark:text-blue-300' },
    'IT': { bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-700 dark:text-purple-300' },
    'Sales': { bg: 'bg-emerald-100 dark:bg-emerald-900/40', text: 'text-emerald-700 dark:text-emerald-300' },
    'Marketing': { bg: 'bg-pink-100 dark:bg-pink-900/40', text: 'text-pink-700 dark:text-pink-300' },
    'Operations': { bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-700 dark:text-amber-300' },
  };

  const style = colors[department] || { bg: 'bg-slate-100 dark:bg-slate-900/40', text: 'text-slate-700 dark:text-slate-300' };

  return (
    <span className={`inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold ${style.bg} ${style.text} shadow-sm`}>
      {department}
    </span>
  );
}

export function Badge({ children, variant = 'primary', icon: Icon = null }) {
  const variants = {
    primary: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300',
    success: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
    warning: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300',
    danger: 'bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300',
    secondary: 'bg-gray-100 dark:bg-gray-900/40 text-gray-700 dark:text-gray-300',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${variants[variant]} shadow-sm`}>
      {Icon && <Icon size={14} />}
      {children}
    </span>
  );
}
