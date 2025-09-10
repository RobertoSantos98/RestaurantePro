import { useAuth } from "../../hooks/useAuth";

export default function Home(){
    const { user } = useAuth();

    return(
        <div className="flex flex-col h-full items-center justify-center">
            <img src="./logo.png" alt="Logo" className="w-1/4 h-1/4" />
            <h1 className="text-2xl font-bold mb-4">Bem-vindo {user.name}!</h1>
            <p className="text-lg">Gerencie seus pedidos e cardápio de forma eficiente.</p>
        </div>
    )
}