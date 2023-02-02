import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useFetchData } from "../../hooks/useFetch";
import Loader from "../biddingFeatures/components/Loader";

const RequireAuth = ({ allowedRoles }) => {
    const { loading, data, error } = useFetchData("/session");
    const { auth } = useAuth();
    const location = useLocation();
    console.log("auth", auth);

    console.log("data", data);
    console.log("check", allowedRoles?.includes(auth?.user?.role));

    return allowedRoles?.includes(auth?.user?.role) ? (
        <Outlet />
    ) : auth?.user ? (
        <Navigate to="/unauthorized" state={{ from: location }} replace />
    ) : (
        <Navigate to="/login" state={{ from: location }} replace />
    );
};

export default RequireAuth;
