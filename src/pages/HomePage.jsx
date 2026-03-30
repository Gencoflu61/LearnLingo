import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
 const navigate = useNavigate();
 const handleGetStarted = () => {
    navigate('/teachers');
 }

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroText}> 
            <h1 className={styles.title}>
          Unlock your potential with the best  <span className={styles.span}>language</span> tutors
        </h1>
        <p className={styles.pText}>Embark on an Exciting Language Journey with Expert Language Tutors: Elevate your language proficiency to new heights by connecting with highly qualified and experienced tutors.</p>
        <button className={styles.heroBtn} onClick={handleGetStarted}> Get started</button>
        </div>
        <div className={styles.heroPic}><img src="src/assets/block.jpg" alt="" /></div>
      </div>
      <div className={styles.info}>
        <div className={styles.info_first}>
            <h1 className={styles.info_h1}>32,000 +</h1>
            <p className={styles.info_p}>Experienced tutors</p>
            <h1 className={styles.info_h1}>300,000 +</h1>
            <p className={styles.info_p}>5-star tutor reviews</p>
            <h1 className={styles.info_h1}>120 +</h1>
            <p className={styles.info_p}>Subjects taugh</p>
            <h1 className={styles.info_h1}>200 +</h1>
            <p className={styles.info_p}>Tutor nationalities</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;