import React, { useEffect } from 'react';
import styles from '../styles.module.css';

export const Modal = ({ closeModal, data }) => {


  const clickOverlay = event => {
    if (event.currentTarget === event.target) {
      closeModal();
    }
  };

  useEffect(() => {
    const keyboardPress = event => {
      if (event.code === 'Escape') {
        closeModal();
      }
    };
    const handleKeyDown = event => {
      keyboardPress(event);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  return (
    <div className={styles.Modal} onClick={clickOverlay}>
      <img src={data} alt="The same img but large" />
    </div>
  );
};

export default Modal;
