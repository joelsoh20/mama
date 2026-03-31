import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=2000&auto=format&fit=crop", // Texture & Robe
    title: "L'Élégance",
    subtitle: "à la main"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1590736961918-712318337841?q=80&w=2000&auto=format&fit=crop", // Atelier & Détails
    title: "Le Geste",
    subtitle: "Maîtrisé"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?q=80&w=2000&auto=format&fit=crop", // Couture & Tradition
    title: "La Passion",
    subtitle: "Du Détail"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* 1. CARROUSEL D'IMAGES HD */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img 
            key={slides[current].id}
            src={slides[current].url} 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full object-cover grayscale-[15%]"
          />
        </AnimatePresence>
        
        {/* OVERLAY DOUX (Bleu Nuit profond à 50% au lieu du noir pur) */}
        <div className="absolute inset-0 bg-[#003366]/50 backdrop-blur-[0.5px]" />
      </div>

      {/* 2. CONTENU TEXTUEL CENTRAL */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-[1px] w-8 bg-[#b8860b]"></div>
            <span className="text-[#b8860b] uppercase tracking-[0.4em] text-[10px] font-bold">
              Haute Couture Camerounaise
            </span>
            <div className="h-[1px] w-8 bg-[#b8860b]"></div>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif leading-[1.1] mb-8">
            {slides[current].title} <br /> 
            <span className="italic font-light">{slides[current].subtitle}</span>
          </h1>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/catalogue">
              <motion.button
                whileHover={{ backgroundColor: "#ffffff", color: "#003366", scale: 1.05 }}
                className="bg-[#b8860b] text-white font-bold text-[11px] uppercase tracking-[0.2em] px-12 py-5 transition-all shadow-xl"
              >
                Découvrir la Collection
              </motion.button>
            </Link>

            <Link to="/atelier">
              <motion.button
                whileHover={{ backgroundColor: "rgba(255,255,255,0.1)", scale: 1.05 }}
                className="border border-white/50 text-white font-bold text-[11px] uppercase tracking-[0.2em] px-12 py-5 transition-all"
              >
                Notre Histoire
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* NAVIGATION DU CARROUSEL */}
      <button onClick={prevSlide} className="absolute left-6 z-20 text-white/50 hover:text-white transition-colors p-2 hidden md:block">
        <ChevronLeft size={32} />
      </button>
      <button onClick={nextSlide} className="absolute right-6 z-20 text-white/50 hover:text-white transition-colors p-2 hidden md:block">
        <ChevronRight size={32} />
      </button>

      {/* POINTS INDICATEURS */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {slides.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrent(index)}
            className={`h-1 transition-all duration-500 rounded-full ${index === current ? 'w-10 bg-[#b8860b]' : 'w-2 bg-white/30'}`}
          />
        ))}
      </div>
    </section>
  );
}