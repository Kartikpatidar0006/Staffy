import { Inbox } from 'lucide-react';

export default function EmptyState({ icon: Icon = Inbox, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
      <div className="relative">
        <div className="absolute inset-0 rounded-2xl bg-brand-500/10 blur-xl" />
        <div className="relative rounded-2xl bg-surface-100 dark:bg-surface-800 p-5">
          <Icon className="h-8 w-8 text-surface-400 dark:text-surface-500" />
        </div>
      </div>
      <h3 className="mt-5 text-sm font-bold text-surface-900 dark:text-white">{title}</h3>
      {description && (
        <p className="mt-1.5 text-sm text-surface-500 dark:text-surface-400 max-w-xs leading-relaxed">{description}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
