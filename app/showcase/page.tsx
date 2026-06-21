'use client';

import React, { useState } from 'react';
import { 
  Button, 
  Input, 
  Modal, 
  Toast, 
  Loader 
} from '@/components/ui';
import { Info, CheckCircle, AlertTriangle, XCircle, Play } from 'lucide-react';

export default function ShowcasePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: 'info' | 'success' | 'warning' | 'error' }[]>([]);

  const addToast = (type: 'info' | 'success' | 'warning' | 'error', message: string) => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type }]);
    setTimeout(() => {
      setToasts(current => current.filter(t => t.id !== id));
    }, 5000);
  };

  return (
    <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <div className="space-y-4 mb-20 text-center">
        <h1 className="text-5xl font-serif font-bold text-primary">Component Library</h1>
        <p className="text-primary/60 text-lg max-w-2xl mx-auto">
          A showcase of the custom UI components built for the EcoStay AI platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Buttons Section */}
        <section className="space-y-8 p-10 bg-white/5 dark:bg-slate-900/40 border border-secondary/10 shadow-luxury rounded-[3rem] backdrop-blur-xl">
          <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
               <span className="text-sm">01</span>
            </div>
            Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button>Primary Button</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button isLoading>Loading</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Inputs Section */}
        <section className="space-y-8 p-10 bg-white/5 dark:bg-slate-900/40 border border-secondary/10 shadow-luxury rounded-[3rem] backdrop-blur-xl">
          <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
               <span className="text-sm">02</span>
            </div>
            Inputs
          </h2>
          <div className="space-y-4">
            <Input label="Name" placeholder="Enter your full name" />
            <Input label="Email" type="email" placeholder="hello@ecostay.ai" />
            <Input label="Phone" placeholder="+91 98765 43210" error="This field is required" />
          </div>
        </section>

        {/* Modal Section */}
        <section className="space-y-8 p-10 bg-white/5 dark:bg-slate-900/40 border border-secondary/10 shadow-luxury rounded-[3rem] backdrop-blur-xl">
          <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
               <span className="text-sm">03</span>
            </div>
            Modal
          </h2>
          <div className="flex items-center justify-center h-40 border-2 border-dashed border-secondary/20 rounded-2xl">
            <Button variant="outline" onClick={() => setIsModalOpen(true)}>
              Open Demo Modal
            </Button>
          </div>
          <Modal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)}
            title="Sustainable Stay Booking"
          >
            <div className="space-y-4">
              <p className="text-primary/70">
                You are about to book a stay at one of our premium eco-villas. Please confirm your details below.
              </p>
              <div className="bg-secondary/10 p-4 rounded-2xl border border-secondary/20">
                <p className="text-sm font-bold text-primary">Luxury Eco-Retreat, Coorg</p>
                <p className="text-xs text-primary/60">June 24 - June 28, 2024</p>
              </div>
              <Button className="w-full" onClick={() => {
                setIsModalOpen(false);
                addToast('success', 'Booking confirmed successfully!');
              }}>
                Confirm Booking
              </Button>
            </div>
          </Modal>
        </section>

        {/* Toasts Section */}
        <section className="space-y-8 p-10 bg-white/5 dark:bg-slate-900/40 border border-secondary/10 shadow-luxury rounded-[3rem] backdrop-blur-xl">
          <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
               <span className="text-sm">04</span>
            </div>
            Toasts
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="ghost" className="border border-blue-200 bg-blue-50/50" onClick={() => addToast('info', 'New villa collections available.')}>
              Info Toast
            </Button>
            <Button variant="ghost" className="border border-emerald-200 bg-emerald-50/50" onClick={() => addToast('success', 'Changes saved successfully.')}>
              Success Toast
            </Button>
            <Button variant="ghost" className="border border-amber-200 bg-amber-50/50" onClick={() => addToast('warning', 'Low availability for these dates.')}>
              Warning Toast
            </Button>
            <Button variant="ghost" className="border border-red-200 bg-red-50/50" onClick={() => addToast('error', 'Authentication failed.')}>
              Error Toast
            </Button>
          </div>
          <div className="fixed bottom-10 right-10 z-[100] flex flex-col gap-4">
            {toasts.map(toast => (
              <Toast 
                key={toast.id} 
                message={toast.message} 
                type={toast.type} 
                onClose={() => setToasts(current => current.filter(t => t.id !== toast.id))}
              />
            ))}
          </div>
        </section>

        {/* Loaders Section */}
        <section className="space-y-8 p-10 bg-white/5 dark:bg-slate-900/40 border border-secondary/10 shadow-luxury md:col-span-2 rounded-[3rem] backdrop-blur-xl">
          <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
               <span className="text-sm">05</span>
            </div>
            Loaders & Skeletons
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="flex flex-col items-center gap-4">
              <Loader />
              <span className="text-xs font-bold text-primary/40 uppercase tracking-widest">Enhanced Spinner</span>
            </div>
            <div className="flex flex-col items-center gap-4">
              <Loader variant="dots" />
              <span className="text-xs font-bold text-primary/40 uppercase tracking-widest">Bouncing Dots</span>
            </div>
            <div className="space-y-3">
              <Loader variant="skeleton" className="h-4 w-3/4" />
              <Loader variant="skeleton" className="h-4 w-full" />
              <Loader variant="skeleton" className="h-20 w-full" />
              <span className="text-xs font-bold text-primary/40 uppercase tracking-widest block text-center">Adaptive Skeletons</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
