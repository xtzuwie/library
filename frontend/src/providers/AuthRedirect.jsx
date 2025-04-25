import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore"
import { useEffect } from "react";

const AuthRedirect = ({ children }) => {
    const { user } = useAuthStore();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate]);

    if(user){
        return null;
    }
  return <>{children}</>;
};

export default AuthRedirect;
