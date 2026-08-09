import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("taskmatrix_user");

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const login = (email) => {
        const loggedInUser = {
            email: email,
            name: email.split("@")[0],
        };

        setUser(loggedInUser);

        localStorage.setItem(
            "taskmatrix_user",
            JSON.stringify(loggedInUser)
        );
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("taskmatrix_user");
    };

    const isAuthenticated = Boolean(user);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}