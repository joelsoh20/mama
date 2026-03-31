import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelection, type Product } from '../hooks/useSelection';
import { Heart, CheckCircle, Filter, ShoppingBag } from 'lucide-react'; 
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion'; 
import { Helmet } from 'react-helmet-async';

const Catalogue = () => {
  const [dbProducts, setDbProducts] = useState<any[]>([]);
  const [filter, setFilter] = useState('Tous');
  const { addToSelection, removeFromSelection, selection } = useSelection();
  const { t, i18n } = useTranslation();

  const currentLang = i18n.language.includes('en') ? 'en' : 'fr';

  const categories = [
    { id: 'Tous', label: t('cat_all') },
    { id: 'Boubou', label: t('cat_boubou') },
    { id: 'Pantalon', label: t('cat_pantalon') },
    { id: 'Robe de soirée', label: t('cat_robe_soiree') },
    { id: 'Gandoura', label: t('cat_gandoura') },
    { id: 'Kaba', label: t('cat_kaba') },
    { id: 'Ensemble Pagne', label: t('cat_ensemble_pagne') },
    { id: 'Enfants', label: t('cat_enfants') },
    { id: 'Mariage', label: t('cat_wedding_filter') || 'Mariage' },
    { id: 'Sur Mesure', label: t('cat_custom_filter') || 'Sur Mesure' }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setDbProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Erreur de chargement du catalogue");
      }
    };
    fetchProducts();
  }, []);

  const handleToggleSelection = (item: any) => {
    if (!item) return;
    const isSelected = selection.some(s => s.id === item.id);

    if (isSelected) {
      removeFromSelection(item.id);
    } else {
      const productForSelection: Product = {
        id: item.id,
        name: item.description || "Modèle SOH & CHANTAL",
        image: item.images?.[0] || item.image || 'https://via.placeholder.com/400',
        price: Number(item.price) || 0,
        category: item.category || "Général",
      };
      addToSelection(productForSelection);
    }
  };

  const filteredProducts = filter === 'Tous' 
    ? dbProducts 
    : dbProducts.filter(p => p.category === filter);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <Helmet>
        <title>{filter === 'Tous' ? 'Catalogue Officiel' : filter} | SOH & CHANTAL Mode Haute Couture Douala</title>
        <meta name="description" content="Découvrez l'excellence du sur-mesure chez SOH & CHANTAL. Parcourez notre catalogue de Boubous, Robes de soirée et créations uniques à Douala." />
        <meta property="og:title" content={`${filter} - Atelier SOH & CHANTAL`} />
        <meta property="og:description" content="Explorez nos dernières créations et sélectionnez vos modèles préférés." />
      </Helmet>

      {/* Barre de Filtres */}
      <div className="flex flex-wrap items-center justify-center pt-26 gap-3 mb-16">
        <div className="flex items-center text-[#b8860b] mr-4 border-r border-gray-200 pr-4">
          <Filter size={18} className="mr-2" />
          <span className="text-[10px] font-black uppercase tracking-tighter">Filtres</span>
        </div>
        
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setFilter(cat.id)}
            className={`px-5 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
              filter === cat.id 
              ? 'bg-[#003366] text-white shadow-md scale-105' 
              : 'bg-white text-[#003366] border border-gray-100 hover:border-[#b8860b]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grille */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.map((product) => {
          if (!product) return null;
          const isSelected = selection.some(s => s.id === product.id);
          const description = currentLang === 'en' && product.descriptionEn 
            ? product.descriptionEn 
            : (product.description || t('no_name'));

          return (
            <motion.div 
              layout
              key={product.id} 
              className="group flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-neutral-100 shadow-sm">
                <img 
                  src={product.images?.[0] || 'https://via.placeholder.com/400'} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  alt={description}
                />
                
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                <button 
                  onClick={() => handleToggleSelection(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 backdrop-blur-md ${
                    isSelected ? 'bg-red-500 text-white scale-110' : 'bg-white/90 text-gray-400 hover:text-red-500'
                  }`}
                >
                  <Heart size={18} fill={isSelected ? "currentColor" : "none"} />
                </button>
              </div>

              <div className="mt-6 flex flex-col flex-grow">
                <p className="text-[#b8860b] text-[9px] uppercase tracking-[0.25em] font-black mb-1">
                  {product.category}
                </p>

                <h3 className="text-sm font-serif text-[#003366] uppercase tracking-wider mb-4 line-clamp-2 italic">
                  {description}
                </h3>
                
                <div className="mt-auto flex justify-end items-center pt-4 border-t border-gray-100">
                  <button 
                    onClick={() => handleToggleSelection(product)}
                    className={`flex items-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-sm ${
                      isSelected 
                      ? 'bg-green-50 text-green-600' 
                      : 'bg-[#003366]/5 text-[#003366] hover:bg-[#b8860b] hover:text-white'
                    }`}
                  >
                    {isSelected ? <CheckCircle size={14} /> : <ShoppingBag size={14} />}
                    {isSelected ? t('selected') : t('select')}
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default Catalogue;