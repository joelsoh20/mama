import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const FAQ = () => {
  const [active, setActive] = useState<number | null>(null);
  const { t } = useTranslation();

  // On définit les numéros de FAQ existants dans le dictionnaire
  const faqIndexes = [1, 2, 3, 4];

  return (
    <section className="py-24 bg-neutral-50 dark:bg-neutral-800/30 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif italic mb-4 dark:text-white">
            {t('faq_title')}
          </h2>
          {/* Utilisation de ta couleur Or #b8860b */}
          <div className="w-16 h-1 bg-[#b8860b] mx-auto"></div>
        </div>

        <div className="space-y-4">
          {faqIndexes.map((index) => (
            <div 
              key={index} 
              className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-750 rounded-xl overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => setActive(active === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                <span className="font-bold text-neutral-900 dark:text-neutral-200 pr-4">
                  {t(`faq_q${index}`)}
                </span>
                <div className={`transition-transform duration-300 ${active === index ? 'rotate-180' : ''}`}>
                  {active === index ? (
                    <Minus size={20} className="text-[#b8860b]" />
                  ) : (
                    <Plus size={20} className="text-neutral-400" />
                  )}
                </div>
              </button>

              <AnimatePresence>
                {active === index && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-6 pb-6 text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed border-t border-neutral-100 dark:border-neutral-700 pt-4">
                      {t(`faq_a${index}`)}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};