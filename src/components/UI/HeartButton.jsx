import styles from './HeartButton.module.css';

const HeartButton = ({ isActive, onClick }) => {
  return (
    <button onClick={onClick} className={styles.heartBtn}>
      <span className={isActive ? styles.heartActive : styles.heartInactive}>
        {isActive ? '❤️' : '♡'}
      </span>
    </button>
  );
};

export default HeartButton;