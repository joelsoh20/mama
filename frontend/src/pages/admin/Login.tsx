import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { ENDPOINTS } from '../../lib/endpoints';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // État pour la visibilité
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(ENDPOINTS.auth.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      // Le serveur peut répondre sans corps JSON exploitable (ex: 502, service indisponible).
      let data: { message?: string; token?: string; admin?: unknown } | null = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok || !data?.token) {
        throw new Error(data?.message || `Le serveur est indisponible (code ${res.status}). Réessayez plus tard.`);
      }

      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminInfo', JSON.stringify(data.admin));

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Impossible de contacter le serveur. Vérifiez votre connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6">
      <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl shadow-2xl p-10">
        
        {/* Header avec ton nouveau style Bleu & Or */}
        <div className="text-center mb-10">
          <div className="mx-auto w-20 h-20 bg-[#003366] rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-900/20">
            <ShieldCheck className="text-yellow-500" size={40} />
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#003366]">
            SOH <span className="text-yellow-500">&</span> CHANTAL
          </h1>
          <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400 mt-2">Espace Administration</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-600 rounded-r-xl text-sm italic">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Nom d'utilisateur */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#003366] mb-2">Nom d'utilisateur</label>
            <div className="relative group">
              <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#003366] transition-colors" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-all bg-gray-50/50"
                placeholder="flore"
                autoComplete="username"
                required
              />
            </div>
          </div>

          {/* Mot de passe avec bouton oeil */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-widest text-[#003366] mb-2">Mot de passe</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-[#003366] transition-colors" size={20} />
              <input
                type={showPassword ? "text" : "password"} // Bascule entre texte et password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#003366] focus:ring-1 focus:ring-[#003366] transition-all bg-gray-50/50"
                placeholder="••••••••"
                required
              />
              {/* Bouton pour afficher/masquer */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-3.5 text-gray-400 hover:text-[#003366] transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Bouton Connexion Bleu & Or */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#003366] hover:bg-[#002244] disabled:bg-gray-300 text-white py-4 rounded-xl font-bold uppercase tracking-widest shadow-lg shadow-blue-900/30 transition-all active:scale-[0.98]"
          >
            {loading ? 'Vérification...' : 'Ouvrir la session'}
          </button>
        </form>

        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-medium italic">
            Accès réservé au personnel autorisé de l'Atelier Soh & Chantal.
          </p>
        </div>
      </div>
    </div>
  );
}