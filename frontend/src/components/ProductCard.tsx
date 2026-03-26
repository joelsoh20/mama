import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import { type Product } from '../hooks/useSelection';

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const currentName = i18n.language === 'fr' ? product.name : product.nameEn;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all border border-gray-100 dark:border-neutral-800"
    >
      <div className="relative h-80 overflow-hidden">
        <img
          src={product.image}
          alt={currentName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 right-4 bg-white/90 dark:bg-black/70 px-3 py-1 rounded-full text-sm font-medium">
          {product.category}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">{currentName}</h3>
        <p className="text-2xl font-bold text-accent-500 mb-4">
          {product.price.toLocaleString()} FCFA
        </p>

        <button
          onClick={() => onAdd(product)}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95"
        >
          <Plus size={20} />
          Ajouter à ma sélection
        </button>
      </div>
    </motion.div>
  );
}