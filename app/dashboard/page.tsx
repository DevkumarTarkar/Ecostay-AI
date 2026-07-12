'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { useAuth, ProtectedRoute } from '@/app/lib/auth';

import { 
  Calendar, 
  Heart, 
  Star, 
  Sparkles, 
  MapPin, 
  Clock, 
  LogOut, 
  Edit, 
  Trash2, 
  Plus, 
  Settings, 
  User, 
  SlidersHorizontal,
  Leaf
} from 'lucide-react';
import { Button, Input, Modal, Toast, Loader } from '@/components/ui';
import { 
  fetchHomestays, 
  createHomestay, 
  updateHomestay, 
  deleteHomestay 
} from '@/app/lib/api';

const Dashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'admin'>('profile');
  const [homestays, setHomestays] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);


  // Modal & Form States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price_per_night: '',
    description: '',
    rating: '4.5',
    reviews_count: '10',
    guests: '2',
    bedrooms: '1',
    bathrooms: '1',
    sustainability_level: 'Level 1',
    amenities: 'Wifi, Organic Food',
    featured_photo: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000'
  });

  const loadHomestays = async () => {
    setLoading(true);
    try {
      const response = await fetchHomestays();
      if (response.success && Array.isArray(response.data)) {
        setHomestays(response.data);
      } else {
        setError('Unexpected API response structure');
      }
    } catch (err: any) {
      console.error(err);
      setError('Failed to fetch homestays from the database');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'admin') {
      loadHomestays();
    }
  }, [activeTab]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOpenAddModal = () => {
    setEditingId(null);
    setFormData({
      title: '',
      location: '',
      price_per_night: '',
      description: '',
      rating: '4.5',
      reviews_count: '10',
      guests: '2',
      bedrooms: '1',
      bathrooms: '1',
      sustainability_level: 'Level 1',
      amenities: 'Wifi, Organic Food',
      featured_photo: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (hs: any) => {
    setEditingId(hs.id);
    setFormData({
      title: hs.title || '',
      location: hs.location || '',
      price_per_night: hs.price_per_night?.toString() || '',
      description: hs.description || '',
      rating: hs.rating?.toString() || '4.5',
      reviews_count: hs.reviews_count?.toString() || '10',
      guests: hs.guests?.toString() || '2',
      bedrooms: hs.bedrooms?.toString() || '1',
      bathrooms: hs.bathrooms?.toString() || '1',
      sustainability_level: hs.sustainability_level || 'Level 1',
      amenities: Array.isArray(hs.amenities) ? hs.amenities.join(', ') : hs.amenities || '',
      featured_photo: hs.featured_photo || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000'
    });
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Parse values
    const dataToSend = {
      title: formData.title,
      location: formData.location,
      price_per_night: parseFloat(formData.price_per_night) || 0,
      description: formData.description,
      rating: parseFloat(formData.rating) || 0,
      reviews_count: parseInt(formData.reviews_count) || 0,
      guests: parseInt(formData.guests) || 1,
      bedrooms: parseInt(formData.bedrooms) || 1,
      bathrooms: parseInt(formData.bathrooms) || 1,
      sustainability_level: formData.sustainability_level,
      amenities: formData.amenities.split(',').map(s => s.trim()).filter(Boolean),
      featured_photo: formData.featured_photo
    };

    try {
      if (editingId) {
        // Update operation
        await updateHomestay(editingId, dataToSend);
        setSuccessMsg('Villa updated successfully in database!');
      } else {
        // Create operation
        await createHomestay(dataToSend);
        setSuccessMsg('Villa added successfully to database!');
      }
      setIsModalOpen(false);
      loadHomestays();
    } catch (err: any) {
      console.error(err);
      setError('Failed to save villa details to the database.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this villa from the database?')) return;
    setLoading(true);
    try {
      await deleteHomestay(id);
      setSuccessMsg('Villa deleted successfully from database!');
      loadHomestays();
    } catch (err: any) {
      console.error(err);
      setError('Failed to delete villa.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-24 text-foreground">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary italic leading-tight">
              Welcome back, <span className="text-yellow-500 underline decoration-primary/20">{user?.full_name || "Guest"}</span>
            </h1>
            <p className="text-primary/70 mt-2 font-medium">
              {activeTab === 'profile' 
                ? 'Manage your luxury retreats and discover AI-curated escapes.'
                : 'Directly manage homestays and villas in the PostgreSQL database.'
              }
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ${activeTab === 'profile' ? 'bg-primary text-white' : 'border border-primary/20 hover:bg-secondary/10'}`}
            >
              <User className="w-5 h-5" />
              My Profile
            </button>
            <button 
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full font-bold transition-all ${activeTab === 'admin' ? 'bg-primary text-white' : 'border border-primary/20 hover:bg-secondary/10'}`}
            >
              <Settings className="w-5 h-5" />
              Admin Panel
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'profile' ? (
          /* Profile Tab */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Bookings & Saved */}
            <div className="lg:col-span-2 space-y-8">
              {/* My Bookings */}
              <div className="bg-card text-card-foreground rounded-[2rem] p-8 shadow-luxury border border-white/5">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                    <Calendar className="text-secondary w-6 h-6" />
                    My Upcoming Retreats
                  </h2>
                  <button className="text-primary font-bold text-sm hover:text-secondary transition-colors underline">View History</button>
                </div>

                <div className="space-y-6">
                  {[
                    { name: "Sunset Pool Villa", location: "Goa", date: "June 24 - June 28", status: "Upcoming", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2000" },
                    { name: "Mountain View Homestay", location: "Manali", date: "April 12 - April 15", status: "Completed", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000" }
                  ].map((booking, idx) => (
                    <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl border border-secondary/5 hover:border-secondary/20 transition-all group">
                      <img src={booking.image} alt={booking.name} className="w-24 h-24 rounded-xl object-cover" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">{booking.name}</h3>
                            <div className="flex items-center gap-1 text-sm text-primary/80 mt-1 font-medium">
                              <MapPin className="w-3.5 h-3.5" /> {booking.location}
                            </div>
                          </div>
                          <span className={`text-[11px] uppercase tracking-widest font-bold px-4 py-1.5 rounded-full ${booking.status === 'Upcoming' ? 'bg-primary text-secondary' : 'bg-gray-200 dark:bg-white/10 text-gray-700'}`}>
                            {booking.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 mt-4 text-sm font-bold text-primary">
                          <Clock className="w-4 h-4 text-secondary" />
                          {booking.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved Properties */}
              <div className="bg-card text-card-foreground rounded-3xl p-8 shadow-luxury border border-white/5 transition-colors">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-serif font-bold text-primary flex items-center gap-3">
                    <Heart className="text-secondary w-6 h-6" />
                    Saved Sanctuaries
                  </h2>
                  <button className="text-primary font-bold text-sm hover:underline">See All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { name: "Forest Eco Retreat", location: "Coorg", rating: 4.8, image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=2000" },
                    { name: "Riverside Luxury Stay", location: "Udaipur", rating: 4.9, image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2000" }
                  ].map((prop, idx) => (
                    <div key={idx} className="relative aspect-video rounded-2xl overflow-hidden group">
                      <img src={prop.image} alt={prop.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                        <h4 className="text-white font-bold">{prop.name}</h4>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-white/60 text-xs">{prop.location}</span>
                          <div className="flex items-center gap-1 text-secondary">
                            <Star className="w-3 h-3 fill-secondary" />
                            <span className="text-xs font-bold">{prop.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - AI Picks & Pulse */}
            <div className="space-y-8">
              <div className="bg-white dark:bg-yellow-400 text-primary dark:text-black rounded-[3rem] p-8 shadow-2xl relative overflow-hidden border border-secondary/20 dark:border-black/5">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-secondary/20 dark:bg-black/5 rounded-full blur-3xl opacity-50" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles className="text-secondary dark:text-black w-8 h-8" />
                    <h2 className="text-2xl font-serif font-bold text-primary dark:text-black leading-tight">AI Picks <br /><span className="text-secondary dark:text-black italic">For You</span></h2>
                  </div>
                  <p className="text-muted dark:text-black/80 text-sm leading-relaxed mb-8 font-medium">
                    Based on your past preferences for hills and sustainable stays, we recommend:
                  </p>
                  
                  <div className="space-y-6">
                    {[
                      { name: "Cloud 9 Valley Lodge", location: "Nainital", desc: "Eco-certified mountain lodge with panoramic valley views." },
                      { name: "Whispering Woods", location: "Rishikesh", desc: "Private river-side retreat focused on wellness and yoga." }
                    ].map((pick, idx) => (
                      <div key={idx} className="p-5 bg-primary/5 dark:bg-black/5 rounded-2xl border border-secondary/10 dark:border-black/10 hover:bg-secondary/10 dark:hover:bg-black/10 transition-all cursor-pointer group">
                        <h4 className="font-bold text-primary dark:text-black group-hover:translate-x-1 transition-transform">{pick.name}</h4>
                        <p className="text-[11px] uppercase tracking-widest text-muted dark:text-black mt-1 font-bold">{pick.location}</p>
                        <p className="text-sm text-muted dark:text-black mt-3 italic leading-relaxed">"{pick.desc}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Admin CRUD Panel Tab */
          <div className="bg-card text-card-foreground rounded-[2rem] p-8 shadow-luxury border border-white/5 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary">Eco Villa Database Records</h2>
                <p className="text-sm text-primary/70 font-medium">Read, Write, Update, and Delete villas directly from the database.</p>
              </div>
              <Button onClick={handleOpenAddModal} className="flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add New Villa
              </Button>
            </div>

            {loading && homestays.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader className="scale-125 mb-4" />
                <p className="text-sm font-serif italic text-primary/60">Fetching latest database records...</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-secondary/10 bg-white/50">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-secondary/10 bg-primary/5 text-primary text-xs uppercase tracking-wider font-bold">
                      <th className="px-6 py-4">Villa Details</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Price/Night</th>
                      <th className="px-6 py-4">Rating</th>
                      <th className="px-6 py-4">Sustainability</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary/5 text-sm font-medium">
                    {homestays.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="text-center py-12 text-primary/40 italic">
                          No homestays found in the database. Add one to get started!
                        </td>
                      </tr>
                    ) : (
                      homestays.map((hs) => (
                        <tr key={hs.id} className="hover:bg-primary/5 transition-all">
                          <td className="px-6 py-4 flex items-center gap-4">
                            <img 
                              src={hs.featured_photo || 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=100'} 
                              alt={hs.title} 
                              className="w-12 h-12 rounded-xl object-cover border border-secondary/10"
                            />
                            <div>
                              <div className="font-bold text-primary">{hs.title}</div>
                              <div className="text-xs text-primary/60 mt-0.5">{hs.guests} Guests • {hs.bedrooms} Bed • {hs.bathrooms} Bath</div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4 text-secondary" />
                              {hs.location}
                            </div>
                          </td>
                          <td className="px-6 py-4 text-primary font-bold">₹{hs.price_per_night}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-1 font-bold">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {hs.rating} <span className="text-xs text-primary/60 font-medium">({hs.reviews_count})</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
                              <Leaf className="w-3.5 h-3.5" />
                              {hs.sustainability_level}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button 
                                onClick={() => handleOpenEditModal(hs)}
                                className="p-2 rounded-full border border-secondary/10 text-primary hover:bg-secondary/10 transition-colors"
                                title="Edit Record"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(hs.id)}
                                className="p-2 rounded-full border border-red-500/10 text-red-500 hover:bg-red-50 transition-colors"
                                title="Delete Record"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingId ? 'Edit Villa Record' : 'Create New Villa Record'}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-left max-h-[70vh] overflow-y-auto px-1 py-2">
          <Input 
            label="Villa Title" 
            name="title" 
            value={formData.title} 
            onChange={handleInputChange} 
            required 
            placeholder="e.g., Forest View Cabin"
          />
          <Input 
            label="Location" 
            name="location" 
            value={formData.location} 
            onChange={handleInputChange} 
            required 
            placeholder="e.g., Manali, Himachal Pradesh"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Price/Night (₹)" 
              name="price_per_night" 
              type="number" 
              value={formData.price_per_night} 
              onChange={handleInputChange} 
              required 
              placeholder="e.g., 5000"
            />
            <Input 
              label="Rating (0 - 5)" 
              name="rating" 
              type="number" 
              step="0.01" 
              value={formData.rating} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Input 
              label="Guests" 
              name="guests" 
              type="number" 
              value={formData.guests} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label="Bedrooms" 
              name="bedrooms" 
              type="number" 
              value={formData.bedrooms} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label="Bathrooms" 
              name="bathrooms" 
              type="number" 
              value={formData.bathrooms} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Reviews Count" 
              name="reviews_count" 
              type="number" 
              value={formData.reviews_count} 
              onChange={handleInputChange} 
              required 
            />
            <Input 
              label="Sustainability Level" 
              name="sustainability_level" 
              value={formData.sustainability_level} 
              onChange={handleInputChange} 
              required 
              placeholder="e.g. Level 3"
            />
          </div>

          <Input 
            label="Amenities (comma-separated)" 
            name="amenities" 
            value={formData.amenities} 
            onChange={handleInputChange} 
            placeholder="e.g., Wifi, Solar Power, Organic Garden"
          />

          <Input 
            label="Featured Image URL" 
            name="featured_photo" 
            value={formData.featured_photo} 
            onChange={handleInputChange} 
            placeholder="Image URL"
          />

          <div className="space-y-2">
            <label className="text-sm font-bold text-primary/80 ml-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={3}
              className="flex w-full rounded-2xl border border-secondary/20 bg-white/50 px-4 py-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
              placeholder="Provide a detailed description of the eco stay..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-secondary/10">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" isLoading={loading}>
              {editingId ? 'Save Changes' : 'Create Villa'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* Floating Notifications */}
      <div className="fixed bottom-8 right-8 z-50 space-y-4">
        {error && <Toast message={error} type="error" onClose={() => setError(null)} />}
        {successMsg && <Toast message={successMsg} type="success" onClose={() => setSuccessMsg(null)} />}
      </div>

      <Footer />
    </main>
  );
};

export default function ProtectedDashboard() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}