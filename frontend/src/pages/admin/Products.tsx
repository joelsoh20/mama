import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';

const Product = () => {
  const [formData, setFormData] = useState({
    category: 'Boubou', 
    description: '',
    descriptionEn: ''
    // Le champ price a été retiré ici
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Boubou', 
    'Pantalon', 
    'Robe de soirée', 
    'Gandoura', 
    'Kaba', 
    'Ensemble Pagne', 
    'Enfants', 
    'Mariage', 
    'Sur Mesure', 
    'Accessoires'
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error("Erreur chargement catalogue");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFiles.length === 0) return alert("Veuillez sélectionner au moins une photo.");

    setLoading(true);
    const data = new FormData();
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('descriptionEn', formData.descriptionEn);
    // On n'envoie plus le prix au backend
    selectedFiles.forEach(file => data.append('images', file));

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post('http://localhost:5000/api/products', data, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' 
        }
      });
      alert("✨ Catalogue SOH & CHANTAL mis à jour !");
      setFormData({ category: 'Boubou', description: '', descriptionEn: '' });
      setSelectedFiles([]);
      fetchProducts();
    } catch (err: any) {
      alert("Erreur lors de l'envoi.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Voulez-vous vraiment supprimer cet article ?")) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("Produit retiré.");
      fetchProducts();
    } catch (err) {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 pt-30 space-y-12">
      {/* SECTION 1 : FORMULAIRE D'AJOUT */}
      <div className="max-w-xl mx-auto p-8 bg-white shadow-2xl rounded-2xl border-b-8 border-[#b8860b]">
        <h2 className="text-2xl font-bold text-[#003366] text-center mb-6 uppercase">Nouvelle Création</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <label className="block text-xs font-bold text-[#003366] uppercase mb-[-15px] ml-2">Catégorie</label>
          <select 
            className="w-full p-3 border-2 border-gray-100 bg-gray-50 rounded-xl"
            value={formData.category}
            onChange={(e) => setFormData({...formData, category: e.target.value})}
          >
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          {/* Le champ "Prix de vente" a été supprimé ici */}

          <label className="block text-xs font-bold text-[#003366] uppercase mb-[-15px] ml-2">Description (Français)</label>
          <textarea 
            placeholder="Description en français..." 
            className="w-full p-3 border-2 border-gray-100 bg-gray-50 rounded-xl h-20"
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
          />

          <label className="block text-xs font-bold text-[#b8860b] uppercase mb-[-15px] ml-2">Description (English)</label>
          <textarea 
            placeholder="English description..." 
            className="w-full p-3 border-2 border-gray-100 bg-gray-50 rounded-xl h-20"
            value={formData.descriptionEn}
            onChange={(e) => setFormData({...formData, descriptionEn: e.target.value})}
          />

          <div className="relative border-2 border-dashed border-[#003366] p-6 rounded-xl bg-blue-50 text-center">
            <label className="cursor-pointer">
              <span className="text-[#003366] font-bold block">📸 Ajouter des photos</span>
              <input type="file" multiple accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
            {selectedFiles.length > 0 && <div className="text-green-600 mt-2">{selectedFiles.length} photo(s) prête(s)</div>}
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 rounded-xl text-white font-bold bg-[#003366] hover:bg-[#b8860b] transition-all"
          >
            {loading ? "Chargement..." : "PUBLIER MAINTENANT"}
          </button>
        </form>
      </div>

      {/* SECTION 2 : GESTION DU CATALOGUE */}
      <div className="bg-gray-50 p-8 rounded-2xl shadow-inner">
        <h2 className="text-xl font-bold text-gray-700 mb-6 underline">Gérer mon catalogue actuel</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="relative bg-white p-2 rounded-xl shadow-md group">
              <img 
                src={product.images && product.images[0]} 
                alt={product.description} 
                className="w-full h-40 object-cover rounded-lg" 
              />
              <div className="mt-2 text-[10px] font-bold text-[#b8860b] uppercase">{product.category}</div>
              <div className="text-xs text-gray-800 truncate">{product.description}</div>
              
              <button 
                onClick={() => handleDelete(product.id)}
                className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                title="Supprimer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;