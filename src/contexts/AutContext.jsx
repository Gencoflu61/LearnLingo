import { createContext, useContext, useState, useEffect, Children } from 'react';
import { auth } from '../services/firebase';
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';


const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [ loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return unsubscribe;
    }, []);
    // Giriş yapma fonksiyonu
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };
    // Kayıt olma fonksiyonu
    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };
    // Çıkış yapma fonksiyonu
    const logout = () => {
        return signOut(auth);
    };
    const value = {
        user,
        login,
        register,
        logout,
        isAuthenticated: !!user
    };
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

