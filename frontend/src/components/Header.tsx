import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, Globe, MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // Effet au scroll pour rendre le header transparent puis opaque
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/catalogue', label: t('catalogue') },
    { to: '/ma-selection', label: t('selection') },
    { to: '/atelier', label: t('atelier') },
    { to: '/contact', label: t('contact') },
  ];

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/90 dark:bg-neutral-750/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo avec style Couture */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-yellow-500 rounded-sm flex items-center justify-center text-neutral-900 font-serif font-bold text-2xl transition-transform group-hover:rotate-12">
            S
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-serif font-bold tracking-[0.2em] text-neutral-900 dark:text-white uppercase">
              Soh & Chantal
            </h1>
            <span className="text-[10px] text-yellow-600 dark:text-yellow-500 font-bold tracking-widest uppercase italic">Atelier de Haute Couture</span>
          </div>
        </Link>

        {/* Navigation Desktop - Animation soulignement */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`relative py-2 text-sm font-bold uppercase tracking-widest transition-colors hover:text-yellow-500 group ${
                location.pathname === link.to ? 'text-yellow-500' : 'text-neutral-700 dark:text-neutral-300'
              }`}
            >
              {link.label}
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transition-transform duration-300 origin-left ${
                location.pathname === link.to ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              }`} />
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} className="p-2 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors">
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button onClick={() => i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')} className="hidden sm:flex items-center gap-1 p-2 text-sm font-bold text-neutral-700 dark:text-neutral-300 uppercase">
            <Globe size={16} /> {i18n.language}
          </button>

          <a href="https://wa.me/237670247456" target="_blank" className="hidden md:flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-neutral-900 px-6 py-2.5 rounded-sm font-bold text-xs uppercase tracking-tighter transition-all hover:scale-105 active:scale-95">
            <MessageCircle size={16} /> RDV WhatsApp
          </a>

          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-neutral-900 dark:text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </header>
  );
}