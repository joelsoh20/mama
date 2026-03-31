import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  // --- LOGIQUE WHATSAPP ---
  const handleWhatsApp = () => {
    if (!formData.name || !formData.message) {
      return toast.warn("Veuillez entrer votre nom et un message.");
    }
    const message = `Bonjour SOH & CHANTAL,\n\nNom: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/237670247456?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  // --- LOGIQUE EMAIL (BACKEND) ---
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      toast.success("✨ Message envoyé avec succès !");
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error("Désolé, une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-46 py-20">
      <ToastContainer position="bottom-right" theme="colored" />
      
      <div className="grid md:grid-cols-2 gap-16">
        {/* Informations de contact (inchangées) */}
        <div>
          <h1 className="text-5xl font-bold mb-10">Restons en contact</h1>
          {/* ... tes divs Phone, Mail, MapPin ... */}
        </div>

        {/* Formulaire */}
        <div className="bg-white dark:bg-neutral-900 p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-semibold mb-8">Envoyez-nous un message</h2>
          
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <input
              type="text"
              placeholder="Votre nom"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-neutral-700 focus:border-accent-500 outline-none"
              required
            />

            <input
              type="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-100 dark:border-neutral-700 focus:border-accent-500 outline-none"
              required
            />

            <textarea
              rows={4}
              placeholder="Votre message..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-5 py-4 rounded-3xl border border-gray-100 dark:border-neutral-700 focus:border-accent-500 outline-none resize-none"
              required
            />

            <div className="grid grid-cols-1 gap-4">
              {/* BOUTON EMAIL */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#003366] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all"
              >
                {loading ? "Envoi..." : <><Send size={20} /> Envoyer par Email</>}
              </button>

              {/* BOUTON WHATSAPP */}
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full bg-[#25D366] text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-opacity-90 transition-all"
              >
                <MessageCircle size={22} />
                Discuter sur WhatsApp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}