import { useState, useEffect } from 'react';
import { db } from '../services/firebase';
import { ref, get } from 'firebase/database';
import { useFavorites } from '../hooks/useFavorites';
import TeacherCard from '../components/Teachers/TeacherCard';
import TeacherFilters from '../components/Teachers/TeacherFilters';

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

  // Öğretmenleri çek
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const rootRef = ref(db, '/');
        const snapshot = await get(rootRef);
        
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (Array.isArray(data)) {
            const teachersWithId = data.map((teacher, index) => ({
              id: index.toString(),
              ...teacher
            }));
            setAllTeachers(teachersWithId);
            setFilteredTeachers(teachersWithId);
          }
        }
      } catch (err) {
        console.error('Hata:', err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchTeachers();
  }, []);

  // Filtreleme fonksiyonu
  useEffect(() => {
    let filtered = [...allTeachers];
    
    // Dile göre filtrele
    if (filters.language) {
      filtered = filtered.filter(teacher => 
        teacher.languages?.includes(filters.language)
      );
    }
    
    // Seviyeye göre filtrele
    if (filters.level) {
      filtered = filtered.filter(teacher => 
        teacher.levels?.includes(filters.level)
      );
    }
    
    // Fiyata göre filtrele
    if (filters.price !== 'all') {
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
    setVisibleCount(4); // Filtre değişince ilk 4 kartı göster
  }, [filters, allTeachers]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      language: '',
      level: '',
      price: 'all'
    });
  };

  const visibleTeachers = filteredTeachers.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTeachers.length;

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  if (loading) {
    return <div className="container text-center">Loading teachers...</div>;
  }

  return (
    <div className="container">
      <TeacherFilters 
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
      />
      
      {filteredTeachers.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No teachers found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visibleTeachers.map(teacher => (
              <TeacherCard 
                key={teacher.id} 
                teacher={teacher}
                isFavorite={isFavorite(teacher.id)}
                onToggleFavorite={() => toggleFavorite(teacher.id)}
              />
            ))}
          </div>
          
          {hasMore && (
            <div className="text-center mt-8">
              <button
                onClick={loadMore}
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
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