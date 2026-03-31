import React, { useState } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Robes', // Valeur par défaut
    description: '',
    price: ''
  });
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const categories = ['Robes', 'Ensembles', 'Mariage', 'Accessoires', 'Sur Mesure'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('description', formData.description);
    data.append('price', formData.price);
    if (image) data.append('image', image);

    try {
      const token = localStorage.getItem('token'); // On récupère ton JWT
      await axios.post('http://localhost:5000/api/products/add', data, {
        headers: { 
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}` 
        }
      });
      alert("✨ Modèle ajouté au catalogue avec succès !");
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      alert("Erreur lors de l'envoi du modèle.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-[#003366]">Ajouter une Création</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nom du modèle</label>
          <input type="text" required className="w-full border p-2 rounded" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} />
        </div>

        <div>
          <label className="block text-sm font-medium">Catégorie (Modèle)</label>
          <select className="w-full border p-2 rounded"
            onChange={(e) => setFormData({...formData, category: e.target.value})}>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Image de la création</label>
          <input type="file" accept="image/*" required className="w-full"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)} />
        </div>

        <button type="submit" disabled={loading}
          className="w-full bg-[#003366] text-white py-3 rounded-lg hover:bg-[#b8860b] transition shadow-md">
          {loading ? 'Envoi en cours...' : 'Publier dans le Catalogue'}
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;