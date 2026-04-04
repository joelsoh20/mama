import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import logoSC from '../assets/S_C_mode-removebg-preview.png';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const toggleLanguage = () => {
    const newLang = i18n.language.includes('fr') ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('catalogue'), path: '/catalogue' },
     { name: t('MaSelection'), path: '/MaSelection' },
    { name: t('atelier_nav'), path: '/atelier' },
    { name: t('contact'), path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
  // py-1 rend la bande très fine lors du scroll
  isScrolled || isOpen ? 'bg-[#003366] py-1 shadow-xl' : 'bg-transparent py-3'
}`}>
  <div className="max-w-7xl mx-auto px-3 flex items-center justify-between">
    
    {/* LOGO - Ajustement de la taille du logo lors du scroll pour aider à la finesse */}
    <Link to="/" className="flex flex-col items-center z-[110] transition-all duration-500">
      <img 
        src={logoSC} 
        alt="Logo SOH & CHANTAL" 
        // On réduit h-36 à h-20 (ou moins) quand on scroll pour que la barre puisse rétrécir
        className={`${isScrolled ? 'h-20' : 'h-36'} w-auto object-contain transition-all duration-500 hover:scale-105`} 
      />
      
      {/* Cacher le sous-titre au scroll pour gagner encore plus de place (Optionnel) */}
      {!isScrolled && (
        <motion.span 
          initial={{ opacity: 1 }}
          animate={{ opacity: isScrolled ? 0 : 1 }}
          className="text-[8px] text-[#b8860b] uppercase tracking-[0.5em] font-bold mt-2"
        >
          Atelier de Haute Couture
        </motion.span>
      )}
    </Link>

        {/* MENU DESKTOP */}
        <div className={`hidden md:flex items-center gap-8 font-bold text-[11px] uppercase tracking-[0.25em] transition-colors ${
          isScrolled ? 'text-[#b8860b]' : 'text-[#b8860b]'
        }`}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                className="relative group py-2"
              >
                <span className={`${isActive ? 'text-[#b8860b]' : 'hover:text-[#b8860b]'} transition-colors`}>
                  {link.name}
                </span>
                
                {/* INDICATEUR DE PAGE ACTIVE (Ligne animée) */}
                {isActive ? (
                  <motion.div 
                    layoutId="underline" 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#b8860b]" 
                  />
                ) : (
                  <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#b8860b] group-hover:w-full transition-all duration-300" />
                )}
              </Link>
            );
          })}

          <div className="h-4 w-[1px] bg-white/20 mx-2"></div>

          <div className="flex items-center gap-5">
            <button onClick={toggleLanguage} className="flex items-center gap-1 hover:text-[#b8860b] transition-colors group">
              <Globe size={24} className="group-hover:rotate-12 transition-transform" />
              <span className="w-6 text-left">{i18n.language.substring(0, 2).toUpperCase()}</span>
            </button>

            <button onClick={toggleTheme} className="hover:text-[#b8860b] transition-transform hover:scale-110">
              {isDark ? <Sun size={26} /> : <Moon size={26} />}
            </button>
          </div>
        </div>

        {/* MOBILE BURGER */}
        <button 
          className="md:hidden text-white z-[110] p-2 hover:bg-white/10 rounded-full transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* MENU MOBILE (Framer Motion) */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 bg-[#003366]/50 flex flex-col items-center justify-center gap-10 md:hidden z-[105]"
            >
              {navLinks.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    key={link.path}
                  >
                    <Link 
                      to={link.path} 
                      className={`text-3xl font-serif italic flex flex-col items-center gap-2 ${
                        isActive ? 'text-[#b8860b]' : 'text-white'
                      }`} 
                      onClick={() => setIsOpen(false)}
                    >
                      {link.name}
                      {isActive && <div className="w-2 h-2 bg-[#b8860b] rounded-full" />}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex gap-10 mt-8 text-[#b8860b]"
              >
                <button onClick={toggleLanguage} className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] border border-[#b8860b] px-4 py-2 rounded-sm">
                  <Globe size={18} /> {i18n.language.substring(0, 2).toUpperCase()}
                </button>
                <button onClick={toggleTheme} className="p-2 border border-[#b8860b] rounded-sm">
                  {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}