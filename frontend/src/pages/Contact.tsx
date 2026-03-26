import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message envoyé ! (simulation - on connectera Nodemailer plus tard)");
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-16">
        {/* Informations de contact */}
        <div>
          <h1 className="text-5xl font-bold mb-10">Restons en contact</h1>
          
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="w-14 h-14 bg-accent-100 dark:bg-accent-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone className="text-accent-500" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">Téléphone / WhatsApp</h3>
                <p className="text-2xl font-medium">+237 670 247 456</p>
                <p className="text-2xl font-medium">+237 670 247 456</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-14 h-14 bg-accent-100 dark:bg-accent-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Mail className="text-accent-500" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">Email</h3>
                <p className="text-xl">makuneflore44@gmail.com</p>
                <p className="text-xl">makuneflore44@gmail.com</p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-14 h-14 bg-accent-100 dark:bg-accent-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin className="text-accent-500" size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-1">Adresse</h3>
                <p className="text-lg leading-relaxed">Douala, Littoral<br />Cameroun</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white dark:bg-neutral-900 p-10 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-semibold mb-8">Envoyez-nous un message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Votre nom</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-accent-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Votre email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-accent-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Votre message</label>
              <textarea
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-5 py-4 rounded-3xl border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-accent-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary-600 hover:bg-primary-700 text-white py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-3 transition-all"
            >
              <Send size={22} />
              Envoyer le message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}