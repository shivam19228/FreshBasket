import React from 'react';
import { useApp } from '../../context/AppContext';
import { IconCheck, IconAlertTriangle, IconSparkles } from './Icons';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const bgClasses = {
    success: 'bg-gray-900 text-white border-green-500',
    warning: 'bg-amber-900 text-amber-50 border-amber-500',
    info: 'bg-emerald-900 text-white border-emerald-400',
  }[toast.type || 'success'];

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce transition-all duration-300 pointer-events-none">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border-l-4 text-sm font-medium ${bgClasses}`}>
        {toast.type === 'warning' ? (
          <IconAlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        ) : toast.type === 'info' ? (
          <IconSparkles className="w-5 h-5 text-emerald-300 shrink-0" />
        ) : (
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
            <IconCheck className="w-3.5 h-3.5 text-white stroke-[3]" />
          </div>
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};

