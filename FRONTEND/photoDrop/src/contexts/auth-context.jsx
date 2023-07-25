import { createContext, useState, useEffect } from "react";
import { deleteToken } from "../functions/utils/delete-token";
import { saveToken } from "../functions/utils/save-token";
import { getUser } from "../functions/utils/get-user";
import { getToken } from "../functions/utils/get-token";

export const AuthContext = createContext({
    currentUser: null,
    token: null,
});

export const LogoutContext = createContext(null);
export const LoginContext = createContext(null);

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
    const [currentContext, setCurrentContext] = useState({
        currentUser: null,
        token: null,
    });
    function logout() {
        deleteToken();
        setCurrentContext({ currentUser: null, token: null });
    }

    function login(token) {
        saveToken(token);
        const user = getUser();
        setCurrentContext({
            token,
            currentUser: user,
        });
    }

    useEffect(() => {
        const token = getToken();
        if (token) {
            const user = getUser();
            setCurrentContext({
                token,
                currentUser: user,
            });
        }
    }, []);

    return (
        <AuthContext.Provider value={currentContext}>
            <LogoutContext.Provider value={logout}>
                <LoginContext.Provider value={login}>
                    {children}
                </LoginContext.Provider>
            </LogoutContext.Provider>
        </AuthContext.Provider>
    );
}
