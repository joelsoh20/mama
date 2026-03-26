import { useTranslation } from 'react-i18next';
import { useSelection } from '../hooks/useSelection';
import { Trash2, Send } from 'lucide-react';

export default function MaSelection() {
  const { t, i18n } = useTranslation();
  const { selection, removeFromSelection, clearSelection, totalPrice } = useSelection();

  const sendToWhatsApp = () => {
  if (selection.length === 0) return;

  let message = `Bonjour Couture d'Or,\n\nJe suis intéressé(e) par les modèles suivants :\n\n`;
  
  selection.forEach((item, index) => {
    const name = i18n.language === 'fr' ? item.name : item.nameEn;
    message += `${index + 1}. ${name} — ${item.price.toLocaleString()} FCFA\n`;
  });

  message += `\nTotal estimé : ${totalPrice.toLocaleString()} FCFA\n\nMerci de me recontacter !`;

  const whatsappUrl = `https://wa.me/237656178397?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};

  if (selection.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h2 className="text-4xl font-bold mb-6">Votre sélection est vide</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Ajoutez des modèles depuis le catalogue pour les envoyer par WhatsApp.</p>
        <a href="/catalogue" className="bg-accent-500 text-black px-8 py-4 rounded-full font-semibold">Aller au Catalogue</a>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-5xl font-bold">Ma Sélection ({selection.length})</h1>
        <button onClick={clearSelection} className="text-red-500 hover:text-red-600 flex items-center gap-2">
          <Trash2 size={20} /> Tout supprimer
        </button>
      </div>

      <div className="grid gap-6 mb-12">
        {selection.map(item => (
          <div key={item.id} className="flex gap-6 bg-white dark:bg-neutral-900 p-6 rounded-2xl">
            <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-xl" />
            <div className="flex-1">
              <h3 className="text-2xl font-semibold">{i18n.language === 'fr' ? item.name : item.nameEn}</h3>
              <p className="text-3xl font-bold text-accent-500 mt-2">{item.price.toLocaleString()} FCFA</p>
            </div>
            <button 
              onClick={() => removeFromSelection(item.id)}
              className="text-red-500 hover:bg-red-100 dark:hover:bg-red-900 p-3 rounded-xl self-start"
            >
              <Trash2 size={24} />
            </button>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 dark:bg-neutral-900 p-8 rounded-3xl">
        <div className="text-4xl font-bold mb-8">Total : {totalPrice.toLocaleString()} FCFA</div>
        <button
          onClick={sendToWhatsApp}
          className="w-full bg-green-500 hover:bg-green-600 text-white py-5 rounded-2xl text-xl font-semibold flex items-center justify-center gap-3 transition-all"
        >
          <Send size={26} />
          Envoyer ma sélection sur WhatsApp
        </button>
      </div>
    </div>
  );
}