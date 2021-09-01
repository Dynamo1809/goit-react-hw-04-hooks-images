import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = ({ currentTarget }) => {
    const { value } = currentTarget;  
    setSearchQuery(value.toLowerCase());
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if(searchQuery.trim() === '') {
      toast.error(`Введіть текст`);
      return;
    }
    onSubmit(searchQuery)
    reset();
  };

  const reset = () => setSearchQuery('');

  return (
    <header className="Searchbar">
      <form onSubmit={handleFormSubmit}  className="SearchForm">
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          value={searchQuery}
          autoFocus
          placeholder="Search images and photos"
          onChange={handleSearchChange}
        />
      </form>
    </header>
  );
  
};

Searchbar.propTypes = {
  searchQuery: PropTypes.string
};