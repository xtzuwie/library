import { useNavigate } from "react-router";
import { useAuthStore } from "../store/authStore"
import { useEffect } from "react";

const UnauthRedirect = ({ children }) => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);
    
    if (!user) {
        return null;
    }
    return <>{children}</>;
};

export default UnauthRedirect
