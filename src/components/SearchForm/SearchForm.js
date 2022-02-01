import React from 'react';
import PropTypes from 'prop-types';
import './SearchForm.css';

const SearchForm = ({ value, onChangeValue }) => (
  <form className="form-search">
    <input
      className="form-search__input"
      value={value}
      onChange={(event) => onChangeValue(event.target.value)}
      placeholder="Type to search..."
    />
  </form>
);

SearchForm.defaultProps = {
  onChangeValue: () => {},
  value: '',
};

SearchForm.propTypes = {
  onChangeValue: PropTypes.func,
  value: PropTypes.string,
};

export default SearchForm;
