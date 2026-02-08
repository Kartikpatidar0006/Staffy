export default function Card({ children, className = '', hover = true, gradient = false }) {
  return (
    <div
      className={`
        rounded-2xl border transition-all duration-300
        ${gradient
          ? 'bg-gradient-to-br from-white/90 to-surface-50/90 dark:from-surface-800/90 dark:to-surface-900/90 border-surface-200/50 dark:border-surface-700/50'
          : 'bg-white/80 dark:bg-surface-900/80 border-surface-200/70 dark:border-surface-800'
        }
        shadow-sm hover:shadow-md dark:hover:shadow-lg dark:shadow-black/20
        ${hover ? 'hover:scale-[1.02] hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', gradient = false }) {
  return (
    <div
      className={`
        px-6 py-5 border-b border-surface-100/50 dark:border-surface-800/50
        ${gradient ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-surface-800 dark:to-surface-800' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export function CardBody({ children, className = '' }) {
  return <div className={`px-6 py-5 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return (
    <div className={`px-6 py-4 border-t border-surface-100/50 dark:border-surface-800/50 bg-surface-50/30 dark:bg-surface-950 rounded-b-2xl ${className}`}>
      {children}
    </div>
  );
}
