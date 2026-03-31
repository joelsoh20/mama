import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { LogOut, Package, Users, MessageSquare, TrendingUp, ChevronRight, LayoutDashboard } from 'lucide-react';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [adminInfo, setAdminInfo] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const info = localStorage.getItem('adminInfo');

    if (!token) {
      navigate('/admin/login');
      return;
    }

    if (info) setAdminInfo(JSON.parse(info));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-gray-700 font-sans">
      {/* Barre de navigation supérieure */}
      <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#003366] rounded-xl flex items-center justify-center text-yellow-500 shadow-lg">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h1 className="text-xl font-serif font-bold text-[#003366]">
              SOH <span className="text-yellow-500">&</span> CHANTAL
            </h1>
            <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Panel de Gestion</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {adminInfo && (
            <div className="hidden md:block text-right">
              <p className="text-sm font-bold text-[#003366]">{adminInfo.name}</p>
              <p className="text-[10px] text-gray-400 uppercase tracking-tighter">Administrateur Principal</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="group flex items-center gap-2 px-4 py-2 border-2 border-red-50 text-red-600 rounded-xl hover:bg-red-50 hover:border-red-100 transition-all font-bold text-sm"
          >
            <LogOut size={18} className="group-hover:translate-x-1 transition-transform" /> 
            <span>Déconnexion</span>
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-8 py-12">
        {/* En-tête de bienvenue */}
        <div className="mb-12">
          <h2 className="text-4xl font-serif italic text-[#003366] mb-2">Bonjour, {adminInfo?.name || 'Admin'}</h2>
          <p className="text-gray-500">Voici l'état actuel de votre atelier en ligne.</p>
        </div>

        {/* Grille des statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: Package, label: 'Modèles Catalogue', value: '24', color: 'text-blue-500', bg: 'bg-blue-50' },
            { icon: Users, label: 'Témoignages', value: '12', color: 'text-yellow-600', bg: 'bg-yellow-50' },
            { icon: MessageSquare, label: 'Messages', value: '08', color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { icon: TrendingUp, label: 'Visites / Mois', value: '1 243', color: 'text-[#003366]', bg: 'bg-slate-100' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-bl-full opacity-20 group-hover:scale-110 transition-transform`} />
              <stat.icon className={`mb-4 ${stat.color}`} size={28} />
              <p className="text-4xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest font-bold text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Actions Rapides */}
        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 mb-8 flex items-center gap-4">
          Actions de gestion <div className="h-[1px] bg-gray-100 flex-1" />
        </h3>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            { 
              title: "Catalogue", 
              desc: "Ajouter, modifier ou retirer des modèles", 
              path: "/admin/products", 
              icon: <Package size={32} /> 
            },
            { 
              title: "Témoignages", 
              desc: "Gérer les avis de vos clients", 
              path: "/admin/testimonials", 
              icon: <Users size={32} /> 
            },
            { 
              title: "Paramètres", 
              desc: "Gérer les accès administrateurs", 
              path: "/admin/Settings", 
              icon: <ShieldCheck size={32} /> 
            }
          ].map((item, i) => (
            <Link 
              key={i}
              to={item.path} 
              className="group p-8 bg-white border border-gray-100 rounded-2xl hover:border-yellow-500 hover:shadow-xl transition-all relative overflow-hidden"
            >
              <div className="text-[#003366] mb-6 group-hover:text-yellow-600 transition-colors">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#003366] mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed mb-6">{item.desc}</p>
              <div className="flex items-center text-[10px] font-bold uppercase tracking-widest text-yellow-600">
                Gérer maintenant <ChevronRight size={14} className="ml-1 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// Petit import manquant à ajouter en haut si besoin
import { ShieldCheck } from 'lucide-react';