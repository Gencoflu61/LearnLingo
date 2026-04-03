import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { ref, get } from 'firebase/database';
import { useAuth } from '../contexts/AuthContext';
import { useFavorites } from '../hooks/useFavorites';
import TeacherCard from '../components/Teachers/TeacherCard';
import styles from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const { isAuthenticated } = useAuth();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();  
  const [favoriteTeachers, setFavoriteTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteTeachers = async () => {
      if (!isAuthenticated || favorites.length === 0) {
        setFavoriteTeachers([]);
        setLoading(false);
        return;
      }

      try {
        const rootRef = ref(db, '/');
        const snapshot = await get(rootRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          let allTeachers = [];
          
          if (Array.isArray(data)) {
            allTeachers = data.map((teacher, index) => ({
              id: index.toString(),
              ...teacher
            }));
          } else if (data.teachers && Array.isArray(data.teachers)) {
            allTeachers = data.teachers.map((teacher, index) => ({
              id: index.toString(),
              ...teacher
            }));
          } else if (typeof data === 'object' && data !== null) {
            allTeachers = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
          }
          
          const filtered = allTeachers.filter(teacher => 
            favorites.includes(teacher.id)
          );
          
          setFavoriteTeachers(filtered);
        }
      } catch (err) {
        console.error('Favori öğretmenler yüklenirken hata:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFavoriteTeachers();
  }, [isAuthenticated, favorites]);

 
  const handleToggleFavorite = (teacherId) => {
    toggleFavorite(teacherId);
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>Please login to view favorites</h2>
          <p className={styles.emptyText}>
            You need to be logged in to see your favorite teachers.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading favorites...</div>
      </div>
    );
  }

  if (favoriteTeachers.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <h2 className={styles.emptyTitle}>No favorite teachers yet</h2>
          <p className={styles.emptyText}>
            Start adding teachers to your favorites by clicking the heart button on their cards.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Favorite Teachers</h1>
      <p className={styles.subtitle}>
        {favoriteTeachers.length} teacher{favoriteTeachers.length !== 1 ? 's' : ''} in your favorites
      </p>
      
      <div className={styles.teachersGrid}>
        {favoriteTeachers.map(teacher => (
          <TeacherCard 
            key={teacher.id} 
            teacher={teacher}
            isFavorite={true}  // Bu kart zaten favori
            onToggleFavorite={() => handleToggleFavorite(teacher.id)}  
            activeFilters={{}}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;