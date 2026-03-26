import styles from './ExpandedTeacherCard.module.css';

const ExpandedTeacherCard = ({ teacher }) => {
  // Yıldızları oluştur
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

  return (
    <div className={styles.expanded}>
      <div className={styles.section}>
        <div className={styles.sectionTitle}> Lesson Info</div>
        <div className={styles.sectionText}>{teacher.lesson_info}</div>
      </div>
      
      <div className={styles.section}>
        <div className={styles.sectionTitle}> Conditions</div>
        <div className={styles.sectionText}>
          {Array.isArray(teacher.conditions) 
            ? teacher.conditions.join(' • ') 
            : teacher.conditions}
        </div>
      </div>
      
      <div className={styles.section}>
        <div className={styles.sectionTitle}> Experience</div>
        <div className={styles.sectionText}>{teacher.experience}</div>
      </div>
      
      {teacher.reviews && teacher.reviews.length > 0 && (
        <div className={styles.reviews}>
          <div className={styles.sectionTitle}>Student Reviews</div>
          {teacher.reviews.slice(0, 3).map((review, idx) => (
            <div key={idx} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <span className={styles.reviewerName}>{review.reviewer_name}</span>
                <span className={styles.reviewRating}>
                  {renderStars(review.reviewer_rating)}
                </span>
              </div>
              <div className={styles.reviewComment}>{review.comment}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpandedTeacherCard;