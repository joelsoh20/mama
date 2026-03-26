import './index.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n/i18n';

import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';

import Home from './pages/Home';
import Catalogue from './pages/Catalogue';
import MaSelection from './pages/MaSelection';
import Atelier from './pages/Atelier';
import Contact from './pages/Contact';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/Products';
import AdminTestimonials from './pages/admin/Testimonials'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-neutral-950">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/ma-selection" element={<MaSelection />} />
          <Route path="/atelier" element={<Atelier />} />
          <Route path="/contact" element={<Contact />} />
          {/* Routes Admin */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
        </Routes>

        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;