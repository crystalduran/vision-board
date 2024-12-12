
import { Navigate } from "react-router";
import { useFormContext } from "../hooks/useFormContext";

interface ProtectedRouteProps {
    children: JSX.Element;
}

export const ProtectedRoute = ({
    children
}: ProtectedRouteProps) => {
    const { hasContextContent } = useFormContext();

    if (hasContextContent()) {

        return children;
    }

    return <Navigate to="/" />;
};