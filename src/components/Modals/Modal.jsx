import { useEffect } from "react";
import styles from "./Modal.module.css"

const Modal = ({ isOpen, onClose, children }) => {
    //ESC ile kapatma
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden'; // Arkaplanı kaydırmayı engelle
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = 'unset';
        };

    }, [isOpen, onClose]);

    if (!isOpen) return null;
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
     return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        <button 
          className={styles.closeBtn} 
          onClick={onClose}
          aria-label="Kapat"
        >
          ✕
        </button>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};
export default Modal;