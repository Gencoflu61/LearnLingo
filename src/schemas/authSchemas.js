import * as yup from 'yup';

// Giriş yap formu için doğrulama kuralları
export const loginSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Email address is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required')
});

// Kayıt ol formu için doğrulama kuralları
export const registerSchema = yup.object({
  email: yup
    .string()
    .email('Please enter a valid email address.')
    .required('Email address is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Password is required'),
});