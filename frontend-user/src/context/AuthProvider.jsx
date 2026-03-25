import {useContext, useState, useEffect, createContext} from 'react';
import {authAPI} from "../services/api.js";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [setUser])

    const [loading, setLoading] = useState(false);

    // Fonction de connexion
    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await authAPI.login({email, password});
            const user = response.user;

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', response.token);
            setUser(user);
            setLoading(false);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    // Fonction d'inscription
    const register = async (name, email, password) => {
        setLoading(true);
        const response = await authAPI.register({name, email, password});
        const user = response.user;
        setUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        setLoading(false);
        return { success: true };
    };

    // Fonction de déconnexion
    const logout = () => {
        setLoading(true);
        localStorage.removeItem('user');
        localStorage.removeItem('rentals');
        setUser(null);
        setLoading(false);
    };

    // Vérifier si l'utilisateur est connecté
    const isAuthenticated = () => {
        return !!user;
    };

    // Mettre à jour le profil
    const updateProfile = (updates) => {
        const updatedUser = { ...user, ...updates }; //ça ne vous rappelle rien ?
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
    };

    //On met à disposition les éléments pour être utilisés dans les composants
    const value = {user, loading, login, register, logout, isAuthenticated, updateProfile };
    return (
        <AuthContext.Provider value={value}> {!loading && children} </AuthContext.Provider>
    );
}

// Hook personnalisé
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
}
