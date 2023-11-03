import React, { useEffect, useState, useCallback } from 'react';
import styles from './styles.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchQuery } from 'components/config';
import { toast } from 'react-toastify';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [hits, setHits] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(null);
  const [spinner, setSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [urlModal, setUrlModal] = useState(null);

  const [prevPage, setPrevPage] = useState(1);
  const [prevQuery, setPrevQuery] = useState('');

  const fetchImages = useCallback(async () => {
    try {
      setSpinner(true);
      const data = await fetchQuery(query, page);

      if (data.hits.length === 0) {
        toast.error('No images found for your query!');
        setSpinner(false);
        return;
      }

      const { hits: newImages, totalHits } = data;

      if (page === 1) {
        toast.info(`Found: ${totalHits} images for your request`);
      }

      setHits(prevHits => [...prevHits, ...newImages]);
      setTotal(totalHits);
      setSpinner(false);
    } catch (error) {
      toast.error('Error fetching data: ' + error);
      setSpinner(false);
    }
  }, [query, page]);

  useEffect(() => {
    if (page !== prevPage || query !== prevQuery) {
      fetchImages();
      setPrevPage(page);
      setPrevQuery(query);
    }
  }, [page, query, prevPage, prevQuery, fetchImages]);

  const handleFormSubmit = newQuery => {
    if (query === newQuery) {
      return;
    }
    setQuery(newQuery);
    setHits([]);
    setPage(1);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const openModal = newUrlModal => {
    setUrlModal(newUrlModal);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {spinner && <Loader />}
      <ImageGallery hits={hits} openModal={openModal} />
      {hits.length > 0 && hits.length < total && (
        <Button onClick={handleLoadMore} />
      )}
      {showModal && <Modal data={urlModal} closeModal={closeModal} />}
    </div>
  );
};

export default App;
