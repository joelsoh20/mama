import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

import { FaFacebook } from "react-icons/fa6";


export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-neutral-950 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-10">
        {/* Colonne 1 - Logo & Description */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-accent-500 rounded-full flex items-center justify-center text-black font-bold text-2xl">
              C
            </div>
            <h2 className="text-3xl font-bold text-white">Couture d'Or</h2>
          </div>
          <p className="text-sm leading-relaxed max-w-xs">
            Atelier de couture haut de gamme à Douala. Créations uniques, sur mesure et intemporelles.
          </p>
        </div>

        {/* Colonne 2 - Liens rapides */}
        <div>
          <h3 className="text-white font-semibold mb-4">Navigation</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-accent-400 transition-colors">Accueil</a></li>
            <li><a href="/catalogue" className="hover:text-accent-400 transition-colors">Catalogue</a></li>
            <li><a href="/atelier" className="hover:text-accent-400 transition-colors">L'Atelier</a></li>
            <li><a href="/contact" className="hover:text-accent-400 transition-colors">Contact</a></li>
          </ul>
        </div>

        {/* Colonne 3 - Contact */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <Phone size={18} className="text-accent-400" />
              <span>+237 670 247 456</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={18} className="text-accent-400" />
              <span>makuneflore@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-accent-400" />
              <span>Douala, Cameroun</span>
            </div>
          </div>
        </div>

        {/* Colonne 4 - Réseaux sociaux */}
        <div>
          <h3 className="text-white font-semibold mb-4">Suivez-nous</h3>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent-400 transition-colors"><FaInstagram size={24} /></a>
            <a href="#" className="hover:text-accent-400 transition-colors"><FaFacebook size={24} /></a>
            <a href="#" className="hover:text-accent-400 transition-colors"><IoLogoYoutube size={24} /></a>
          </div>
        </div>
      </div>

      <div className="mt-16 border-t border-gray-800 pt-8 text-center text-xs text-gray-500">
        © 2026 Couture d'Or - Tous droits réservés | Mentions légales | Politique de confidentialité
      </div>
    </footer>
  );
}