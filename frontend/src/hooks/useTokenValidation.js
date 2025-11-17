// src/hooks/useTokenValidation.js
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const useTokenValidation = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get("accessToken");

        if (token) {
            try {
                const decoded = jwtDecode(token);
                const currentTime = Math.floor(Date.now() / 1000);

                if (decoded.exp < currentTime) {
                    Cookies.remove("accessToken");
                    if (location.pathname !== "/login") {
                        navigate("/login", {
                            state: { from: location },
                            replace: true,
                        });
                    }
                }
            } catch (err) {
                console.error("Token error:", err);
                Cookies.remove("accessToken");
                navigate("/login", { state: { from: location }, replace: true });
            }
        }
    }, [location, navigate]);
};

export default useTokenValidation;
