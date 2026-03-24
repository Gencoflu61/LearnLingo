import Header from './Header';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;