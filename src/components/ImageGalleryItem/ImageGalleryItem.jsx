import React from 'react';
import styles from '../styles.module.css';

const ImageGalleryItem = ({ webformatURL, tags, openModal, largeImageURL }) => {
  return (
      <li onClick={() => {
          openModal(largeImageURL);
      }}
          className={styles.ImageGalleryItem}
      >
      <img src={webformatURL} alt={tags} />
    </li>
  );
};

export default ImageGalleryItem;
