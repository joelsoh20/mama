import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Trash2 } from 'lucide-react';

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
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    if (!token) navigate('/admin/login');
    fetchTestimonials();
  }, [token]);

  const fetchTestimonials = async () => {
    const res = await fetch('http://localhost:5000/api/testimonials', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setTestimonials(data);
    setLoading(false);
  };

  const approve = async (id: number) => {
    await fetch(`http://localhost:5000/api/testimonials/${id}/approve`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTestimonials();
  };

  const deleteTestimonial = async (id: number) => {
    if (!confirm('Supprimer ce témoignage ?')) return;
    await fetch(`http://localhost:5000/api/testimonials/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchTestimonials();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Gestion des Témoignages</h1>

        <div className="space-y-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white dark:bg-neutral-900 p-8 rounded-3xl flex justify-between items-start">
              <div>
                <div className="flex gap-2 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
                </div>
                <p className="text-lg italic">"{t.message}"</p>
                <p className="font-semibold mt-4">— {t.name}</p>
              </div>

              <div className="flex gap-4">
                {!t.isApproved && (
                  <button
                    onClick={() => approve(t.id)}
                    className="px-6 py-3 bg-green-100 text-green-700 rounded-2xl flex items-center gap-2 hover:bg-green-200"
                  >
                    <Check size={20} /> Approuver
                  </button>
                )}
                <button
                  onClick={() => deleteTestimonial(t.id)}
                  className="px-6 py-3 bg-red-100 text-red-700 rounded-2xl flex items-center gap-2 hover:bg-red-200"
                >
                  <Trash2 size={20} /> Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}