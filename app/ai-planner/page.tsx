'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Leaf, 
  AlertCircle, 
  Eye, 
  Star,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { Button, Input, Loader } from '@/components/ui';
import { ProtectedRoute } from '@/app/lib/auth';
import { fetchHomestays, fetchTravelPlan } from '@/app/lib/api';

const INTERESTS_OPTIONS = [
  "Nature & Ecology",
  "Adventure & Trekking",
  "Heritage & Culture",
  "Organic Dining",
  "Wellness & Yoga",
  "Wildlife Safari",
  "Beaches & Watersports"
];

function AIPlannerPage() {
  const [dbHomestays, setDbHomestays] = useState<any[]>([]);
  
  // Form State
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState(3);
  const [budget, setBudget] = useState('15000');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  // UI & Loading States
  const [loading, setLoading] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  // Results State
  const [result, setResult] = useState<any | null>(null);

  // Load available database homestays on mount
  useEffect(() => {
    fetchHomestays()
      .then((res) => {
        if (res.success && Array.isArray(res.data)) {
          setDbHomestays(res.data);
        }
      })
      .catch((err) => console.error("Error fetching homestays from db:", err));
  }, []);

  // Cycle loading messages for rich visual experience
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (loading) {
      interval = setInterval(() => {
        setLoadingPhase(prev => (prev + 1) % 4);
      }, 2500);
    } else {
      setLoadingPhase(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest) 
        : [...prev, interest]
    );
  };

  const handleGeneratePlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim()) {
      setError("Please specify your destination.");
      return;
    }
    if (days <= 0 || days > 10) {
      setError("Please choose duration between 1 and 10 days.");
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const plan = await fetchTravelPlan({
        destination,
        days,
        budget,
        interests: selectedInterests
      });
      if (plan && plan.success) {
        setResult(plan);
      } else {
        setError("Failed to generate plan. AI returned an unexpected response.");
      }
    } catch (err: any) {
      setError(err.message || "Failed to communicate with AI Service. Make sure backend is running.");
    } finally {
      setLoading(false);
    }
  };

  // Find real homestay objects based on matched IDs from backend response
  const getRecommendedHomestays = () => {
    if (!result || !Array.isArray(result.recommended_homestay_ids)) return [];
    return dbHomestays.filter(h => result.recommended_homestay_ids.includes(h.id));
  };

  const recommendedVillas = getRecommendedHomestays();

  const loadingMessages = [
    "Analyzing location geography & weather trends...",
    "Querying EcoStay DB for verified green homestays...",
    "Designing eco-friendly day-by-day itinerary...",
    "Optimizing activities for low-carbon travel footprint..."
  ];

  const renderMarkdown = (text: string) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-2xl font-serif font-bold mt-6 mb-3 text-primary dark:text-accent italic">{line.substring(4)}</h3>;
      }
      if (line.startsWith('#### ')) {
        return <h4 key={idx} className="text-lg font-serif font-bold mt-4 mb-2 text-secondary dark:text-white">{line.substring(5)}</h4>;
      }
      if (line.startsWith('- ')) {
        const content = line.substring(2);
        return (
          <li key={idx} className="ml-6 list-disc text-sm font-medium leading-relaxed text-muted mb-1.5 dark:text-white/80">
            {content}
          </li>
        );
      }
      if (line.trim() === '') {
        return <div key={idx} className="h-2.5" />;
      }
      return <p key={idx} className="text-sm font-medium leading-relaxed text-muted mb-2 dark:text-white/80">{line}</p>;
    });
  };

  return (
    <main className="min-h-screen bg-background pt-24 pb-12 overflow-x-hidden">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-6 py-6">
        
        {/* Header Banner */}
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/20 mb-4 shadow-sm">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-accent">AI-Powered Concierge</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-primary dark:text-foreground mb-4 italic">
            Eco-Travel Planner
          </h1>
          <p className="text-black/60 dark:text-white/60 text-lg font-medium leading-relaxed">
            Specify your destination, budget, and travel interests. Our AI engine will construct a personalized, low-impact holiday itinerary matching real verified green villas.
          </p>
        </div>

        {/* Error Alert banner */}
        {error && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/50 rounded-2xl flex items-start gap-3.5 max-w-4xl mx-auto shadow-md"
          >
            <AlertCircle className="w-5.5 h-5.5 text-red-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-bold text-red-900 dark:text-red-400 text-sm">Travel Plan Generation Failed</h4>
              <p className="text-xs text-red-700 dark:text-red-300 mt-1 font-medium">{error}</p>
            </div>
            <button onClick={() => setError(null)} className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline">Dismiss</button>
          </motion.div>
        )}

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          
          {/* Left Panel: Form Settings */}
          <div className="bg-white/40 dark:bg-luxury-dark/40 backdrop-blur-xl rounded-[2.5rem] border border-secondary/20 p-8 shadow-luxury relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none" />
            
            <h3 className="text-xl font-serif font-bold text-primary dark:text-foreground mb-6 flex items-center gap-2 relative z-10 italic">
              <Compass className="w-5 h-5 text-accent" /> Plan Specifications
            </h3>

            <form onSubmit={handleGeneratePlan} className="space-y-6 relative z-10">
              
              {/* Destination */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Destination</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-accent" />
                  <Input 
                    placeholder="e.g. Coorg, Munnar, Manali" 
                    className="pl-12 h-12 rounded-xl bg-white/60 dark:bg-black/25 text-primary dark:text-foreground placeholder:text-muted/50 border-secondary/20"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  />
                </div>
              </div>

              {/* Days & Budget */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Days</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-accent" />
                    <input 
                      type="number"
                      min={1}
                      max={10}
                      className="w-full pl-12 pr-4 h-12 rounded-xl bg-white/60 dark:bg-black/25 text-primary dark:text-foreground border border-secondary/20 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-secondary/50"
                      value={days}
                      onChange={(e) => setDays(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Budget (₹)</label>
                  <div className="relative">
                    <DollarSign className="absolute left-4 top-3.5 w-5 h-5 text-accent" />
                    <Input 
                      placeholder="e.g. 15000" 
                      className="pl-12 h-12 rounded-xl bg-white/60 dark:bg-black/25 text-primary dark:text-foreground border-secondary/20"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Interests Multi-select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted mb-2">Travel Preferences</label>
                <div className="flex flex-wrap gap-2.5">
                  {INTERESTS_OPTIONS.map((interest, i) => {
                    const isSelected = selectedInterests.includes(interest);
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() => toggleInterest(interest)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 border ${
                          isSelected 
                            ? 'bg-primary text-white border-primary shadow-md scale-95' 
                            : 'bg-white/50 dark:bg-black/10 text-muted border-secondary/15 hover:bg-secondary/10'
                        }`}
                      >
                        {interest}
                      </button>
                    );
                  })}
                </div>
              </div>

              <Button 
                type="submit" 
                variant="primary" 
                className="w-full h-12 rounded-xl bg-yellow-400 hover:bg-yellow-500 text-black font-bold flex items-center justify-center gap-2 mt-4 shadow-lg transition-transform active:scale-95"
                disabled={loading}
              >
                <Sparkles className="w-5 h-5" />
                {loading ? "Optimizing Plan..." : "Generate Eco-Plan"}
              </Button>

            </form>
          </div>

          {/* Right Panel: Results Display */}
          <div className="lg:col-span-2 min-h-[480px]">
            <AnimatePresence mode="wait">
              {loading ? (
                /* LOADING STATE */
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full bg-white/30 dark:bg-luxury-dark/30 backdrop-blur-xl rounded-[2.5rem] border border-secondary/20 p-12 flex flex-col items-center justify-center text-center shadow-luxury"
                >
                  <div className="w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mb-6 shadow-inner animate-pulse">
                    <Loader variant="dots" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary dark:text-foreground mb-2 italic">Consulting AI Engine...</h3>
                  <motion.p 
                    key={loadingPhase}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-bold text-accent tracking-wide"
                  >
                    {loadingMessages[loadingPhase]}
                  </motion.p>
                </motion.div>
              ) : result ? (
                /* RESULT STATE */
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  
                  {/* Detailed Itinerary */}
                  <div className="bg-white/40 dark:bg-luxury-dark/40 backdrop-blur-xl rounded-[2.5rem] border border-secondary/20 p-8 md:p-10 shadow-luxury">
                    <h3 className="text-2xl font-serif font-bold text-primary dark:text-foreground mb-6 border-b border-secondary/15 pb-4 italic">
                      Custom Travel Plan
                    </h3>
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      {renderMarkdown(result.itinerary)}
                    </div>
                  </div>

                  {/* Sustainability banner & Cost summary */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/50 rounded-3xl p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <Leaf className="w-5 h-5 text-emerald-600" />
                        <h4 className="font-bold text-emerald-900 dark:text-emerald-400 text-sm">Eco-Tourism tips</h4>
                      </div>
                      <ul className="space-y-2">
                        {result.sustainability_tips?.map((tip: string, i: number) => (
                          <li key={i} className="text-xs text-emerald-800 dark:text-emerald-300 font-semibold flex items-start gap-2 leading-relaxed">
                            <span className="text-emerald-500">•</span>
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-accent/5 dark:bg-white/5 border border-secondary/20 dark:border-white/5 rounded-3xl p-6 shadow-sm">
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        <h4 className="font-bold text-primary dark:text-foreground text-sm">Estimated Expense</h4>
                      </div>
                      <p className="text-xs text-muted dark:text-white/70 font-semibold leading-relaxed">
                        {result.estimated_costs}
                      </p>
                      <div className="mt-4 pt-3 border-t border-secondary/15 flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-muted tracking-wider">Engine status</span>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                          {result.note || 'AI Online'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Recommended homestays */}
                  {recommendedVillas.length > 0 && (
                    <div className="space-y-6">
                      <h3 className="text-2xl font-serif font-bold text-primary dark:text-foreground italic">
                        Recommended Green Sanctuary
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recommendedVillas.map((villa, idx) => (
                          <div 
                            key={idx}
                            className="group bg-white dark:bg-card rounded-3xl overflow-hidden shadow-luxury border border-secondary/10 dark:border-white/5 transition-all duration-300 hover:-translate-y-1.5"
                          >
                            <div className="relative h-48 overflow-hidden">
                              <img 
                                src={villa.featured_photo || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000'} 
                                alt={villa.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                              />
                              <div className="absolute top-3 right-3 bg-primary dark:bg-card/90 backdrop-blur-md px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                                <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                <span className="text-xs font-bold text-white">{villa.rating || '4.8'}</span>
                              </div>
                              <div className="absolute bottom-3 left-3 bg-emerald-600 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md text-[10px] font-bold uppercase tracking-wider">
                                <Leaf className="w-3 h-3" />
                                {villa.sustainability_level || 'Level 1'}
                              </div>
                            </div>

                            <div className="p-5">
                              <div className="flex items-center gap-1 mb-1.5 text-secondary">
                                <MapPin className="w-3.5 h-3.5 text-accent" />
                                <span className="text-[10px] uppercase tracking-wider font-bold">{villa.location}</span>
                              </div>
                              <h4 className="font-serif font-bold text-lg text-primary dark:text-foreground group-hover:text-accent line-clamp-1 italic">
                                {villa.title}
                              </h4>
                              
                              <div className="flex items-center justify-between mt-4 pt-3 border-t border-secondary/10">
                                <div>
                                  <span className="text-[9px] uppercase tracking-widest font-bold text-muted">Starting from</span>
                                  <p className="text-sm font-bold text-primary dark:text-accent">
                                    ₹{villa.price_per_night} <span className="text-[10px] font-normal text-muted">/ night</span>
                                  </p>
                                </div>
                                <a 
                                  href={`/villas/1`} // Dynamic redirect to default view (matches route specs)
                                  className="px-4 py-2 bg-accent/10 text-accent rounded-xl text-xs font-bold hover:bg-accent hover:text-white transition-all flex items-center gap-1 shadow-sm"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                  View detail
                                </a>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </motion.div>
              ) : (
                /* EMPTY STATE */
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full bg-white/30 dark:bg-luxury-dark/30 backdrop-blur-xl rounded-[2.5rem] border border-secondary/20 p-12 flex flex-col items-center justify-center text-center shadow-luxury"
                >
                  <div className="w-20 h-20 rounded-3xl bg-accent/15 flex items-center justify-center mb-6 shadow-md border border-accent/20">
                    <Compass className="w-10 h-10 text-accent animate-spin-slow" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-primary dark:text-foreground mb-3 italic">
                    Your Sustainable Escape Awaits
                  </h3>
                  <p className="text-sm text-muted font-medium max-w-sm leading-relaxed">
                    Specify destination, days, budget, and travel preferences in the panel on the left to instantly generate a custom carbon-conscious travel itinerary!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}

export default function ProtectedAIPlannerPage() {
  return (
    <ProtectedRoute>
      <AIPlannerPage />
    </ProtectedRoute>
  );
}
