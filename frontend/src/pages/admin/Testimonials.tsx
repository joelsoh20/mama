import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Trash2, MessageSquare } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  message: string;
  rating: number;
  isApproved: boolean;
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  // Vérifie bien que tu utilises 'adminToken' partout pour le stockage
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    } else {
      fetchTestimonials();
    }
  }, [token, navigate]);

  const fetchTestimonials = async () => {
    try {
      // Note : On récupère TOUS les témoignages (approuvés ou non) pour l'admin
      const res = await fetch('http://localhost:5000/api/testimonials', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setTestimonials(Array.isArray(data) ? data : []);
      setLoading(false);
    } catch (err) {
      console.error("Erreur chargement témoignages:", err);
      setLoading(false);
    }
  };

  const approve = async (id: number) => {
    try {
      // Correction de l'URL et de la méthode pour correspondre au backend (PATCH)
      await fetch(`http://localhost:5000/api/testimonials/approve/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTestimonials(); // Rafraîchir la liste
    } catch (err) {
      alert("Erreur lors de l'approbation");
    }
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm('Supprimer définitivement ce témoignage ?')) return;
    try {
      await fetch(`http://localhost:5000/api/testimonials/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchTestimonials();
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  if (loading) return <div className="p-20 text-center">Chargement des avis...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center gap-4 mb-10">
            <MessageSquare size={32} className="text-[#b8860b]" />
            <h1 className="text-4xl font-bold">Gestion des Témoignages</h1>
        </div>

        <div className="grid gap-6">
          {testimonials.length === 0 ? (
            <p className="text-gray-500 text-center py-10">Aucun témoignage reçu pour le moment.</p>
          ) : (
            testimonials.map(t => (
              <div key={t.id} className="bg-white dark:bg-neutral-900 p-6 rounded-3xl shadow-sm flex justify-between items-center border border-gray-100 dark:border-neutral-800">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex text-yellow-500">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < t.rating ? "opacity-100" : "opacity-20"}>★</span>
                      ))}
                    </div>
                    {t.isApproved ? (
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-bold uppercase">Public</span>
                    ) : (
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-bold uppercase">En attente</span>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 italic mb-2">"{t.message}"</p>
                  <p className="font-bold text-sm">— {t.name}</p>
                </div>

                <div className="flex gap-3 ml-6">
                  {!t.isApproved && (
                    <button
                      onClick={() => approve(t.id)}
                      className="p-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                      title="Approuver"
                    >
                      <Check size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteTestimonial(t.id)}
                    className="p-3 bg-red-100 text-red-600 rounded-2xl hover:bg-red-200 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}