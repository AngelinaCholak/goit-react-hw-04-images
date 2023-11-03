import React, { Component } from 'react';
import styles from './styles.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { fetchQuery } from 'components/config';
import { toast } from 'react-toastify';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import Loader from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    hits: [],
    page: 1,
    total: null,
    spinner: false,
    showModal: false,
    urlModal: null,
  };

  componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (page !== prevState.page || query !== prevState.query) {
      this.fetchImages();
    }
  }

  fetchImages = async () => {
    const { page, query } = this.state;
    try {
      this.setState({ spinner: true });
      const data = await fetchQuery(query, page);

      if (data.hits.length === 0) {
        toast.error('No images found for your query!');
        this.setState({ spinner: false });
        return;
      }

      const { hits: newImages, totalHits } = data;
  
      if (page === 1) {
        toast.info(`Found: ${totalHits} images for your request`);
      }

      this.setState(prevState => ({
        hits: [...prevState.hits, ...newImages],
        total: totalHits,
        spinner: false,
      }));
    } catch (error) {
      toast.error('Error fetching data: ' + error);
      this.setState({ spinner: false });
    }
  };

  handleFormSubmit = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query: query, hits: [], page: 1 });
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  openModal = urlModal => {
    this.setState({ urlModal: urlModal, showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };

  render() {
    const { spinner, hits, total, showModal, urlModal } = this.state;
    return (
      <div className={styles.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {spinner && <Loader />}
        <ImageGallery hits={this.state.hits} openModal={this.openModal} />
        {hits.length > 0 && hits.length < total && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && <Modal data={urlModal} closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default App;
