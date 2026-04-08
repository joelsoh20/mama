import Hero from '../components/Hero';
import Specialties from '../components/Specialties';
import Testimonials from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode } from 'swiper/modules';

// Imports CSS Swiper corrigés (version propre et stable)
import 'swiper/css';
import 'swiper/css/free-mode';

import img1 from '../assets/Presentation18.jpeg';
import img2 from '../assets/Presentation16.jpeg';
import img3 from '../assets/Presentation12.jpeg';
import img4 from '../assets/Presentation10.jpeg';
import img5 from '../assets/Presentation9.jpeg';
import img6 from '../assets/Presentation11.jpeg';
import img7 from '../assets/Presentation8.jpeg';
import img8 from '../assets/Presentation7.jpeg';
import img9 from '../assets/Presentation3.jpeg';
import img10 from '../assets/Presentation2.jpeg';
import img11 from '../assets/Presentation1.jpeg';
import img12 from '../assets/Presentation5.jpeg';
import img13 from '../assets/Presentation4.jpeg';
import img14 from '../assets/Presentation17.jpeg';
import img15 from '../assets/Presentation20.jpeg';

export default function Home() {
  const { t } = useTranslation();

  const creations = [
    { id: 1, img: img1, key: "Bombers" },
    { id: 2, img: img2, key: "Ensemble par dessus" },
    { id: 3, img: img3, key: "Ensemble boubou chemise" },
    { id: 4, img: img4, key: "Chemise" },
    { id: 5, img: img5, key: "Ensemble veste et ensemble boubou" },
    { id: 6, img: img6, key: "Ensemble boubou" },
    { id: 7, img: img7, key: "Kaba" },
    { id: 8, img: img8, key: "Tenu Traditionnel" },
    { id: 9, img: img9, key: "veste pour enfant" },
    { id: 10, img: img10, key: "robe mariage" },
    { id: 14, img: img11, key: "Ensemble boubou et veste" },
    { id: 11, img: img12, key: "Ensemble boubou" },
    { id: 12, img: img13, key: "Veste dame" },
    { id: 13, img: img14, key: "Ensemble boubou" },
    { id: 14, img: img15, key: "Kaba" },
  ];

  return (
    <div className="bg-[#faf9f6] text-[#003366]">
      <Hero />

      <div className="relative z-10 -mt-10">
         <Specialties />
      </div>

      <section className="py-32 bg-[#f3f1eb] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* En-tête */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles size={18} className="text-[#b8860b]" />
                <span className="text-[#b8860b] font-bold tracking-[0.3em] text-[10px] uppercase">
                  {t('section_creations_badge')}
                </span>
              </div>
              <h2 className="text-5xl md:text-6xl font-serif text-[#003366] leading-tight">
                {t('section_creations_title')} <span className="italic">{t('section_creations_italic')}</span>
              </h2>
            </motion.div>

            <Link to="/catalogue" className="group flex items-center gap-3 font-bold text-xs uppercase tracking-[0.2em] text-[#003366] border-b border-[#b8860b] pb-2">
              {t('section_creations_link')} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
          
          {/* Slider */}
          <Swiper
            modules={[Autoplay, FreeMode]}
            spaceBetween={20}
            slidesPerView={1.2}
            grabCursor={true}
            freeMode={{
              enabled: true,
              sticky: false,
              momentum: true,
            }}
            loop={true}
            autoplay={{
              delay: 1,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={6000}
            touchEventsTarget="container"
            simulateTouch={true}
            breakpoints={{
              640: { slidesPerView: 2.5 },
              1024: { slidesPerView: 4 },
            }}
            className="creations-swiper-clean"
          >
            {creations.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="group relative">
                  <div className="aspect-[3/4] overflow-hidden rounded-sm bg-neutral-200">
                    <img 
                      src={item.img} 
                      className="w-full h-full object-cover transition-all duration-700" 
                      alt={t(`atelier.creations.${item.key}`)} 
                    />
                    <div className="absolute inset-0 bg-[#003366]/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-4">
                      <p className="text-white text-[10px] uppercase tracking-[0.2em] font-bold border-b border-white/50 pb-1">
                        {t(`atelier.creations.${item.key}`)}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Styles personnalisés */}
        <style dangerouslySetInnerHTML={{ __html: `
          .creations-swiper-clean .swiper-wrapper {
            transition-timing-function: linear !important;
          }
          .creations-swiper-clean .swiper-pagination,
          .creations-swiper-clean .swiper-button-next,
          .creations-swiper-clean .swiper-button-prev {
            display: none !important;
          }
        `}} />
      </section>

      <Testimonials />
      
      <section className="bg-[#f2f0eb] py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FAQ />
        </div>
      </section>

      <section className="relative py-32 bg-[#003366] text-white overflow-hidden text-center">
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <h3 className="text-4xl md:text-6xl font-serif italic mb-8">{t('cta_final_title')}</h3>
          <p className="text-white/70 mb-12 max-w-lg mx-auto">{t('cta_final_desc')}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="bg-[#b8860b] text-white px-10 py-5 font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-[#003366] transition-all">
              {t('cta_final_button')}
            </Link>
            <div className="flex items-center gap-2 text-white/60 text-[10px] uppercase tracking-widest">
              <MapPin size={14} className="text-[#b8860b]" />
              {t('location')}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}