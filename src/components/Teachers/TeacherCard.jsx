import { useState } from 'react';
import HeartButton from '../UI/HeartButton';
import ExpandedTeacherCard from './ExpandedTeacherCard';
import styles from './TeacherCard.module.css';

const TeacherCard = ({ teacher, isFavorite, onToggleFavorite }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Yıldızları oluştur
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(teacher.rating);
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className={styles.starFilled}>★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className={styles.starEmpty}>★</span>);
    }
    
    return stars;
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img 
          src={teacher.avatar_url} 
          alt={`${teacher.name} ${teacher.surname}`}
          className={styles.avatar}
        />
        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h3 className={styles.name}>{teacher.name} {teacher.surname}</h3>
            <HeartButton 
              isActive={isFavorite} 
              onClick={() => onToggleFavorite(teacher.id)}
            />
          </div>
          <p className={styles.languages}>{teacher.languages?.join(', ')}</p>
          <div className={styles.ratingSection}>
            <div className={styles.stars}>{renderStars()}</div>
            <span className={styles.reviews}>
              ({teacher.reviews?.length || 0} reviews)
            </span>
            <span className={styles.price}>${teacher.price_per_hour}/hour</span>
          </div>
        </div>
      </div>
      
      <div className={styles.details}>
        <p className={styles.detailItem}> Lessons: {teacher.lessons_done} completed</p>
        <p className={styles.detailItem}> Levels: {teacher.levels?.slice(0, 3).join(', ')}</p>
      </div>
      
      <div className={styles.buttons}>
        <button 
          onClick={() => setIsExpanded(!isExpanded)} 
          className={styles.readMoreBtn}
        >
          {isExpanded ? 'Show less' : 'Read more'} →
        </button>
      </div>
      
      {isExpanded && <ExpandedTeacherCard teacher={teacher} />}
    </div>
  );
};

export default TeacherCard;