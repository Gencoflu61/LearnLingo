import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useFavorites = () => {
  const { user, isAuthenticated } = useAuth();
  const [favorites, setFavorites] = useState([]);

  // Kullanıcı giriş yaptığında localStorage'dan favorileri yükle
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedFavorites = localStorage.getItem(`favorites_${user.uid}`);
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      } else {
        setFavorites([]);
      }
    } else {
      setFavorites([]);
    }
  }, [isAuthenticated, user]);

  // Favori ekle/kaldır
  const toggleFavorite = (teacherId) => {
    if (!isAuthenticated) {
      // Yetkisiz kullanıcı için alert göster
      alert('Please login to add favorites');
      return false;
    }

    setFavorites(prev => {
      let newFavorites;
      if (prev.includes(teacherId)) {
        newFavorites = prev.filter(id => id !== teacherId);
      } else {
        newFavorites = [...prev, teacherId];
      }
      
      // localStorage'a kaydet
      localStorage.setItem(`favorites_${user.uid}`, JSON.stringify(newFavorites));
      return newFavorites;
    });

    return true;
  };

  const isFavorite = (teacherId) => {
    return favorites.includes(teacherId);
  };

  return { favorites, toggleFavorite, isFavorite };
};