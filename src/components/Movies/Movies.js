import React from 'react';
import { List } from 'antd';
import PropTypes from 'prop-types';
import Movie from '../Movie';
import './Movies.css';

const Movies = ({ movies, totalResults, onChangePage, currentPage }) => (
  <List
    grid={{ gutter: [36, 34], xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
    pagination={{
      pageSize: 20,
      total: totalResults,
      onChange: onChangePage,
      showSizeChanger: false,
      current: currentPage,
    }}
    dataSource={movies}
    renderItem={(movie) => (
      <List.Item key={movie.id}>
        <Movie movie={movie} />
      </List.Item>
    )}
  />
);

Movies.defaultProps = {
  movies: [],
  totalResults: 0,
  onChangePage: () => {},
  currentPage: 1,
};

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  totalResults: PropTypes.number,
  onChangePage: PropTypes.func,
  currentPage: PropTypes.number,
};

export default Movies;
