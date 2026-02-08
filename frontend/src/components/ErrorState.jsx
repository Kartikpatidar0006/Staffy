import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function ErrorState({ message = 'Something went wrong', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-rose-500/10 blur-xl" />
        <div className="relative rounded-2xl bg-rose-50 dark:bg-rose-950/30 p-5">
          <AlertTriangle className="h-8 w-8 text-rose-500 dark:text-rose-400" />
        </div>
      </div>
      <h3 className="mt-5 text-sm font-bold text-surface-900 dark:text-white">Something went wrong</h3>
      <p className="mt-1.5 text-sm text-surface-500 dark:text-surface-400 max-w-xs leading-relaxed">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn-primary mt-5"
        >
          <RefreshCw className="h-4 w-4" />
          Try Again
        </button>
      )}
    </div>
  );
}
