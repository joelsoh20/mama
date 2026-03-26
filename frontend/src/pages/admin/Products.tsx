import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit2, Trash2, X, Image as ImageIcon } from 'lucide-react';

interface Product {
  id?: number;
  name: string;
  nameEn: string;
  description?: string;
  descriptionEn?: string;
  price: number;
  category: string;
  images: string[];
  isActive: boolean;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<Product>({
    name: '', nameEn: '', description: '', descriptionEn: '', price: 0, category: '', images: [], isActive: true
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) navigate('/admin/login');
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    const res = await fetch('http://localhost:5000/api/products');
    const data = await res.json();
    setProducts(data);
    setLoading(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const resetForm = () => {
    setFormData({ name: '', nameEn: '', description: '', descriptionEn: '', price: 0, category: '', images: [], isActive: true });
    setSelectedFiles([]);
    setPreviewUrls([]);
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editingProduct 
      ? `http://localhost:5000/api/products/${editingProduct.id}`
      : 'http://localhost:5000/api/products';

    const method = editingProduct ? 'PUT' : 'POST';

    const form = new FormData();
    form.append('name', formData.name);
    form.append('nameEn', formData.nameEn);
    form.append('description', formData.description || '');
    form.append('descriptionEn', formData.descriptionEn || '');
    form.append('price', formData.price.toString());
    form.append('category', formData.category);

    selectedFiles.forEach(file => form.append('images', file));

    try {
      await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      });

      resetForm();
      fetchProducts();
    } catch (err) {
      alert('Erreur lors de la sauvegarde');
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('Supprimer définitivement ce modèle ?')) return;
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      nameEn: product.nameEn,
      description: product.description || '',
      descriptionEn: product.descriptionEn || '',
      price: product.price,
      category: product.category,
      images: product.images,
      isActive: product.isActive,
    });
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between mb-10">
          <h1 className="text-4xl font-bold">Gestion du Catalogue</h1>
          <button onClick={() => setShowForm(true)} className="flex items-center gap-3 bg-accent-500 hover:bg-accent-600 text-black px-8 py-4 rounded-2xl font-semibold">
            <Plus size={24} /> Nouveau Modèle
          </button>
        </div>

        {/* Liste des produits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(p => (
            <div key={p.id} className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-lg">
              <div className="h-64 relative">
                {p.images.length > 0 ? (
                  <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-neutral-800">
                    <ImageIcon size={80} className="text-gray-300" />
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{p.name}</h3>
                <p className="text-accent-500 text-2xl font-bold">{p.price.toLocaleString()} FCFA</p>
                <p className="text-sm text-gray-500 mt-1">{p.category}</p>

                <div className="flex gap-3 mt-6">
                  <button onClick={() => startEdit(p)} className="flex-1 py-3 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-200">
                    <Edit2 size={18} /> Modifier
                  </button>
                  <button onClick={() => deleteProduct(p.id!)} className="flex-1 py-3 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center gap-2 hover:bg-red-200">
                    <Trash2 size={18} /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Formulaire */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-auto">
            <div className="p-8">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold">{editingProduct ? 'Modifier le modèle' : 'Nouveau modèle'}</h2>
                <button onClick={resetForm} className="text-gray-400 hover:text-red-500"><X size={28} /></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Nom (Français)</label>
                    <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-5 py-3 rounded-2xl border" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Name (English)</label>
                    <input type="text" value={formData.nameEn} onChange={e => setFormData({...formData, nameEn: e.target.value})} className="w-full px-5 py-3 rounded-2xl border" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Prix (FCFA)</label>
                    <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: parseFloat(e.target.value)})} className="w-full px-5 py-3 rounded-2xl border" required />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Catégorie</label>
                    <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full px-5 py-3 rounded-2xl border" required>
                      <option value="">Choisir...</option>
                      <option value="Robe">Robe</option>
                      <option value="Chemise">Chemise</option>
                      <option value="Ensemble">Ensemble</option>
                      <option value="Pantalon">Pantalon</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Images (max 5)</label>
                  <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full" />
                  
                  {previewUrls.length > 0 && (
                    <div className="flex gap-3 mt-4 flex-wrap">
                      {previewUrls.map((url, i) => (
                        <img key={i} src={url} alt="preview" className="w-24 h-24 object-cover rounded-xl" />
                      ))}
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full bg-accent-500 hover:bg-accent-600 text-black py-4 rounded-2xl font-semibold text-lg">
                  {editingProduct ? 'Enregistrer les modifications' : 'Ajouter au catalogue'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}