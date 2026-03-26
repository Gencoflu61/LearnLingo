import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContext';
import { db } from '../../services/firebase';
import { ref, set } from 'firebase/database';
import PasswordInput from '../UI/PasswordInput';
import styles from './AuthForms.module.css';

const registerSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters'),
  email: yup
    .string()
    .email('Valid email is required')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required')
});

const RegisterForm = ({ onSuccess }) => {
  const { register: registerUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await registerUser(data.email, data.password);
      const user = userCredential.user;
      await set(ref(db, `users/${user.uid}`), {
        name: data.name,
        email: data.email,
        createdAt: new Date().toISOString()
      });
      onSuccess();
    } catch (error) {
      let errorMessage = '';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'Email already in use';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password too weak (min 6 characters)';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email';
          break;
        default:
          errorMessage = 'Registration failed. Try again';
          break;
      }
      
      setError('general', { message: errorMessage });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formReg}>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.logp}>
        Thank you for your interest in our platform! In order to register, 
        we need some information. Please provide us with the following information
      </p>
      
      {errors.general && (
        <div className={styles.errorMessage} style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {errors.general.message}
        </div>
      )}
      
      <div className={styles.inputGroup}>
        <input
          type="text"
          placeholder="Name"
          {...register('name')}
          className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
        />
        {errors.name && (
          <p className={styles.errorMessage}>{errors.name.message}</p>
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
        <PasswordInput
          register={register}
          name="password"
          placeholder="Password"
          error={errors.password}
        />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
      </div>

      <button 
        type="submit" 
        className={styles.submitBtn}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default RegisterForm;