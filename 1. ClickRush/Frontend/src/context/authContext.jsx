import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );


    function login(token) {
        localStorage.setItem("token", token);
        setToken(token);
    }


    function logout() {
        localStorage.removeItem("token");
        setToken(null);
    }


    // Automatically logout when JWT expires
    useEffect(() => {

        if (!token) {
            return;
        }

        try {
            // JWT has three parts:
            // header.payload.signature
            const payload = JSON.parse(
                atob(
                    token
                        .split(".")[1]
                        .replace(/-/g, "+")
                        .replace(/_/g, "/")
                )
            );

            const expirationTime = payload.exp * 1000;
            const currentTime = Date.now();

            const timeUntilExpiration =
                expirationTime - currentTime;


            // Token is already expired
            if (timeUntilExpiration <= 0) {
                logout();
                return;
            }


            // Logout automatically when token expires
            const timer = setTimeout(() => {
                logout();
            }, timeUntilExpiration);


            // Clean up timer if token changes
            return () => clearTimeout(timer);

        } catch (error) {

            console.error("Invalid token:", error);

            logout();
        }

    }, [token]);


    const value = {
        token,
        isAuthenticated: !!token,
        login,
        logout
    };


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}