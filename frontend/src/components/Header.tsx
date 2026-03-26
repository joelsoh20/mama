import { useEffect, useState } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../hooks/useTheme';
import { Link, useLocation } from 'react-router-dom'; // on ajoutera react-router plus tard

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const changeLanguage = () => {
    const newLang = i18n.language === 'fr' ? 'en' : 'fr';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { to: '/', label: t('home') },
    { to: '/catalogue', label: t('catalogue') },
    { to: '/ma-selection', label: t('selection') },
    { to: '/atelier', label: t('atelier') },
    { to: '/contact', label: t('contact') },
  ];

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
  const token = localStorage.getItem('adminToken');
  setIsAdmin(!!token);
}, []);


  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-neutral-950 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
            C
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-primary-700 dark:text-white">
              SOH & CHANTAL
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400 -mt-1">Atelier de Création</p>
          </div>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`font-medium transition-colors hover:text-accent-500 ${location.pathname === link.to ? 'text-accent-500' : 'text-gray-700 dark:text-gray-300'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
            title={theme === 'light' ? t('darkMode') : t('lightMode')}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <button
            onClick={changeLanguage}
            className="flex items-center gap-1 px-3 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors text-sm font-medium"
          >
            <Globe size={18} />
            {i18n.language.toUpperCase()}
          </button>

          {/* Bouton WhatsApp */}
          <a
            href="https://wa.me/237670247456" // Remplace par ton numéro
            target="_blank"
            className="hidden md:flex items-center gap-2 bg-accent-500 hover:bg-accent-600 text-black font-semibold px-5 py-2.5 rounded-full transition-all active:scale-95"
          >
            WhatsApp
          </a>

{isAdmin && (
  <a
    href="/admin/dashboard"
    className="px-5 py-2.5 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-all text-sm font-medium"
  >
    Admin
  </a>
)}

          {/* Menu Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden border-t dark:border-gray-800 bg-white dark:bg-neutral-950">
          <nav className="flex flex-col px-6 py-6 gap-4 text-lg">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="py-2 hover:text-accent-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <a href="https://wa.me/237670247456" className="mt-4 bg-accent-500 text-black font-semibold py-3 rounded-full text-center">
              Contacter sur WhatsApp
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}