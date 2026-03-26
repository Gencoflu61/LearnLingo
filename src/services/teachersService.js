import { db } from './firebase';
import { ref, get } from 'firebase/database';


export const getAllTeachers = async () => {
  try {
   
    const teachersRef = ref(db, 'teachers');
    
   
    const snapshot = await get(teachersRef);
    
   
    if (snapshot.exists()) {
      const data = snapshot.val();
      
      
      const teachersArray = Object.keys(data).map(key => ({
        id: key,          
        name: data[key].name,
        surname: data[key].surname,
        languages: data[key].languages,
        levels: data[key].levels,
        rating: data[key].rating,
        reviews: data[key].reviews,
        price_per_hour: data[key].price_per_hour,
        lessons_done: data[key].lessons_done,
        avatar_url: data[key].avatar_url,
        lesson_info: data[key].lesson_info,
        conditions: data[key].conditions,
        experience: data[key].experience
      }));
      
      return teachersArray;
    }
    return [];
  } catch (error) {
    console.error('Öğretmenler yüklenirken hata:', error);
    throw error;
  }
};
export const getTeacherById = async (teacherId) => {
  try {
    const teacherRef = ref(db, `teachers/${teacherId}`);
    const snapshot = await get(teacherRef);
    
    if (snapshot.exists()) {
      const data = snapshot.val();
      return {
        id: teacherId,
        name: data.name,
        surname: data.surname,
        languages: data.languages,
        levels: data.levels,
        rating: data.rating,
        reviews: data.reviews,
        price_per_hour: data.price_per_hour,
        lessons_done: data.lessons_done,
        avatar_url: data.avatar_url,
        lesson_info: data.lesson_info,
        conditions: data.conditions,
        experience: data.experience
      };
    }
    return null;
  } catch (error) {
    console.error('Öğretmen yüklenirken hata:', error);
    throw error;
  }
};