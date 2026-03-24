import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/authSchemas';
import { useAuth } from '../../contexts/AutContext';
import styles from './AuthForms.module.css';

const LoginForm = ({ onSuccess }) => {
    const { login } = useAuth();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: loginSchema,
        onSubmit: async (values, { setSubmitting, setErrors }) => {
        try {
        await login(values.email, values.password);
        onSuccess(); 
        } catch (error) {
        let errorMessage = 'Login failed';
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'User not found';
        } else if (error.code === 'auth/wrong-password') {
          errorMessage = 'Wrong password';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email';
        } else {
          errorMessage = error.message;
        }
        setErrors({ general: errorMessage});
    } finally{
        setSubmitting(false);
    }
  }
});
  return (
    <form onSubmit={formik.handleSubmit} className={styles.form}>
        <h2 className={styles.title}> Log In</h2>
        <p className={styles.logp}>Welcome back! Please enter your credentials to access your account and continue your search for an teacher.</p>
        {/* Genel hata mesajı */}
        {formik.errors.general && (
            <div className={styles.errorMessage}>
                {formik.errors.general}
            </div>
        )}
        <div className={styles.inputGroup}>
            <input 
             type="email"
             id="email"
             name="email"
             placeholder="E-posta adresi"
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
          placeholder="Şifre"
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
        {formik.isSubmitting ? 'Logging in...' : 'Log In'}
      </button>
    </form>
  );
};

export default LoginForm;