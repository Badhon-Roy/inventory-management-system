import { Navigate, useLocation } from "react-router-dom";
import useManager from "../Hook/useManager";
import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";


const ManagerRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isManager , isManagerLoading] = useManager()
    const location = useLocation();
    if (loading || isManagerLoading) {
        return <div className="flex justify-center items-center h-[50vh]">
        <span className="loading loading-spinner loading-lg"></span>
    </div>
    }

    if (user && isManager) {
        return children;
    }

    return <Navigate to="/forbiddenAccess" state={{ from: location }} replace></Navigate>
};

export default ManagerRoute;