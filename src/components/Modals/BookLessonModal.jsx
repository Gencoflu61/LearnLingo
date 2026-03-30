import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import styles from './BookLessonModal.module.css';

const bookLessonSchema = yup.object({
  fullName: yup
    .string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .email('Valid email is required')
    .required('Email is required'),
  phone: yup
    .string()
    .required('Phone number is required')
    .min(10, 'Phone number must be at least 10 characters')
});

const BookLessonModal = ({ teacher, onClose, onSuccess }) => {
  const [reason, setReason] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: yupResolver(bookLessonSchema)
  });

  const reasons = [
    { id: 'career', label: 'Career and business' },
    { id: 'kids', label: 'Lesson for kids' },
    { id: 'abroad', label: 'Living abroad' },
    { id: 'exams', label: 'Exams and coursework' },
    { id: 'travel', label: 'Culture, travel or hobby' }
  ];

  const onSubmit = async (data) => {
    try {
      console.log('Booking data:', {
        teacher: teacher.name,
        ...data,
        reason: reason
      });
      onSuccess();
    } catch (error) {
      setError('general', { message: 'Booking failed. Try again.' });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Book trial lesson</h2>
      <p className={styles.description}>
        Our experienced tutor will assess your current language level, discuss your learning goals, 
        and tailor the lesson to your specific needs.
      </p>
      
      {/* Your teacher - resimli */}
      <div className={styles.teacherSection}>
        <img 
            src={teacher.avatar_url} 
            alt={`${teacher.name} ${teacher.surname}`}
            className={styles.teacherAvatar}
          />
        <div className={styles.teacherInfo}>
          <span className={styles.sectionLabel}>Your teacher</span>
          <p className={styles.teacherName}>{teacher.name} {teacher.surname}</p>
        </div>
      </div>
      
      {/* What is your main reason for learning English? */}
      <div className={styles.reasonSection}>
        <span className={styles.sectionLabel}>What is your main reason for learning English?</span>
        <div className={styles.reasonOptions}>
          {reasons.map((item) => (
            <label key={item.id} className={styles.radioLabel}>
              <input
                type="radio"
                name="reason"
                value={item.label}
                checked={reason === item.label}
                onChange={(e) => setReason(e.target.value)}
                className={styles.radio}
              />
              <span className={styles.radioText}>{item.label}</span>
            </label>
          ))}
        </div>
      </div>
      
      {/* Form alanları */}
      <div className={styles.formRow}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Full Name"
            {...register('fullName')}
            className={`${styles.input} ${errors.fullName ? styles.inputError : ''}`}
          />
          {errors.fullName && (
            <p className={styles.errorMessage}>{errors.fullName.message}</p>
          )}
        </div>
        
        <div className={styles.inputGroup}>
          <input
            type="email"
            placeholder="Email"
            {...register('email')}
            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
          />
          {errors.email && (
            <p className={styles.errorMessage}>{errors.email.message}</p>
          )}
        </div>
        
        <div className={styles.inputGroup}>
          <input
            type="tel"
            placeholder="Phone number"
            {...register('phone')}
            className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
          />
          {errors.phone && (
            <p className={styles.errorMessage}>{errors.phone.message}</p>
          )}
        </div>
      </div>
      
      {errors.general && (
        <div className={styles.errorMessage} style={{ textAlign: 'center', marginBottom: '16px' }}>
          {errors.general.message}
        </div>
      )}
      
      <button 
        type="submit" 
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Booking...' : 'Book'}
      </button>
    </form>
  );
};

export default BookLessonModal;