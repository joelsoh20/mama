import { MessageCircle } from 'lucide-react';

export default function WhatsAppButton() {
  const phone = "237670247456"; // ← Mets ton vrai numéro ici (sans +)

  return (
    <a
      href={`https://wa.me/${phone}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-5 rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group"
    >
      <MessageCircle size={32} />
      <span className="absolute right-20 bg-black text-white text-sm px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap">
        Discuter sur WhatsApp
      </span>
    </a>
  );
}