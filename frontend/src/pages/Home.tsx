import Hero from '../components/Hero';
import Specialties from '../components/Specialties';
import Testimonials from '../components/Testimonials';
import { FAQ } from '../components/FAQ';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next'; // 1. Importation
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import img1 from '../assets/Presentation15.jpeg';
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


export default function Home() {
  const { t } = useTranslation(); // 2. Initialisation

  // 1. Définis tes données (tu peux mettre tes propres images ici)
const creations = [
  { id: 1, img: img1, key: "model_1" },
  { id: 2, img: img2, key: "model_2" },
  { id: 3, img: img3, key: "model_3" },
  { id: 4, img: img4, key: "Boubou en soie brodé main" },
  { id: 5, img: img5, key: "model_5" },
  { id: 6, img: img6, key: "model_6" },
  { id: 7, img: img7, key: "model_7" },
  { id: 8, img: img8, key: "model_8" },
  { id: 9, img: img9, key: "model_9" },
  { id: 10, img: img10, key: "model_10" },
  { id: 10, img: img11, key: "model_11" },
  { id: 11, img: img12, key: "model_12" },
  { id: 12, img: img13, key: "model_13" },
  { id: 13, img: img14, key: "model_14" },
];
{/* <script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Product",
  "name": "Boubou Royal SOH & CHANTAL",
  "image": "https://ton-site.com/image-cloudinary.jpg",
  "description": "Boubou traditionnel élégant fabriqué sur mesure à Douala.",
  "brand": {
    "@type": "Brand",
    "name": "SOH & CHANTAL"
  }
}
</script> */}
  return (
    <div className="bg-[#faf9f6] text-[#003366]">
      <Hero />

      <div className="relative z-10 -mt-10">
         <Specialties />
      </div>

      

<section className="py-32 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6">
        {/* En-tête de section */}
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
        
        {/* Slider de créations */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1} // 1 image sur mobile par défaut
          autoplay={{
            delay: 3000, // Défilement toutes les 5 secondes
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            // Configuration pour tablettes et ordinateurs
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          className="creations-swiper"
        >
          {creations.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="group relative">
                <div className="aspect-[3/4] overflow-hidden rounded-sm bg-neutral-200">
                  <img 
                    src={item.img} 
                    className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-700" 
                    alt={t(`atelier.creations.${item.key}`)} 
                  />
                  {/* Overlay avec uniquement le nom du modèle */}
                  <div className="absolute inset-0 bg-[#003366]/40 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-6 text-center">
                    <p className="text-white text-xs uppercase tracking-[0.3em] font-medium">
                      {t(`atelier.creations.${item.key}`)}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Petit style CSS pour personnaliser les points de pagination */}
      <style dangerouslySetInnerHTML={{ __html: `
        .creations-swiper .swiper-pagination-bullet-active {
          background: #b8860b !important;
        }
      `}} />
    </section>

      <Testimonials />
      
      <section className="bg-[#f2f0eb] py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
            {/* <h2 className="text-4xl font-serif mb-4 text-[#003366]">{t('faq_title')}</h2> */}
            {/* <div className="h-1 w-20 bg-[#b8860b] mx-auto mb-16"></div> */}
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