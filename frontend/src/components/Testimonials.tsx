import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  avatar?: string;
  message: string;
  rating: number;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/testimonials/approved')
      .then(res => res.json())
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-20 text-center">Chargement des témoignages...</div>;

  return (
    <section className="py-20 bg-gray-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Ce que disent nos clientes</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">Des créations qui touchent le cœur</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-neutral-800 p-8 rounded-3xl shadow-lg"
            >
              <div className="flex gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="text-accent-500 fill-current" size={22} />
                ))}
              </div>

              <p className="text-lg leading-relaxed italic mb-8">"{t.message}"</p>

              <div className="flex items-center gap-4">
                {t.avatar ? (
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                ) : (
                  <div className="w-12 h-12 bg-accent-200 dark:bg-accent-800 rounded-full flex items-center justify-center text-2xl">
                    👩‍🎤
                  </div>
                )}
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-sm text-gray-500">Cliente satisfaite</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}