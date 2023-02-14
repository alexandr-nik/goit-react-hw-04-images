import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { useState } from 'react';
import './Searchbar.css';
import { errorMessage } from '../message';

export const Searchbar = ({ getFindName }) => {
  const [find, setFind] = useState('');
  
  const onSubmit = e => {
    e.preventDefault();
    const query = find.trim();
    if (query === '') {
      errorMessage('Please enter something');
      return;
    }
    getFindName(query);
    setFind('');
  };

  const inputHandle = e => {
    const { value } = e.currentTarget;
    setFind(value);
  };

  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={onSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          name="find"
          value={find}
          placeholder="Search images and photos"
          onChange={inputHandle}
        />
      </form>
      <ToastContainer />
    </header>
  );
};

Searchbar.propTypes = {
  getFindName: PropTypes.func.isRequired,
};
