import React, { Component } from 'react';
import styles from '../styles.module.css';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch } from 'react-icons/fa';
class Searchbar extends Component {
  state = {
    query: '',
  };

  handleInputChange = event => {
    this.setState({ query: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.query.trim() === '') {
      toast.error('Enter your request'); 
      return;
    }
    this.props.onSubmit(this.state.query);
    // this.setState({ query: '' });
  };

  render() {
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <FaSearch className={styles.SearchFormButtonLabel} />
          </button>
          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.query}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
