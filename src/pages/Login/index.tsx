import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleLogin() {
        // Simulação de login (normalmente seria uma chamada à API)
        const fakeUser = { name: "Roberto", token: "abc123" };
        login(fakeUser);
        navigate("/home"); // redireciona usando React Router (sem reload)
    }

    return (
        <div className="flex h-screen bg-yellow-400">

            <div className="bg-white h-screen flex items-center justify-center w-1/2 rounded-r-full">
                <img src="logo.png" alt="Logo" />
            </div>

            <div className="flex flex-col w-1/2 gap-4 p-8 justify-center items-center">

                <h1 className="text-4xl text-gray-100 font-bold mb-4 font-oswald">Entre com seu usuário</h1>

                <input
                    type="text"
                    placeholder="Usuário"
                    className="px-4 py-2 w-2/3 max-w-lg border rounded"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    className="px-4 py-2 w-2/3 max-w-lg border rounded"
                />

                <button
                    onClick={handleLogin}
                    className="px-8 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-500 transition-colors mt-4"
                >
                    Entrar
                </button>

            </div>
        </div>
    );
}
