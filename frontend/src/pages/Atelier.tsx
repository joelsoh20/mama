import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, Heart } from 'lucide-react';

const fondatrices = [
  {
    id: 1,
    name: "Marie-Claire Ngué",
    nameEn: "Marie-Claire Ngué",
    role: "Fondatrice & Créatrice principale",
    roleEn: "Founder & Lead Designer",
    image: "https://picsum.photos/id/64/600/600",
    bio: "Avec plus de 15 ans d'expérience, Marie-Claire transforme chaque tissu en œuvre d'art. Passionnée par le wax et les coupes modernes.",
    bioEn: "With over 15 years of experience, Marie-Claire turns every fabric into a work of art. Passionate about wax and modern cuts."
  },
  {
    id: 2,
    name: "Aïcha Doumbia",
    nameEn: "Aïcha Doumbia",
    role: "Co-fondatrice & Responsable atelier",
    roleEn: "Co-founder & Workshop Manager",
    image: "https://picsum.photos/id/65/600/600",
    bio: "Experte en gestion d'équipe et en finitions haut de gamme. Elle veille à la qualité de chaque pièce.",
    bioEn: "Expert in team management and high-end finishes. She ensures the quality of every piece."
  }
];

const employees = [
  { id: 1, name: "Fatou Bah", role: "Couturière senior", image: "https://picsum.photos/id/66/400/400" },
  { id: 2, name: "Sophie Mbarga", role: "Spécialiste broderie", image: "https://picsum.photos/id/67/400/400" },
  { id: 3, name: "Josiane Etoa", role: "Assistante créatrice", image: "https://picsum.photos/id/68/400/400" },
  { id: 4, name: "Léa Kemayou", role: "Couturière", image: "https://picsum.photos/id/69/400/400" },
];

export default function Atelier() {
  const { t, i18n } = useTranslation();

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* Hero Atelier */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20"
      >
        <h1 className="text-6xl font-bold mb-6">L’Atelier Couture d’Or</h1>
        <p className="text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Un espace où la passion rencontre le savoir-faire traditionnel et moderne.
        </p>
      </motion.div>

      {/* Section Fondatrices */}
      <section className="mb-24">
        <div className="flex items-center gap-3 mb-12">
          <Heart className="text-accent-500" size={32} />
          <h2 className="text-4xl font-bold">Nos Fondatrices</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {fondatrices.map((founder, index) => (
            <motion.div
              key={founder.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-xl"
            >
              <img 
                src={founder.image} 
                alt={founder.name}
                className="w-full h-96 object-cover"
              />
              <div className="p-8">
                <h3 className="text-3xl font-semibold mb-2">{founder.name}</h3>
                <p className="text-accent-500 font-medium mb-6">
                  {i18n.language === 'fr' ? founder.role : founder.roleEn}
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {i18n.language === 'fr' ? founder.bio : founder.bioEn}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Section Équipe */}
      <section>
        <div className="flex items-center gap-3 mb-12">
          <Users className="text-accent-500" size={32} />
          <h2 className="text-4xl font-bold">Notre Équipe</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {employees.map((emp, index) => (
            <motion.div
              key={emp.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group text-center"
            >
              <div className="relative mb-6 mx-auto w-48 h-48 overflow-hidden rounded-2xl">
                <img 
                  src={emp.image} 
                  alt={emp.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <h4 className="font-semibold text-xl mb-1">{emp.name}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">{emp.role}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}