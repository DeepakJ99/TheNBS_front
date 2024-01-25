import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoutes = ({ allowedRoles }) => {
    console.log(allowedRoles)
    const { authenticated } = useAuth();
    const location = useLocation();
    console.log(authenticated)
    return (
        authenticated?.roles?.find(role => allowedRoles?.includes(role))
            ? <Outlet /> 
            : authenticated?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/register" state={{ from: location }} replace />
    );
}

export default ProtectedRoutes;