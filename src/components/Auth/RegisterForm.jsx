import { useFormik } from 'formik';
import { registerSchema } from '../../schemas/authSchemas';
import { useAuth } from '../../contexts/AutContext';
import styles from './AuthForms.module.css';

const RegisterForm = ({ onSuccess }) => {
  const { register: registerUser } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await registerUser(values.email, values.password);
        onSuccess(); 
      } catch (error) {
        
        let errorMessage = 'Registration failed';
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'This email address is already in use.';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'It must be at least 6 characters long.';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address';
        } else {
          errorMessage = error.message;
        }
        
        setErrors({ general: errorMessage });
      } finally {
        setSubmitting(false);
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Registration</h2>
      <p className={styles.logp}>Thank you for your interest in our platform! In order to register, we need some information. Please provide us with the following information</p>
      {/* Genel hata mesajı */}
      {formik.errors.general && (
        <div className={styles.errorMessage} style={{ textAlign: 'center', marginBottom: '1rem' }}>
          {formik.errors.general}
        </div>
      )}
      <div className={styles.inputGroup}>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className={`${styles.input} ${formik.touched.name && formik.errors.name ? styles.inputError : ''}`}
        />
        {formik.touched.name && formik.errors.name && (
          <p className={styles.errorMessage}>{formik.errors.name}</p>
        )}
      </div>
      <div className={styles.inputGroup}>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`${styles.input} ${formik.touched.email && formik.errors.email ? styles.inputError : ''}`}
        />
        {formik.touched.email && formik.errors.email && (
          <p className={styles.errorMessage}>{formik.errors.email}</p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={`${styles.input} ${formik.touched.password && formik.errors.password ? styles.inputError : ''}`}
        />
        {formik.touched.password && formik.errors.password && (
          <p className={styles.errorMessage}>{formik.errors.password}</p>
        )}
      </div>
      <button 
        type="submit" 
        className={styles.submitBtn}
        disabled={formik.isSubmitting}
      >
          {formik.isSubmitting ? 'Sign Up...' : 'Sign Up'}
      </button>
    </form>
  );
};

export default RegisterForm;