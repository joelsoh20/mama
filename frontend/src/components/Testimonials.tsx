import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Star, Send, Quote } from 'lucide-react';

interface Testimonial {
  id: string;
  name: string;
  comment: string;
  rating: number;
  status: string;
}

export default function Testimonials() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [formData, setFormData] = useState({ name: '', comment: '', rating: 5 });

  // 1. Charger uniquement les témoignages validés (status: approved)
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/testimonials/approved');
        setTestimonials(response.data);
      } catch (error) {
        console.error("Erreur lors du chargement des témoignages", error);
      }
    };
    fetchTestimonials();
  }, []);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/testimonials', {
        ...formData,
        status: 'pending' // En attente de validation admin
      });
      alert(t('review_success_msg'));
      setFormData({ name: '', comment: '', rating: 5 });
      setShowForm(false);
    } catch (error) {
      alert(t('review_error_msg') || "Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-900 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* En-tête de section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl mb-4 italic text-[#b8860b]">{t('testimonials_title')}</h2>
            <p className="text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] text-xs font-bold">
              {t('testimonials_subtitle')}
            </p>
          </div>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-3 bg-[#003366] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#b8860b] transition-all rounded-sm shadow-xl"
          >
            {showForm ? t('close_form') : t('leave_review_btn')}
          </button>
        </div>

        {/* --- FORMULAIRE D'AVIS --- */}
        <AnimatePresence>
          {showForm && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12"
            >
              <form onSubmit={handleSubmitReview} className="max-w-3xl mx-auto p-8 border border-gray-100 bg-white dark:bg-neutral-700 rounded-lg shadow-sm space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder={t('form_name_placeholder')} 
                    required
                    className="p-3 bg-neutral-50 dark:bg-neutral-700 border-none rounded-sm outline-[#b8860b]"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <div className="flex items-center gap-2 bg-neutral-50 dark:bg-neutral-700 p-3 rounded-sm">
                    <span className="text-xs text-gray-400">{t('form_rating_label')} :</span>
                    {[1,2,3,4,5].map((star) => (
                      <Star 
                        key={star} 
                        size={16} 
                        fill={star <= formData.rating ? "#b8860b" : "none"} 
                        className="cursor-pointer text-[#b8860b]"
                        onClick={() => setFormData({...formData, rating: star})}
                      />
                    ))}
                  </div>
                </div>
                <textarea 
                  placeholder={t('form_comment_placeholder')} 
                  required
                  className="w-full p-3 bg-neutral-50 dark:bg-neutral-700 border-none rounded-sm h-32 outline-[#b8860b]"
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                />
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center gap-2 px-8 py-3 bg-[#b8860b] text-white font-bold uppercase text-xs tracking-widest hover:bg-[#003366] transition-all"
                >
                  <Send size={14} /> {loading ? "..." : t('submit_review')}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- AFFICHAGE DES TÉMOIGNAGES (GRILLE) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.length > 0 ? (
            testimonials.map((item, index) => (
              <motion.div 
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-neutral-800 p-8 rounded-sm shadow-sm relative group"
              >
                <Quote className="absolute top-4 right-4 text-neutral-100 dark:text-neutral-700 group-hover:text-[#b8860b]/20 transition-colors" size={40} />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill={i < item.rating ? "#b8860b" : "none"} className="text-[#b8860b]" />
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 italic mb-6 leading-relaxed">
                  "{item.comment}"
                </p>

                <div className="border-t border-gray-100 dark:border-neutral-700 pt-4">
                  <h4 className="font-bold text-[#003366] dark:text-[#b8860b] text-sm uppercase tracking-widest">
                    {item.name}
                  </h4>
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-400 italic col-span-full text-center">
              {t('no_testimonials_yet') || "Aucun témoignage pour le moment."}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}