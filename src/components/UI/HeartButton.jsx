import heartOutlineIcon from '../../assets/svg/Vector_2.svg';
import heartFilledIcon from '../../assets/svg/Vector.svg';
import styles from './HeartButton.module.css';

const HeartButton = ({ isActive, onClick }) => {
  return (
    <button onClick={onClick} className={styles.heartBtn}>
      <img 
        src={isActive ? heartFilledIcon : heartOutlineIcon} 
        alt="heart" 
        className={styles.heartIcon}
      />
    </button>
  );
};

export default HeartButton;