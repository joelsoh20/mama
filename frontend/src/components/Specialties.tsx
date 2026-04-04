import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { Star, Send, X } from 'lucide-react';

export default function Specialties() {
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ name: '', comment: '', rating: 5 });

  const services = [
    { 
      title: t('spec_trad_title'), 
      tag: t('tag_heritage') || "Héritage",
      description: t('spec_trad_desc'),
      img: "https://www.newstoriesafrica.com/wp-content/uploads/2023/04/iweartoghu.jpg.webp" 
    },
    { 
      title: t('spec_emb_title'), 
      tag: t('tag_artisan') || "Artisanat",
      description: t('spec_emb_desc'),
      img: "https://i.pinimg.com/736x/79/65/e8/7965e841df3e1d71a16a3957b4891e70.jpg" 
    },
    { 
      title: t('spec_suit_title'), 
      tag: t('tag_prestige') || "Prestige",
      description: t('spec_suit_desc'),
      img: "https://images.unsplash.com/photo-1594932224828-b4b05a83296c?q=80&w=800https://www.google.com/imgres?q=coupure%20de%20tissus%20impecable&imgurl=https%3A%2F%2Fwww.craftine.com%2Fblog%2Fwp-content%2Fuploads%2F2019%2F04%2F20190404_170007c2.jpg&imgrefurl=https%3A%2F%2Fwww.craftine.com%2Fblog%2Fsavoir-lire-un-plan-de-coupe-et-decoupe-du-tissu%2F&docid=KWslq4DtO_u21M&tbnid=SUuJeCkBCDbgBM&vet=12ahUKEwjf0Pnj5cmTAxXwXUEAHf4fMMIQnPAOegQIEhAB..i&w=1000&h=685&hcb=2&ved=2ahUKEwjf0Pnj5cmTAxXwXUEAHf4fMMIQnPAOegQIEhAB" 
    },
    { 
      title: t('spec_dress_title'), 
      tag: t('tag_exclusive') || "Exclusivité",
      description: t('spec_dress_desc'),
      img: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=800" 
    }
  ];

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Envoi au backend avec statut 'pending' pour modération admin
      await axios.post('http://localhost:5000/api/testimonials', {
        ...formData,
        status: 'pending'
      });
      alert(t('review_success_msg'));
      setFormData({ name: '', comment: '', rating: 5 });
      setShowForm(false);
    } catch (error) {
      console.error("Erreur d'envoi du témoignage", error);
      alert(t('review_error_msg') || "Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-neutral-750 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl mb-4 italic text-[#b8860b]">
              {t('spec_title')}
            </h2>
            <p className="text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] text-xs font-bold">
              {t('spec_subtitle')}
            </p>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={() => setShowForm(!showForm)}
              className="text-sm font-bold border-b-2 border-[#b8860b] pb-1 hover:text-[#003366] transition-colors uppercase tracking-widest"
            >
              {showForm ? t('close_form') : t('leave_review_btn')}
            </button>
          </div>
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
              <form 
                onSubmit={handleSubmitReview} 
                className="max-w-3xl mx-auto p-8 border border-gray-100 bg-gray-50 dark:bg-neutral-700 rounded-lg space-y-6 shadow-sm"
              >
                <div className="flex justify-between items-center">
                   <h3 className="font-serif italic text-[#003366] dark:text-white text-xl">{t('form_review_title') || "Partagez votre expérience"}</h3>
                   <X className="cursor-pointer text-gray-400" onClick={() => setShowForm(false)} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder={t('form_name_placeholder')} 
                    required
                    className="p-3 bg-white dark:bg-neutral-700 border-none rounded-sm outline-[#b8860b] text-sm"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                  <div className="flex items-center gap-3 bg-white dark:bg-neutral-700 p-3 rounded-sm">
                    <span className="text-[10px] uppercase font-bold text-gray-400">{t('form_rating_label')}</span>
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map((star) => (
                        <Star 
                          key={star} 
                          size={16} 
                          fill={star <= formData.rating ? "#b8860b" : "none"} 
                          className="cursor-pointer text-[#b8860b] transition-transform hover:scale-120"
                          onClick={() => setFormData({...formData, rating: star})}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <textarea 
                  placeholder={t('form_comment_placeholder')} 
                  required
                  className="w-full p-3 bg-white dark:bg-neutral-700 border-none rounded-sm h-32 outline-[#b8860b] text-sm"
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                />

                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex items-center justify-center gap-2 w-full md:w-auto px-10 py-4 bg-[#003366] text-white font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-[#b8860b] transition-all disabled:opacity-50"
                >
                  {loading ? "..." : <><Send size={14} /> {t('submit_review')}</>}
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* --- GRILLE DES SPÉCIALITÉS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative h-[550px] cursor-pointer overflow-hidden rounded-sm"
            >
              <img 
                src={service.img} 
                alt={service.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-750 via-neutral-750/20 to-transparent opacity-90 transition-opacity group-hover:opacity-100" />
              
              <div className="absolute bottom-8 left-8 right-8 transition-transform duration-500">
                <span className="text-[#b8860b] text-[10px] uppercase tracking-[0.3em] font-black mb-3 block">
                  {service.tag}
                </span>
                <h3 className="text-white text-2xl font-serif italic mb-3">{service.title}</h3>
                
                <p className="text-gray-300 text-sm leading-relaxed h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                  {service.description}
                </p>
                
                <div className="w-12 h-[2px] bg-[#b8860b] mt-4 transition-all duration-500 group-hover:w-full" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}