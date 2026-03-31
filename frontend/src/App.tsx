import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n/i18n';
import { HelmetProvider } from 'react-helmet-async';

// Import des composants globaux
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import CookieBanner from './components/CookieBanner';
import Specialties from './components/Specialties';
import { FAQ } from './components/FAQ';

// Import des pages publiques
import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import MaSelection from './pages/MaSelection';
import Atelier from './pages/Atelier'; // Décommente quand le fichier est prêt
import Contact from './pages/Contact';
import Informations from './pages/Informations';

// Import des pages admin
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminTestimonials from './pages/admin/Testimonials';
import AddProductForm from './pages/admin/AddProductForm';
import Settings from './pages/admin/Settings';

function App() {
  return (
    <HelmetProvider>     
    <Router>
      <div className="min-h-screen flex flex-col bg-[#faf9f6] dark:bg-neutral-900">
        
        {/* LA NAVBAR : Placée ici, elle est fixe et visible sur tout le site */}
        <Navbar />
        
        {/* Le contenu principal du site */}
        <main className="flex-grow">
          <Routes>
            {/* Routes Publiques */}
            <Route path="/" element={<Home />} />
            <Route path="/catalogue" element={<Catalogue />} />
            <Route path="/MaSelection" element={<MaSelection />} />
            <Route path="/atelier" element={<Atelier />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/informations" element={<Informations />} />
            
            {/* Routes de composants spécifiques (si besoin d'un accès direct) */}
            <Route path="/specialties" element={<Specialties />} />
            <Route path="/faq" element={<FAQ />} />
            
            {/* Routes Administration */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<AdminProducts />} />
            <Route path="/admin/testimonials" element={<AdminTestimonials />} />
            <Route path="/admin/add-product" element={<AddProductForm />} />
            <Route path="/admin/settings" element={<Settings />} />
          </Routes>
        </main>

        {/* Composants de bas de page et utilitaires */}
        <Footer />
        <WhatsAppButton />
        <CookieBanner /> 
      </div>
    </Router>
    </HelmetProvider>
  );
}

export default App;