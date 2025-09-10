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
    <nav className="flex gap-4 p-4 bg-red-600 text-white">
      <Link to="/home">Home</Link>
      <Link to="/pedidos">Pedidos</Link>
      <Link to="/cardapio">Cardápio</Link>
      {user && (
        <button onClick={handleLogout} className="ml-auto hover:underline">
          Logout
        </button>
      )}
    </nav>
  );
}