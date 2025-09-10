import { useEffect, useState } from "react";
import { AuthContext} from "../contexts/AuthContext";
import type { User } from "../contexts/AuthContext";
import type { ReactNode } from "react";

interface AuthProviderProps {
    children: ReactNode;
}

export default function AuthProvider({children}: AuthProviderProps){
    const [ user, setUser ] = useState<User | null>(null);

    useEffect(() => {
        const usuarioSalvo = localStorage.getItem("USER");
        if(usuarioSalvo){
            setUser(JSON.parse(usuarioSalvo));
        }
    },[])


    const login = async (userData: User) => {
        localStorage.setItem("USER", JSON.stringify(userData));
        setUser(userData);
    }

    const logout = async () => {
        localStorage.removeItem("USER");
        setUser(null);
    }

    return(
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}