import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AuthWrapper(Component) {
    return function WrappedComponent(props) {
        const navigate = useNavigate();
        const isUserLoggedIn = localStorage.getItem("isLogin") === "true";

        useEffect(() => {
            if (!isUserLoggedIn) {
                navigate("/login"); 
            }
        }, [isUserLoggedIn, navigate]);

        return isUserLoggedIn ? <Component {...props} /> : null;
    };
}

export default AuthWrapper;
