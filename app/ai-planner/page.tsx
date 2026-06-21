'use client';

import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Send, Bot, User, Compass, Hotel, Leaf } from 'lucide-react';
import { Button, Input, Loader } from '@/components/ui';

const SAMPLE_PICKS = [
  { name: "Cloud 9 Valley Lodge", location: "Nainital", match: "98% Match", reason: "Sustainability Focus" },
  { name: "Sutra Heritage Stay", location: "Varanasi", match: "94% Match", reason: "AI Cultural Preference" },
  { name: "EcoWhisper Retreat", location: "Munnar", match: "91% Match", reason: "Carbon Neutrality" }
];

export default function AIPlannerPage() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; content: string }[]>([
    { role: 'ai', content: "Namaste! I'm your AI Travel Concierge. Tell me about your dream escape — are you looking for mountains, beaches, or a heritage retreat?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    setMessages([...messages, { role: 'user', content: inputValue }]);
    setInputValue('');
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        content: `That sounds wonderful. Based on your interest in "${inputValue}", I've analyzed 450+ eco-certified villas. I recommend looking at properties in Coorg for their sustainable coffee estate experiences. Would you like to see my top 3 picks?` 
      }]);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-background pt-24 overflow-hidden">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12 h-[calc(100vh-160px)]">
        
        {/* Chat Interface */}
        <div className="lg:col-span-2 flex flex-col bg-white/30 dark:bg-luxury-dark/30 backdrop-blur-xl rounded-[3rem] border border-secondary/20 shadow-luxury overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-secondary/5 to-transparent pointer-events-none" />
          
          <div className="p-8 border-b border-secondary/10 flex items-center justify-between relative z-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-secondary" />
               </div>
               <div>
                  <h2 className="text-2xl font-serif font-bold text-primary dark:text-foreground">AI Concierge</h2>
                  <p className="text-xs font-bold text-emerald-600 dark:text-secondary uppercase tracking-widest">Active • Smart Insight Engine v4</p>
               </div>
            </div>
            <div className="hidden md:flex gap-4">
               {[Compass, Hotel, Leaf].map((Icon, idx) => (
                 <div key={idx} className="w-10 h-10 rounded-xl bg-white/50 flex items-center justify-center border border-secondary/10 shadow-sm">
                   <Icon className="w-5 h-5 text-primary/40" />
                 </div>
               ))}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-6 relative z-10 custom-scrollbar">
            <AnimatePresence initial={false}>
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-5 rounded-3xl ${
                    m.role === 'user' 
                      ? 'bg-primary text-white dark:text-luxury-dark rounded-tr-none shadow-xl' 
                      : 'bg-white dark:bg-primary/20 text-primary dark:text-foreground rounded-tl-none shadow-lg border border-secondary/10'
                  }`}>
                    <div className="flex items-center gap-2 mb-2 opacity-60">
                      {m.role === 'ai' ? <Bot className="w-3.5 h-3.5 text-secondary" /> : <User className="w-3.5 h-3.5" />}
                      <span className="text-[10px] font-bold uppercase tracking-widest">{m.role === 'ai' ? 'EcoStay AI' : 'You'}</span>
                    </div>
                    <p className="text-sm font-medium leading-relaxed">{m.content}</p>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                   <div className="bg-white p-4 rounded-3xl rounded-tl-none shadow-lg border border-secondary/10">
                      <Loader variant="dots" />
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-8 pt-0 relative z-10">
            <div className="relative group">
              <Input 
                placeholder="Type your preferences..." 
                className="pr-16 h-16 rounded-[2rem] bg-white/80 dark:bg-luxury-dark/80 border-secondary/20 shadow-inner group-focus-within:border-secondary transition-all"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button 
                variant="primary" 
                size="sm" 
                className="absolute right-2 top-2 h-12 w-12 p-0 rounded-full shadow-xl"
                onClick={handleSend}
              >
                <Send className="w-5 h-5 text-secondary" />
              </Button>
            </div>
          </div>
        </div>

        {/* AI Analysis Sidebar */}
        <div className="hidden lg:flex flex-col gap-8">
           <div className="bg-primary text-white rounded-[3rem] p-8 shadow-2xl relative overflow-hidden flex-1 border border-white/10">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl" />
              <h3 className="text-2xl font-serif font-bold mb-8 italic">AI Real-time <br /><span className="text-secondary">Analysis</span></h3>
              
              <div className="space-y-6">
                 {SAMPLE_PICKS.map((pick, i) => (
                   <motion.div 
                     key={i}
                     initial={{ opacity: 0, x: 20 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ delay: i * 0.2 }}
                     className="p-5 bg-white/10 rounded-2xl border border-white/10 group cursor-pointer hover:bg-white/15"
                   >
                     <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-secondary">{pick.name}</h4>
                        <span className="text-[10px] bg-secondary/20 text-secondary px-2 py-0.5 rounded-full font-bold">{pick.match}</span>
                     </div>
                     <p className="text-xs text-white/60 mb-2 italic">{pick.location}</p>
                     <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-tighter flex items-center gap-1">
                        <Leaf className="w-2.5 h-2.5" />
                        {pick.reason}
                     </p>
                   </motion.div>
                 ))}
              </div>

              <div className="mt-auto pt-8">
                 <div className="p-4 bg-secondary/10 rounded-2xl border border-secondary/20">
                    <p className="text-xs text-white/50 leading-relaxed italic">
                      "Analyzing the nexus of your travel history and current market sustainability trends to find your perfect sanctuary."
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </div>

      <Footer />
    </main>
  );
}
