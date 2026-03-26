import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Package, Users, MessageSquare, TrendingUp } from 'lucide-react';

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
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950">
      <div className="bg-white dark:bg-neutral-900 border-b px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Tableau de bord</h1>
          {adminInfo && <p className="text-sm text-gray-500">Connecté en tant que {adminInfo.name}</p>}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-2xl hover:bg-red-200 transition-colors"
        >
          <LogOut size={20} /> Déconnexion
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Package, label: 'Modèles dans le catalogue', value: '24', color: 'text-blue-600' },
            { icon: Users, label: 'Témoignages publiés', value: '12', color: 'text-green-600' },
            { icon: MessageSquare, label: 'Messages reçus', value: '8', color: 'text-purple-600' },
            { icon: TrendingUp, label: 'Visites ce mois', value: '1 243', color: 'text-orange-600' },
          ].map((stat, i) => (
            <div key={i} className="bg-white dark:bg-neutral-900 p-8 rounded-3xl shadow hover:shadow-xl transition-all">
              <stat.icon className={`mb-6 ${stat.color}`} size={36} />
              <p className="text-5xl font-bold mb-1">{stat.value}</p>
              <p className="text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <a href="/admin/products" className="block p-10 bg-white dark:bg-neutral-900 rounded-3xl hover:shadow-2xl transition-all group border border-transparent hover:border-accent-400">
            <Package className="text-accent-500 mb-6" size={48} />
            <h3 className="text-3xl font-semibold mb-3 group-hover:text-accent-500">Gérer le Catalogue</h3>
            <p className="text-gray-600 dark:text-gray-400">Ajouter, modifier, supprimer des modèles de vêtements</p>
          </a>

          <a href="/admin/testimonials" className="block p-10 bg-white dark:bg-neutral-900 rounded-3xl hover:shadow-2xl transition-all group">
            <Users className="text-accent-500 mb-6" size={48} />
            <h3 className="text-3xl font-semibold mb-3 group-hover:text-accent-500">Témoignages</h3>
            <p className="text-gray-600 dark:text-gray-400">Valider ou supprimer les avis clients</p>
          </a>

          <a href="/admin/admins" className="block p-10 bg-white dark:bg-neutral-900 rounded-3xl hover:shadow-2xl transition-all group">
            <Users className="text-accent-500 mb-6" size={48} />
            <h3 className="text-3xl font-semibold mb-3 group-hover:text-accent-500">Administrateurs</h3>
            <p className="text-gray-600 dark:text-gray-400">Gérer les comptes admin</p>
          </a>
        </div>
      </div>
    </div>
  );
}