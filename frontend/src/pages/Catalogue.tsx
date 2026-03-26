import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/ProductCard';
// On importe le type Product directement depuis le hook pour la cohérence
import { useSelection, type Product } from '../hooks/useSelection';

// J'ai ajouté un type local pour ce que l'API renvoie (car l'API a 'images' au pluriel)
interface APIProduct extends Omit<Product, 'image'> {
  images: string[];
}

export default function Catalogue() {
  // Si tu n'utilises pas t et i18n dans ce fichier, commente cette ligne 
  // ou utilise-les pour le titre par exemple : {t('catalogue.title')}
  const { i18n } = useTranslation(); 
  const { addToSelection } = useSelection();
  
  const [products, setProducts] = useState<APIProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Tous');

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur API:", err);
        setLoading(false);
      });
  }, []);

  const categories = ['Tous', 'Robe', 'Chemise', 'Ensemble', 'Pantalon'];

  const filteredProducts = filter === 'Tous' 
    ? products 
    : products.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden animate-pulse">
              <div className="h-80 bg-gray-200 dark:bg-neutral-700" />
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-3/4" />
                <div className="h-8 bg-gray-200 dark:bg-neutral-700 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <h1 className="text-5xl font-bold text-center mb-6">Notre Catalogue</h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
        Découvrez nos créations uniques, toutes réalisées avec passion dans notre atelier à Douala.
      </p>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 justify-center mb-12">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-8 py-3 rounded-full font-medium transition-all ${
              filter === cat 
                ? 'bg-black text-white dark:bg-white dark:text-black shadow-lg' 
                : 'bg-gray-100 dark:bg-neutral-800 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={{
              ...product,
              image: product.images[0] || 'https://via.placeholder.com/600x800',
            }} 
            onAdd={addToSelection}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
           <p className="text-2xl text-gray-500">Aucun modèle dans cette catégorie pour le moment.</p>
        </div>
      )}
    </div>
  );
}