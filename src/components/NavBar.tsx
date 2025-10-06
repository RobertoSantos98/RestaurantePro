import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/"); // redireciona para login
  }

  return (
    <nav className="flex gap-4 h-16 bg-red-600 text-red-200 items-center px-8 font-bebas text-xl">
      <Link to="/home" className="hover:text-white transition-all">Home</Link>
      <span className="text-red-400">|</span>
      <Link to="/pedidos" className="hover:text-white transition-all">Pedidos</Link>
      <span className="text-red-400">|</span>
      <Link to="/cardapio" className="hover:text-white transition-all">Cardápio</Link>
      <span className="text-red-400">|</span>
      <Link to="/admin" className="hover:text-white transition-all">Administração</Link>
      {user && (
        <div className="ml-auto flex items-center gap-4">
          <p className="text-red-400">{user.name}</p>
          <span className="text-red-400">|</span>
          <button onClick={handleLogout} className="hover:underline hover:text-white transition-all">
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}