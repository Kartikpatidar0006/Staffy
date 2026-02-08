export default function LoadingSpinner({ message = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-[3px] border-surface-200 dark:border-surface-800" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-brand-500 animate-spin" />
      </div>
      <p className="mt-4 text-sm font-medium text-surface-400 dark:text-surface-500">{message}</p>
    </div>
  );
}
