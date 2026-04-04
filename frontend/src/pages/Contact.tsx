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

  // --- LOGIQUE WHATSAPP UNIFIÉE ---
  const handleWhatsApp = (number: string) => {
    if (!formData.name || !formData.message) {
      return toast.warn(t('contact_wa_warn'));
    }
    const message = `${t('contact_wa_intro')}\n\n${t('form_name_placeholder')}: ${formData.name}\nEmail: ${formData.email}\nMessage: ${formData.message}`;
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/contact', formData);
      toast.success(t('contact_success_msg'));
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      toast.error(t('contact_error_msg'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 pt-46 py-20">
      <ToastContainer position="bottom-right" theme="colored" />
      
      <div className="grid md:grid-cols-2 gap-16">
        {/* Informations de contact */}
        <div>
          <h1 className="text-5xl font-bold mb-10 text-[#003366] dark:text-white">
            {t('contact')}
          </h1>
          
          <div className="space-y-8">
            <div className="flex items-center gap-6">
              <div className="bg-[#b8860b]/10 p-4 rounded-2xl text-[#b8860b]">
                <Phone size={28} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">{t('contact_phone_label')}</p>
                <p className="text-lg font-semibold">+237 670 247 456 (Flore)</p>
                <p className="text-lg font-semibold">+237 652 048 331 (Chantal)</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-[#003366]/10 p-4 rounded-2xl text-[#003366]">
                <Mail size={28} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">{t('contact_email_label')}</p>
                <p className="text-lg font-semibold">sohlfore44@gmail.com</p>
                <p className="text-lg font-semibold">chantwanstyle@gmail.com</p>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div className="bg-red-50 p-4 rounded-2xl text-red-500">
                <MapPin size={28} />
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">{t('contact_address_label')}</p>
                <p className="text-lg font-semibold">{t('location')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire */}
        <div className="bg-white dark:bg-neutral-800 p-10 rounded-3xl shadow-xl border border-gray-50 dark:border-neutral-700">
          <h2 className="text-3xl font-semibold mb-8 text-[#003366] dark:text-[#b8860b]">
            {t('Restons en contact')}
          </h2>
          
          <form onSubmit={handleEmailSubmit} className="space-y-6">
            <input
              type="text"
              placeholder={t('form_name_placeholder')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 focus:border-[#b8860b] outline-none transition-colors"
              required
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 focus:border-[#b8860b] outline-none transition-colors"
              required
            />

            <textarea
              rows={4}
              placeholder={t('form_comment_placeholder')}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-5 py-4 rounded-3xl border border-gray-200 dark:border-neutral-700 dark:bg-neutral-900 focus:border-[#b8860b] outline-none resize-none transition-colors"
              required
            />

            <div className="flex flex-col gap-4">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#003366] text-white py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#b8860b] transition-all"
              >
                {loading ? t('sending') : <><Send size={18} /> {t('contact par email')}</>}
              </button>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleWhatsApp('237670247456')}
                  className="bg-[#25D366] text-white py-4 px-2 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all"
                >
                  <MessageCircle size={18} />
                  WhatsApp Flore
                </button>
                <button
                  type="button"
                  onClick={() => handleWhatsApp('237652048331')}
                  className="bg-[#25D366] text-white py-4 px-2 rounded-2xl font-bold uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-[#128C7E] transition-all"
                >
                  <MessageCircle size={18} />
                  WhatsApp Chantal
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}