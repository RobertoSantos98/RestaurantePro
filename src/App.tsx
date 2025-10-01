import { Routes, Route, useLocation } from "react-router-dom";
import Pedidos from "./pages/Pedidos";
import Cardapio from "./pages/Cardapio";
import Home from "./pages/Home";

import Navbar from "./components/NavBar";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoutes";
import Admin from "./pages/Admin";

export default function App() {

  const location = useLocation();
  
  const showLocation = location.pathname !== "/";

  return (
    <div className=" min-h-svh bg-gray-100">
      {/* Navbar simples */}
      {showLocation && ( <Navbar /> )}

      {/* Rotas */}
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/home" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path="/cardapio" element={
          <PrivateRoute>
            <Cardapio />
          </PrivateRoute>
        } />

        <Route path="/pedidos" element={
          <PrivateRoute>
            <Pedidos />
          </PrivateRoute>
        } />

        <Route path="/admin" element={
          <PrivateRoute>
            <Admin />
          </PrivateRoute>
        } />

      </Routes>
    </div>
  );
}
