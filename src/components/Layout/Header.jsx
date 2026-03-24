import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AutContext';
import Modal from '../Modals/Modal';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';
import styles from './Header.module.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' veya 'register'

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
    }
  };

  const openLoginModal = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const openRegisterModal = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  const switchMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            LearnLingo
          </Link>

          <nav className={styles.nav}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
            <Link to="/teachers" className={styles.navLink}>
              Teachers
            </Link>
          </nav>

          <div className={styles.userSection}>
            {isAuthenticated ? (
              <>
                <span className={styles.userEmail}>{user?.email}</span>
                <button
                  onClick={handleLogout}
                  className={styles.logoutBtn}
                >
                  Log Out
                </button>
              </>
            ) : (
              <button
                onClick={openLoginModal}
                className={styles.loginBtn}
              >
                Log In
              </button>
            )}
            <button
                onClick={openRegisterModal}
                className={styles.regisBtn}
              >
                Registration
              </button>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <Modal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}>
        {authMode === 'login' ? (
          <LoginForm 
            onSuccess={() => setIsAuthModalOpen(false)} 
            onSwitch={switchMode}
          />
        ) : (
          <RegisterForm 
            onSuccess={() => setIsAuthModalOpen(false)} 
            onSwitch={switchMode}
          />
        )}
      </Modal>
    </>
  );
};

export default Header;