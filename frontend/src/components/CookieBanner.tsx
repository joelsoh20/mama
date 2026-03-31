import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);

  // On attend 2 secondes avant d'afficher le bandeau pour l'effet Waouh
  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem('cookie-consent', 'true');
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-6 right-6 z-[100] md:left-auto md:right-10 md:max-w-md"
        >
          <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-6 shadow-2xl rounded-2xl relative">
            <button onClick={() => setShow(false)} className="absolute top-4 right-4 opacity-50 hover:opacity-100">
              <X size={18} />
            </button>
            
            <div className="flex items-start gap-4">
              <div className="bg-accent-500/10 p-3 rounded-xl text-accent-500">
                <Cookie size={24} />
              </div>
              <div>
                <h4 className="text-lg font-serif italic mb-1">Un petit cookie ?</h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
                  Nous utilisons des cookies pour améliorer votre expérience sur notre atelier en ligne.
                </p>
                <div className="flex gap-3">
                  <button onClick={accept} className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-transform active:scale-95">
                    Accepter
                  </button>
                  <button onClick={() => setShow(false)} className="text-xs font-bold uppercase tracking-widest px-4 py-3 hover:underline">
                    Refuser
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}