import Hero from '../components/Hero';
import Testimonials from '../components/Testimonials';
import Catalogue from '../pages/Catalogue'

export default function Home() {
  return (
    <>
      <Hero />
      
      {/* Dernières Créations */}
      <section className="py-20 bg-white dark:bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">Nos Dernières Créations</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">Fraîchement sorties de l’atelier</p>
          </div>
          
          {/* On réutilise le Catalogue mais limité à 4 produits */}
          <Catalogue />
        </div>
      </section>

      <Testimonials />
    </>
  );
}