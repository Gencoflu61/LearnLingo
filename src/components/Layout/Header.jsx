import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../Modals/Modal';
import LoginForm from '../Auth/LoginForm';
import RegisterForm from '../Auth/RegisterForm';
import ukraineIcon from '../../assets/svg/ukraine.svg';
import styles from './Header.module.css';

const Header = () => {
  const { user, userName, logout, isAuthenticated } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
    }
  };

  const openLoginModal = () => {
    setIsRegisterModalOpen(false);
    setIsLoginModalOpen(true);
  };

  const openRegisterModal = () => {
    setIsLoginModalOpen(false);
    setIsRegisterModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
        <symbol id="icon-log-in-01" viewBox="0 0 32 32">
          <path fill="none" stroke="currentColor" strokeWidth="3.2" d="M20 4h1.6c2.24 0 3.36 0 4.216 0.436 0.753 0.383 1.364 0.995 1.748 1.748 0.436 0.856 0.436 1.976 0.436 4.216v11.2c0 2.24 0 3.36-0.436 4.216-0.384 0.753-0.995 1.364-1.748 1.748-0.856 0.436-1.976 0.436-4.216 0.436h-1.6"/>
          <path fill="none" stroke="currentColor" strokeWidth="3.2" d="M13.333 9.333l6.667 6.667M20 16l-6.667 6.667M20 16h-16"/>
        </symbol>
      </svg>

      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
           <img src={ukraineIcon} alt="ukraıne" className={styles.iconSmall} />
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
                <span className={styles.userName}>
                  {userName || user?.email?.split('@')[0]}
                </span>
                <button
                  onClick={handleLogout}
                  className={styles.logoutBtn}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={openLoginModal}
                  className={styles.loginBtn}
                >
                  <svg className={styles.icon} width="20" height="20">
                    <use href="#icon-log-in-01"></use>
                  </svg>
                  Log In
                </button>
                <button
                  onClick={openRegisterModal}
                  className={styles.regisBtn}
                >
                  Registration
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <Modal 
        isOpen={isLoginModalOpen} 
        onClose={closeLoginModal}
        modalClassName={styles.modalLogin}
      >
        <LoginForm onSuccess={closeLoginModal} />
      </Modal>

      <Modal 
        isOpen={isRegisterModalOpen} 
        onClose={closeRegisterModal}
        modalClassName={styles.modalRegister}
      >
        <RegisterForm onSuccess={closeRegisterModal} />
      </Modal>
    </>
  );
};

export default Header;