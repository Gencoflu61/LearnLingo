import { useState, useEffect } from 'react';
import { getAllTeachers } from '../services/teachersService';

export const useTeachers = () => {
 
  const [teachers, setTeachers] = useState([]);
  
  const [loading, setLoading] = useState(true);
 
  const [error, setError] = useState(null);
  
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const data = await getAllTeachers();
        setTeachers(data);
        setError(null);
      } catch (err) {
        setError('Failed to load teachers');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  const visibleTeachers = teachers.slice(0, visibleCount);
  
  // "Load more" butonuna tıklandığında 4 kart daha ekle
  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
  };

  const hasMore = visibleCount < teachers.length;

  return {
    teachers,           
    visibleTeachers,    
    loading,            
    error,              
    loadMore,           
    hasMore,           
    totalCount: teachers.length  
  };
};