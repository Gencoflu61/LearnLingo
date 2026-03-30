import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { ref, get } from 'firebase/database';
import { useFavorites } from '../hooks/useFavorites';
import TeacherCard from '../components/Teachers/TeacherCard';
import TeacherFilters from '../components/Teachers/TeacherFilters';
import styles from './TeachersPage.module.css';

const TeachersPage = () => {
  const [allTeachers, setAllTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4);
  const [filters, setFilters] = useState({
    language: '',
    level: '',
    price: 'all'
  });

  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const rootRef = ref(db, '/');
        const snapshot = await get(rootRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          
          let teachersWithId = [];
          
          if (Array.isArray(data)) {
            teachersWithId = data.map((teacher, index) => ({
              id: index.toString(),
              ...teacher
            }));
          } else if (data.teachers && Array.isArray(data.teachers)) {
            teachersWithId = data.teachers.map((teacher, index) => ({
              id: index.toString(),
              ...teacher
            }));
          } else if (typeof data === 'object' && data !== null) {
            teachersWithId = Object.keys(data).map(key => ({
              id: key,
              ...data[key]
            }));
          }
          
          setAllTeachers(teachersWithId);
          setFilteredTeachers(teachersWithId);
        }
      } catch (err) {
        console.error('Hata:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (allTeachers.length === 0) return;
    
    let filtered = [...allTeachers];
    
    if (filters.language && filters.language !== '') {
      filtered = filtered.filter(teacher => 
        teacher.languages && teacher.languages.includes(filters.language)
      );
    }
    
    if (filters.level && filters.level !== '') {
      filtered = filtered.filter(teacher => 
        teacher.levels && teacher.levels.includes(filters.level)
      );
    }
    
    if (filters.price && filters.price !== 'all') {
      if (filters.price === '0-25') {
        filtered = filtered.filter(t => t.price_per_hour < 25);
      } else if (filters.price === '25-30') {
        filtered = filtered.filter(t => t.price_per_hour >= 25 && t.price_per_hour < 30);
      } else if (filters.price === '30-35') {
        filtered = filtered.filter(t => t.price_per_hour >= 30 && t.price_per_hour < 35);
      } else if (filters.price === '35+') {
        filtered = filtered.filter(t => t.price_per_hour >= 35);
      }
    }
    
    setFilteredTeachers(filtered);
    setVisibleCount(4);
  }, [filters, allTeachers]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTeachers.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  if (loading) {
    return <div className={styles.loading}>Loading teachers...</div>;
  }

  return (
    <div className={styles.container}>
      <TeacherFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
      />
      
      <p className={styles.resultCount}>
        {filteredTeachers.length} teachers found
      </p>
      
      {filteredTeachers.length === 0 ? (
        <div className={styles.noResults}>
          <p>No teachers found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className={styles.teachersGrid}>
            {visibleTeachers.map(teacher => (
              <TeacherCard 
                key={teacher.id} 
                teacher={teacher}
                isFavorite={isFavorite(teacher.id)}
                onToggleFavorite={() => toggleFavorite(teacher.id)}
                activeFilters={filters}
              />
            ))}
          </div>
          
          {hasMore && (
            <div className={styles.loadMoreWrapper}>
              <button
                onClick={loadMore}
                className={styles.loadMoreBtn}
              >
                Load more ({visibleTeachers.length} / {filteredTeachers.length})
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TeachersPage;