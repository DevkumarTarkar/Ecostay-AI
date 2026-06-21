'use client';

import * as React from 'react';
import { cn } from '@/app/lib/utils';
import { Info, CheckCircle, AlertTriangle, XCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Props for the Toast component
 * @typedef {Object} ToastProps
 * @property {string} message - The message to display
 * @property {'info' | 'success' | 'warning' | 'error'} [type='info'] - The type of toast
 * @property {() => void} [onClose] - Function to call when closing the toast
 */
export interface ToastProps {
  message: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'info', onClose }) => {
  const icons = {
    info: <Info className="w-5 h-5 text-blue-500" />,
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    error: <XCircle className="w-5 h-5 text-red-500" />,
  };

  const bgColors = {
    info: 'bg-blue-50 border-blue-100',
    success: 'bg-emerald-50 border-emerald-100',
    warning: 'bg-amber-50 border-amber-100',
    error: 'bg-red-50 border-red-100',
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={cn(
        'flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg max-w-sm',
        bgColors[type]
      )}
    >
      {icons[type]}
      <p className="text-sm font-medium text-primary/80 flex-1">{message}</p>
      {onClose && (
        <button onClick={onClose} className="p-1 hover:bg-black/5 rounded-full transition-colors">
          <X className="w-4 h-4 text-primary/40" />
        </button>
      )}
    </motion.div>
  );
};

export { Toast };
