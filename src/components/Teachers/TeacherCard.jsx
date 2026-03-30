import { useState } from 'react';
import HeartButton from '../UI/HeartButton';
import Modal from '../Modals/Modal';
import BookLessonModal from '../Modals/BookLessonModal';
import bookOpenIcon from '../../assets/svg/book-open-01.svg';
import starIcon from '../../assets/svg/Star 2.svg';
import styles from './TeacherCard.module.css';

const TeacherCard = ({ teacher, isFavorite, onToggleFavorite, activeFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span key={i} style={{ color: i < rating ? '#fbbf24' : '#e5e7eb' }}>
          ★
        </span>
      );
    }
    return stars;
  };

  const isLevelActive = (level) => {
    return activeFilters?.level === level;
  };

  const getReviewerAvatar = (name) => {
    const seed = name.replace(/\s/g, '');
    return `https://ui-avatars.com/api/?background=F4C550&color=121417&bold=true&name=${seed}&size=32`;
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.leftColumn}>
          <img 
            src={teacher.avatar_url} 
            alt={`${teacher.name} ${teacher.surname}`}
            className={styles.avatar}
          />
        </div>

        <div className={styles.rightColumn}>
          <div className={styles.topRow}>
            <div className={styles.nameAndTitle}>
              <span className={styles.languagesTitle}>Languages</span>
              <h3 className={styles.name}>{teacher.name} {teacher.surname}</h3>
            </div>
            <div className={styles.infoRow}>
              <div className={styles.infoItem}>
                <img src={bookOpenIcon} alt="book" className={styles.iconSmall} />
                <span className={styles.infoLabel}>Lessons online</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Lessons done : </span>
                <span className={styles.infoValue}>{teacher.lessons_done}</span>
              </div>
              <div className={styles.ratingContainer}>
                <img src={starIcon} alt="star" className={styles.iconSmall} />
                <span className={styles.ratingLabel}> Rating : </span>
                <span className={styles.ratingValue}>{teacher.rating}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Price / 1 hour : </span>
                <span className={styles.priceValue}>{teacher.price_per_hour}$</span>
              </div>
            </div>
            <div className={styles.heartContainer}>
              <HeartButton 
                isActive={isFavorite} 
                onClick={() => onToggleFavorite(teacher.id)}
              />
            </div>
          </div>
          
          <p className={styles.speaks}>
            Speaks: <span className={styles.speaksText}>{teacher.languages?.join(', ')}</span>
          </p>
          
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Lesson Info : </span>
            <p className={styles.sectionText}>{teacher.lesson_info}</p>
          </div>
          
          <div className={styles.section}>
            <span className={styles.sectionTitle}>Conditions : </span>
            <p className={styles.sectionText}>
              {Array.isArray(teacher.conditions) 
                ? teacher.conditions.join(' ') 
                : teacher.conditions}
            </p>
          </div>
          
          {!isExpanded && (
            <>
              <button 
                onClick={() => setIsExpanded(true)} 
                className={styles.readMoreBtn}
              >
                Read more
              </button>
              <div className={styles.levelTags}>
                {teacher.levels?.map((level, index) => (
                  <span 
                    key={index} 
                    className={`${styles.levelTag} ${isLevelActive(level) ? styles.levelTagActive : ''}`}
                  >
                    #{level.replace(/\s/g, '')}
                  </span>
                ))}
              </div>
            </>
          )}
          
          {isExpanded && (
            <div className={styles.expandedContent}>
              <div className={styles.section}>
                <p className={styles.sectionText}>{teacher.experience}</p>
              </div>
              
              {teacher.reviews && teacher.reviews.length > 0 && (
                <div className={styles.reviewsSection}>
                  {teacher.reviews.map((review, idx) => (
                    <div key={idx} className={styles.reviewItem}>
                      <div className={styles.reviewHeader}>
                        <img 
                          src={getReviewerAvatar(review.reviewer_name)}
                          alt={review.reviewer_name}
                          className={styles.reviewerAvatar}
                        />
                        <div className={styles.reviewOp}>
                          <span className={styles.reviewerName}>{review.reviewer_name}</span>
                        <div className={styles.ratingContainer}>
                          <img src={starIcon} alt="star" className={styles.iconSmall} />
                          <span className={styles.ratingValue}>{review.reviewer_rating}</span>
                        </div>
                        </div>
                        
                      </div>
                      <p className={styles.reviewComment}>{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
              
              <div className={styles.levelTags}>
                {teacher.levels?.map((level, index) => (
                  <span 
                    key={index} 
                    className={`${styles.levelTag} ${isLevelActive(level) ? styles.levelTagActive : ''}`}
                  >
                    #{level.replace(/\s/g, '')}
                  </span>
                ))}
              </div>
              
              <button 
                onClick={() => setIsBookingModalOpen(true)} 
                className={styles.bookLessonBtn}
              >
                Book trial lesson
              </button>
            </div>
          )}
        </div>
      </div>

      <Modal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)}
        modalClassName={styles.modalBooking}
      >
        <BookLessonModal 
          teacher={teacher}
          onClose={() => setIsBookingModalOpen(false)}
          onSuccess={() => {
            setIsBookingModalOpen(false);
            alert('Lesson booked successfully!');
          }}
        />
      </Modal>
    </>
  );
};

export default TeacherCard;