'use client';

import * as React from 'react';
import { cn } from '@/app/lib/utils';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Props for the Modal component
 * @typedef {Object} ModalProps
 * @property {boolean} isOpen - Whether the modal is visible
 * @property {() => void} onClose - Function to call when closing the modal
 * @property {string} [title] - Title of the modal
 * @property {React.ReactNode} children - Content of the modal
 */
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-primary/40 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-background rounded-3xl shadow-2xl overflow-hidden pointer-events-auto border border-secondary/20"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-secondary/10">
                <h3 className="text-xl font-serif font-bold text-primary">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1 rounded-full hover:bg-secondary/10 transition-colors"
                >
                  <X className="w-5 h-5 text-primary/60" />
                </button>
              </div>
              <div className="p-6">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export { Modal };
