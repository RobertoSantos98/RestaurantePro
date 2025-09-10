import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { JSX } from "react";

interface PrivateRouteProps {
    children: JSX.Element;
}

export default function PrivateRoute( { children }: PrivateRouteProps) {
    const { user } = useAuth();

    if(!user){
        return <Navigate to={"/"} replace />
    }

    return children;
}