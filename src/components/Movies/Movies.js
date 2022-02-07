import React from 'react';
import { List } from 'antd';
import PropTypes from 'prop-types';
import Movie from '../Movie';
import './Movies.css';
import { GenresConsumer } from '../GenresContext';

const Movies = ({ movies, totalResults, onChangePage, currentPage, changeRate, valueRate }) => (
  <List
    grid={{ gutter: [36, 34], xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 2 }}
    pagination={{
      pageSize: 20,
      total: totalResults,
      onChange: onChangePage,
      showSizeChanger: false,
      current: currentPage,
      hideOnSinglePage: true,
    }}
    dataSource={movies}
    renderItem={(movie) => (
      <List.Item key={movie.id}>
        <GenresConsumer>
          {(genres) => (
            <Movie
              movie={movie}
              changeRate={changeRate}
              valueRate={valueRate}
              genres={movie.genre_ids.map((id) => genres.find((genre) => genre.id === id))}
            />
          )}
        </GenresConsumer>
      </List.Item>
    )}
  />
);

Movies.defaultProps = {
  movies: [],
  totalResults: 0,
  onChangePage: () => {},
  currentPage: 1,
  changeRate: () => {},
  valueRate: 0,
};

Movies.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.object),
  totalResults: PropTypes.number,
  onChangePage: PropTypes.func,
  currentPage: PropTypes.number,
  changeRate: PropTypes.func,
  valueRate: PropTypes.number,
};

export default Movies;
