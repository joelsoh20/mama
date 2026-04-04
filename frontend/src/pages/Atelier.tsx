import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next'; // Import pour le bilinguisme
import { Users, Heart, Camera, MapPin } from 'lucide-react';

// Imports des assets
import photoFlore from '../assets/photoFlore.jpeg'; 
import photoChantal from '../assets/photoChantal.jpeg';
import Couturier1 from '../assets/Couturier1.jpeg';
import Couturiere3 from '../assets/Couturiere3.jpeg';
import Couturiere2 from '../assets/Couturiere2.jpeg';
import Couturiere4 from '../assets/Couturiere4.jpeg';

import locaux1 from '../assets/Presentation25.jpeg';
import locaux2 from '../assets/Presentation23.jpeg';
import locaux3 from '../assets/Presentation19.jpeg';

export default function Atelier() {
  const { t } = useTranslation();

  // On définit les données à l'intérieur pour utiliser la fonction t()
  const fondatrices = [
    {
      id: 1,
      name: "TALLA Jeanine",
      role: t('atelier.founder1_role'),
      image: photoFlore, 
      bio: t('atelier.founder1_bio')
    },
    {
      id: 2,
      name: "ERWAN Chantal",
      role: t('atelier.founder2_role'),
      image: photoChantal,
      bio: t('atelier.founder2_bio')
    }
  ];

  const employees = [
    { id: 1, name: "Eline", role: t('atelier.role_senior'), image: Couturiere3 },
    { id: 2, name: "Laura", role: t('atelier.role_embroidery'), image: Couturiere2 },
    { id: 3, name: "Ange", role: t('atelier.role_modeliste'), image: Couturiere4 },
    { id: 4, name: "Ruth", role: t('atelier.role_finishing'), image: Couturier1 },
  ];

  const locaux = [
    { id: 1, url: locaux1, title: t('l/entrer de l/atelier') },
    { id: 2, url: locaux2, title: t('atelier.locaux_2') },
    { id: 3, url: locaux3, title: t('atelier.locaux_3') },
  ];

  return (
    <div className="max-w-7xl mx-auto pt-46 px-6 py-16 bg-[#faf9f6] dark:bg-neutral-950 transition-colors duration-500">
      
      {/* Hero Atelier */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24"
      >
        <span className="text-[#b8860b] font-medium tracking-widest uppercase text-sm">{t('atelier.hero_subtitle')}</span>
        <h1 className="text-5xl md:text-7xl font-serif text-[#003366] dark:text-white mt-4 mb-6">{t('atelier.hero_title')}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto italic">
          "{t('atelier.hero_quote')}"
        </p>
      </motion.div>

      {/* Section Fondatrices */}
      <section className="mb-32">
        <div className="flex items-center gap-3 mb-16 justify-center md:justify-start">
          <Heart className="text-[#b8860b]" size={28} />
          <h2 className="text-4xl font-serif text-[#003366] dark:text-white">{t('atelier.founders_section_title')}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-16">
          {fondatrices.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, x: index === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl shadow-2xl mb-8 border dark:border-white/10">
                <img 
                  src={founder.image} 
                  alt={founder.name}
                  className="w-full h-[700px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <h3 className="text-3xl font-serif text-[#003366] dark:text-white mb-2">{founder.name}</h3>
              <p className="text-[#b8860b] font-semibold mb-4 uppercase text-sm tracking-widest">{founder.role}</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">{founder.bio}</p>
            </motion.div>
          ))}
        </div> 
      </section> 

      {/* Section Locaux */}
      <section className="mb-32">
        <div className="flex items-center gap-3 mb-16">
          <Camera className="text-[#b8860b]" size={28} />
          <h2 className="text-4xl font-serif text-[#003366] dark:text-white">{t('atelier.locaux_section_title')}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {locaux.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="relative h-80 rounded-xl overflow-hidden shadow-lg dark:shadow-none border dark:border-white/10 group"
            >
              <img src={photo.url} alt={photo.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-black/30 dark:bg-[#003366]/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center text-center px-4">
                <p className="text-white font-serif text-2xl italic tracking-wide">{photo.title}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-white dark:bg-neutral-900 border-l-4 border-[#b8860b] rounded-r-xl shadow-sm dark:shadow-none flex items-center gap-6 transition-colors">
           <MapPin className="text-[#003366] dark:text-[#b8860b]" size={40} />
           <div>
              <p className="text-[#003366] dark:text-white font-bold">{t('atelier.location_city')}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{t('atelier.location_desc')}</p>
           </div>
        </div>
      </section>

      {/* Section Équipe */}
      <section>
        <div className="flex items-center gap-3 mb-16">
          <Users className="text-[#b8860b]" size={28} />
          <h2 className="text-4xl font-serif text-[#003366] dark:text-white">{t('atelier.team_section_title')}</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {employees.map((emp, index) => (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative mb-6 mx-auto w-40 h-40 overflow-hidden rounded-full border-4 border-white dark:border-neutral-800 shadow-lg ring-2 ring-[#b8860b]/20">
                <img src={emp.image} alt={emp.name} className="w-full h-full object-cover hover:grayscale-0 transition-all duration-500" />
              </div>
              <h4 className="font-serif text-[#003366] dark:text-white text-xl mb-1">{emp.name}</h4>
              <p className="text-xs text-[#b8860b] uppercase tracking-widest font-medium">{emp.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}