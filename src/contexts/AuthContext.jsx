import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../services/firebase';
import { 
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { ref, get } from 'firebase/database';

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
    const [userName, setUserName] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log('Auth state changed:', currentUser);
            
            if (currentUser) {
                setUser(currentUser);
                
                try {
                    const userRef = ref(db, `users/${currentUser.uid}`);
                    const snapshot = await get(userRef);
                    
                    console.log('Database snapshot exists:', snapshot.exists());
                    console.log('Database data:', snapshot.val());
                    
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        setUserName(userData.name);
                        console.log('Kullanıcı adı bulundu:', userData.name);
                    } else {
                        const fallbackName = currentUser.email?.split('@')[0];
                        setUserName(fallbackName);
                        console.log('Name bulunamadı, email başı kullanıldı:', fallbackName);
                    }
                } catch (error) {
                    console.error('Kullanıcı adı çekilirken hata:', error);
                    setUserName(currentUser.email?.split('@')[0]);
                }
            } else {
                setUser(null);
                setUserName(null);
            }
            setLoading(false);
        });
        
        return unsubscribe;
    }, []);

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const register = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    const value = {
        user,
        userName,
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