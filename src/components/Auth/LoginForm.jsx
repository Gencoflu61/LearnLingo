import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { loginSchema } from '../../schemas/authSchemas';
import { useAuth } from '../../contexts/AuthContext';
import PasswordInput from '../UI/PasswordInput';
import styles from './AuthForms.module.css';

const LoginForm = ({ onSuccess }) => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      onSuccess();
    } catch (error) {
      let errorMessage = '';
      
      switch (error.code) {
        case 'auth/invalid-credential':
          errorMessage = 'Invalid email or password';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Too many attempts. Try again later';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Account disabled';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Check connection';
          break;
        default:
          errorMessage = 'Login failed. Try again';
          break;
      }
      
      setError('general', { message: errorMessage });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formLog}>
      <h2 className={styles.title}>Log In</h2>
      <p className={styles.logp}>
        Welcome back! Please enter your credentials to access your account 
        and continue your search for an teacher.
      </p>
      
      {errors.general && (
        <div className={styles.errorMessage} style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {errors.general.message}
        </div>
      )}
      
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
        {isSubmitting ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};

export default LoginForm;