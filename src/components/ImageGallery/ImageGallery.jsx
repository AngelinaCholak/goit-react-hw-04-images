import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React from 'react';
import styles from '../styles.module.css';

const ImageGallery = ({ hits, openModal }) => {
  return (
    <div>
      <ul className={styles.ImageGallery}>
        {
          hits.map(({ id, webformatURL, largeImageURL, tags }) => (
            <ImageGalleryItem
              className={styles.ImageGalleryItemImage}
              key={id}
              largeImageURL={largeImageURL}
              webformatURL={webformatURL}
              tags={tags}
              openModal={openModal}
            />
          ))}
      </ul>
    </div>
  );
};

export default ImageGallery;

