import React from 'react';
import { List } from 'antd';
import PropTypes from 'prop-types';
import Movie from '../Movie';

const Movies = ({ movies }) => (
  <List
    grid={{ gutter: [36, 36], md: 1, lg: 2, xl: 2, xxl: 2 }}
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
};

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
};

export default Movies;
