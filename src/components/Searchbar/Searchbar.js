import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import { Component } from 'react';
import './Searchbar.css'
import { errorMessage } from '../message';

export class Searchbar extends Component {
  state = {
    find: '',
  };

   onSubmit = e => {
    e.preventDefault();
     const { find } = this.state; 
     const query = find.trim();
      if (query === '') {
      errorMessage('Please enter something');
      return;
    }
     this.props.getFindName(query);
     this.setState({ find: '' });   
  };
  inputHandle = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.onSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">Search</span>
          </button>
          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            name="find"
            value={this.state.find}
            placeholder="Search images and photos"
            onChange={this.inputHandle}
          />
        </form>
        <ToastContainer />
      </header>
    );
  }
}
Searchbar.propTypes ={
  getFindName:PropTypes.func.isRequired,
}
