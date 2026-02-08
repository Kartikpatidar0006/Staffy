import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-surface-950/40 dark:bg-black/70 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="relative w-full max-w-md rounded-2xl bg-white dark:bg-surface-900 shadow-2xl border border-surface-200/50 dark:border-surface-800 animate-slide-up">
          <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 dark:border-surface-800">
            <h3 className="text-lg font-bold text-surface-900 dark:text-white">{title}</h3>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-surface-400 hover:text-surface-600 dark:hover:text-surface-300 hover:bg-surface-100 dark:hover:bg-surface-800 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="px-6 py-5">{children}</div>
        </div>
      </div>
    </div>
  );
}
