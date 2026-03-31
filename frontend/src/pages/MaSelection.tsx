import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, MessageCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSelection } from '../hooks/useSelection'; 

export default function MaSelection() {
  const { t } = useTranslation();
  
  // On ne récupère plus totalPrice ici
  const { selection, removeFromSelection } = useSelection();

  // --- CONFIGURATION WHATSAPP ---
  const WHATSAPP_NUMBER = "237670247456"; 

  const handleWhatsAppOrder = () => {
    if (selection.length === 0) return;

    let message = `*SOH & CHANTAL - ${t('whatsapp_order_title') || 'NOUVELLE COMMANDE'}*\n`;
    message += `----------------------------------\n\n`;
    
    selection.forEach((item, index) => {
      const displayName = item.name || item.description || t('model_default_name');
      message += `*${index + 1}. ${displayName.toUpperCase()}*\n`;
    });

    message += `\n----------------------------------\n`;
    message += `_Envoyé depuis ma sélection bilingue_`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-750 pt-46 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        
        {/* EN-TÊTE */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-4">
            <ShoppingBag className="text-[#b8860b]" size={32} />
            <h1 className="text-4xl md:text-5xl font-serif italic text-[#003366] dark:text-white">
              {t('my_selection_title')}
            </h1>
          </div>
          {selection.length > 0 && (
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#b8860b]/10 text-[#b8860b] px-4 py-2 rounded-full">
              {selection.length} {t('selection_count_label') || 'Modèles'}
            </span>
          )}
        </div>

        {selection.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 border border-dashed border-gray-200 dark:border-neutral-700 rounded-sm"
          >
            <p className="text-gray-400 italic mb-8">
              {t('empty_selection')}
            </p>
            <Link 
              to="/catalogue" 
              className="inline-flex items-center gap-2 text-[#b8860b] uppercase tracking-widest font-bold text-xs hover:gap-4 transition-all"
            >
              {t('back_to_catalogue')} <ArrowRight size={14} />
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence mode="popLayout">
              {selection.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, scale: 0.95 }}
                  className="flex items-center gap-6 bg-gray-50 dark:bg-neutral-700 p-4 rounded-sm border border-gray-100 dark:border-neutral-800 group"
                >
                  {/* IMAGE */}
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-24 h-32 object-cover rounded-sm shadow-md bg-white" 
                  />
                  
                  {/* INFOS */}
                  <div className="flex-1">
                    <p className="text-[#b8860b] text-[9px] uppercase tracking-[0.2em] font-bold mb-1">
                      {item.category}
                    </p>
                    <h3 className="font-serif text-xl text-[#003366] dark:text-white group-hover:text-[#b8860b] transition-colors">
                      {item.name || item.description}
                    </h3>
                  </div>

                  {/* SUPPRESSION */}
                  <button 
                    onClick={() => removeFromSelection(item.id)}
                    className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-750/30 rounded-full transition-all"
                    title={t('remove_item_tooltip') || 'Supprimer'}
                  >
                    <Trash2 size={20} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* BARRE D'ACTION WHATSAPP (SANS PRIX) */}
            <motion.div 
              layout
              className="mt-12 p-8 bg-[#003366] text-white rounded-sm shadow-2xl flex flex-col md:flex-row items-center justify-center gap-8 border-b-4 border-[#b8860b]"
            >
              <button
                onClick={handleWhatsAppOrder}
                className="group w-full md:w-auto flex items-center justify-center gap-4 px-12 py-5 bg-[#25D366] hover:bg-[#1eb956] text-white rounded-sm transition-all transform hover:scale-[1.02] shadow-xl"
              >
                <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
                <span className="font-black uppercase tracking-[0.2em] text-xs">
                  {t('order_via_whatsapp')}
                </span>
              </button>
            </motion.div>
            
            <p className="text-center text-[10px] text-gray-400 uppercase tracking-widest mt-6 italic">
              {t('order_disclaimer') || '* Contactez-nous pour discuter des tissus et des mesures.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}