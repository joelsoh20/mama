import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section className="hero-bg h-screen flex items-center relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6 text-center text-white z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
            L'Élégance<br />à la Main
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-gray-200">
            Créations uniques, sur mesure, réalisées avec passion dans notre atelier à Douala.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/catalogue"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-accent-500 hover:bg-accent-600 text-black font-semibold text-lg px-10 py-4 rounded-full transition-all"
            >
              Découvrir le Catalogue
            </motion.a>

            <motion.a
              href="/atelier"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white hover:bg-white hover:text-black font-semibold text-lg px-10 py-4 rounded-full transition-all"
            >
              Notre Histoire
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70"
      >
        ↓ Scroll
      </motion.div>
    </section>
  );
}