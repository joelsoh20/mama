import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Lock, Store, ShieldCheck, Edit2, Check, X } from 'lucide-react';

const Settings = () => {
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  
  // État pour la modification des infos de l'atelier
  const [isEditing, setIsEditing] = useState(false);
  const [atelierInfos, setAtelierInfos] = useState({
    nom: "SOH & CHANTAL mode",
    proprietaire: "Flore Makune et NDJOUSSI CHANTAL",
    telephone: "+237 6XX XXX XXX",
    ville: "Douala, Cameroun"
  });

  const handlePasswordChange = async (e: any) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      return toast.error("Les nouveaux mots de passe ne correspondent pas");
    }
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put('http://localhost:5000/api/auth/update-password', 
        { oldPassword: passwords.old, newPassword: passwords.new },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      toast.success("Mot de passe mis à jour !");
      setPasswords({ old: '', new: '', confirm: '' });
    } catch (err: any) {
      toast.error("Erreur : Vérifiez votre ancien mot de passe");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInfos = () => {
    // Ici on pourrait ajouter un appel API plus tard
    setIsEditing(false);
    toast.success("Informations de l'atelier mises à jour !");
  };

  return (
    <div className="p-4 md:p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <ShieldCheck className="text-[#b8860b]" size={32} />
        <h1 className="text-3xl font-serif text-[#003366]">Paramètres de l'Atelier</h1>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* SECTION SÉCURITÉ */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2 mb-6 text-[#003366]">
            <Lock size={20} />
            <h2 className="text-xl font-semibold">Sécurité du Compte</h2>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            <input type="password" placeholder="Ancien mot de passe" className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#b8860b]" 
              value={passwords.old} onChange={e => setPasswords({...passwords, old: e.target.value})} required />
            <input type="password" placeholder="Nouveau mot de passe" className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#b8860b]" 
              value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} required />
            <input type="password" placeholder="Confirmer le nouveau" className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-[#b8860b]" 
              value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} required />
            <button disabled={loading} className="w-full bg-[#003366] text-white py-3 rounded-xl hover:bg-opacity-90 transition shadow-md">
              {loading ? "Chargement..." : "Changer le mot de passe"}
            </button>
          </form>
        </div>

        {/* SECTION IDENTITÉ (MODIFIABLE) */}
        <div className="bg-[#003366] text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2 text-[#b8860b]">
                <Store size={20} />
                <h2 className="text-xl font-semibold text-white">Identité de l'Atelier</h2>
              </div>
              {!isEditing ? (
                <button onClick={() => setIsEditing(true)} className="p-2 hover:bg-white/10 rounded-full text-[#b8860b] transition">
                  <Edit2 size={18} />
                </button>
              ) : (
                <div className="flex gap-2">
                  <button onClick={handleSaveInfos} className="p-2 bg-green-600 hover:bg-green-700 rounded-full transition">
                    <Check size={18} />
                  </button>
                  <button onClick={() => setIsEditing(false)} className="p-2 bg-red-600 hover:bg-red-700 rounded-full transition">
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-5">
              {[
                { label: "Nom commercial", key: "nom" },
                { label: "Propriétaire", key: "proprietaire" },
                { label: "Téléphone / WhatsApp", key: "telephone" },
                { label: "Localisation", key: "ville" }
              ].map((item) => (
                <div key={item.key} className="border-b border-white/10 pb-2">
                  <p className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
                  {isEditing ? (
                    <input 
                      type="text" 
                      className="bg-white/10 border border-white/20 rounded px-2 py-1 w-full mt-1 outline-none focus:border-[#b8860b]"
                      value={(atelierInfos as any)[item.key]}
                      onChange={(e) => setAtelierInfos({...atelierInfos, [item.key]: e.target.value})}
                    />
                  ) : (
                    <p className="text-lg font-medium">{(atelierInfos as any)[item.key]}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <p className="mt-8 text-xs text-gray-400 italic bg-black/20 p-3 rounded-lg border border-white/5">
            Ces informations sont utilisées pour les entêtes de factures et la page contact.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;