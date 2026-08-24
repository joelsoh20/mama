import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Images } from 'lucide-react';
import { ENDPOINTS } from '../../lib/endpoints';

interface ClientPhoto {
  id: number;
  imageUrl: string;
  caption: string | null;
}

export default function AdminClientPhotos() {
  const [photos, setPhotos] = useState<ClientPhoto[]>([]);
  const [caption, setCaption] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    try {
      const res = await axios.get(ENDPOINTS.clientPhotos.list);
      setPhotos(Array.isArray(res.data) ? res.data : []);
    } catch {
      console.error("Erreur chargement des photos clientes");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files ? e.target.files[0] : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return alert("Veuillez sélectionner une photo.");

    setLoading(true);
    const data = new FormData();
    data.append('image', selectedFile);
    data.append('caption', caption);

    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(ENDPOINTS.clientPhotos.list, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      setCaption('');
      setSelectedFile(null);
      fetchPhotos();
    } catch {
      alert("Erreur lors de l'envoi de la photo.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Supprimer définitivement cette photo ?")) return;

    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(ENDPOINTS.clientPhotos.byId(id), {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPhotos();
    } catch {
      alert("Erreur lors de la suppression.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
          <Images size={32} className="text-[#b8860b]" />
          <h1 className="text-4xl font-bold text-[#003366] dark:text-white">Clients Satisfaits</h1>
        </div>

        {/* FORMULAIRE D'AJOUT */}
        <div className="max-w-xl mb-12 p-8 bg-white dark:bg-neutral-900 shadow-2xl rounded-2xl border-b-8 border-[#b8860b]">
          <h2 className="text-xl font-bold text-[#003366] dark:text-white uppercase mb-6">Ajouter une photo</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block text-xs font-bold text-[#003366] dark:text-white uppercase mb-[-15px] ml-2">Légende (optionnelle)</label>
            <input
              type="text"
              placeholder="Ex: Robe de mariage sur mesure"
              className="w-full p-3 border-2 border-gray-100 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 dark:text-white rounded-xl"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />

            <div className="relative border-2 border-dashed border-[#003366] dark:border-neutral-600 p-6 rounded-xl bg-blue-50 dark:bg-neutral-800 text-center">
              <label className="cursor-pointer">
                <span className="text-[#003366] dark:text-white font-bold block">📸 Choisir une photo</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
              {selectedFile && <div className="text-green-600 dark:text-green-400 mt-2">{selectedFile.name}</div>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-white font-bold bg-[#003366] hover:bg-[#b8860b] transition-all"
            >
              {loading ? "Envoi..." : "AJOUTER LA PHOTO"}
            </button>
          </form>
        </div>

        {/* GRILLE DES PHOTOS */}
        <div className="grid gap-6">
          {photos.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-10">Aucune photo pour le moment.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {photos.map((photo) => (
                <div key={photo.id} className="relative bg-white dark:bg-neutral-900 p-2 rounded-xl shadow-md group">
                  <img
                    src={photo.imageUrl}
                    alt={photo.caption || 'Photo cliente'}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  {photo.caption && (
                    <div className="mt-2 text-xs text-gray-800 dark:text-gray-300 truncate">{photo.caption}</div>
                  )}
                  <button
                    onClick={() => handleDelete(photo.id)}
                    className="absolute top-3 right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-700 transition-colors shadow-lg"
                    title="Supprimer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
