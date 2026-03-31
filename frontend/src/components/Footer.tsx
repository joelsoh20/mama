import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Lock } from 'lucide-react';
import { FaInstagram, FaFacebook, FaYoutube } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-white dark:bg-neutral-900 text-gray-600 dark:text-gray-400 pt-20 pb-8 border-t border-gray-100 dark:border-neutral-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
        
        {/* Colonne 1 - Logo */}
        <div className="space-y-6 lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-[#003366] rounded-full flex items-center justify-center text-white font-serif font-bold text-2xl shadow-lg group-hover:bg-[#004080] transition-colors">S</div>
            <div>
              <h2 className="text-2xl font-serif font-extrabold tracking-tight">
                <span className="text-[#003366] dark:text-white">SOH</span> 
                <span className="text-yellow-500 mx-1">&</span> 
                <span className="text-[#003366] dark:text-white">CHANTAL</span>
              </h2>
              <p className="text-[10px] text-gray-400 tracking-[0.4em] uppercase font-bold">Atelier de Création</p>
            </div>
          </Link>
          <p className="text-sm leading-relaxed italic">
            L'élégance sur-mesure à Douala. L'union parfaite entre tradition et modernité.
          </p>
        </div>

        {/* Colonne 2 - Navigation */}
        <div>
          <h3 className="text-[#003366] dark:text-yellow-600 font-bold uppercase tracking-widest text-xs mb-6">Navigation</h3>
          <ul className="space-y-3 text-sm font-medium">
            {['Accueil', 'Catalogue', 'Atelier', 'Contact'].map((item) => (
              <li key={item}>
                <Link to={item === 'Accueil' ? '/' : `/${item.toLowerCase()}`} className="hover:text-yellow-600 transition-colors flex items-center gap-2 group">
                  <span className="w-0 h-[1.5px] bg-yellow-500 transition-all group-hover:w-3"></span>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* NOUVELLE Colonne 3 - Informations */}
        <div>
          <h3 className="text-[#003366] dark:text-yellow-600 font-bold uppercase tracking-widest text-xs mb-6">Informations</h3>
          <ul className="space-y-3 text-sm font-medium">
            <li><Link to="/informations#blog" className="hover:text-yellow-600 transition-colors">Blog</Link></li>
            <li><Link to="/informations#privacy" className="hover:text-yellow-600 transition-colors">Confidentialité</Link></li>
            <li><Link to="/informations#terms" className="hover:text-yellow-600 transition-colors">Conditions</Link></li>
            <li><Link to="/informations#sitemap" className="hover:text-yellow-600 transition-colors">Plan du site</Link></li>
          </ul>
        </div>

        {/* Colonne 4 - Contact */}
        <div>
          <h3 className="text-[#003366] font-bold uppercase tracking-widest text-xs mb-6">Contact</h3>
          <div className="space-y-4 text-sm">
            <a href="tel:+237670247456" className="flex items-center gap-3 hover:translate-x-1 transition-transform">
              <Phone size={18} className="text-blue-600" />
              <span className="hover:text-[#003366]">+237 670 247 456</span>
            </a>
            <a href="tel:+237670247456" className="flex items-center gap-3 hover:translate-x-1 transition-transform">
              <Phone size={18} className="text-blue-600" />
              <span className="hover:text-[#003366]"> +237 652 048 331</span>
            </a>
            <a href="mailto:sohflore44@gmail.com" className="flex items-center gap-3 hover:translate-x-1 transition-transform">
              <Mail size={18} className="text-red-500" />
              <span className="hover:text-[#003366]">sohflore44@gmail.com</span> 
            </a>
            <a href="mailto:makuneflore@gmail.com" className="flex items-center gap-3 hover:translate-x-1 transition-transform">
              <Mail size={18} className="text-red-500" />
              <span className="hover:text-[#003366]">chantwanstyle@gmail.com</span> 
            </a>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-green-600" />
              <span>Shell Village,Douala, Cameroun</span>
            </div>
          </div>
        </div>

        {/* Colonne 5 - Social */}
        <div>
          <h3 className="text-[#003366] font-bold uppercase tracking-widest text-xs mb-6">Suivez-nous</h3>
          <div className="flex gap-4">
            <motion.a href="https://www.instagram.com" whileHover={{ scale: 1.1 }} className="text-[#E1306C] bg-pink-50 p-2 rounded-lg"><FaInstagram size={22} /></motion.a>
            <motion.a href="https://www.facebook.com/jeaninecouture" whileHover={{ scale: 1.1 }} className="text-[#1877F2] bg-blue-50 p-2 rounded-lg"><FaFacebook size={22} /></motion.a>
            <motion.a href="https://www.youtube.com" whileHover={{ scale: 1.1 }} className="text-[#FF0000] bg-red-50 p-2 rounded-lg"><FaYoutube size={22} /></motion.a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-gray-50 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold tracking-widest text-gray-400">
        <p>© 2026 SOH & CHANTAL — TOUS DROITS RÉSERVÉS</p>
        <Link to="/admin/login" className="flex items-center gap-1 hover:text-[#003366] transition-colors mt-4 md:mt-0">
          <Lock size={10} /> ACCÈS PRIVÉ
        </Link>
      </div>
    </footer>
  );
}