import React, { Component } from 'react';
import { Alert, Spin } from 'antd';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import MovieServices from '../../services/MovieServices';
import Movies from '../Movies';
import SearchForm from '../SearchForm';

const movieServices = new MovieServices();

class SearchMoviesTab extends Component {
  state = {
    movies: [],
    totalResults: 0,
    loading: false,
    error: false,
    errorMessage: '',
    currentPage: 1,
    searchValue: '',
  };

  constructor() {
    super();
    this.getMoviesDebounced = debounce(this.getMovies, 500);
  }

  componentWillUnmount() {
    this.getMoviesDebounced.cancel();
  }

  getMovies = (query, page) => {
    if (query.length) {
      this.setState({ loading: true });
      movieServices.getMovies(query, page).then(this.onMoviesLoaded).catch(this.onError);
    } else {
      this.setState({ movies: [], error: false, errorMessage: '' });
    }
  };

  onMoviesLoaded = (movies) => {
    this.setState({ movies: movies.results, totalResults: movies.total_results, loading: false });

    if (movies.results.length) {
      this.setState({ error: false, errorMessage: '' });
    } else {
      this.setState({ error: true, errorMessage: 'Nothing found for your request' });
    }
  };

  onError = () => {
    this.setState({ loading: false, error: true, errorMessage: 'Something went wrong, check your network connection' });
  };

  onChangePage = (page) => {
    const { searchValue } = this.state;
    this.setState({ currentPage: page, loading: true });
    this.getMovies(searchValue, page);
  };

  onChangeValue = (searchValue) => {
    this.setState({ searchValue });
    this.getMoviesDebounced(searchValue);
  };

  render() {
    const { movies, loading, error, totalResults, currentPage, errorMessage, searchValue } = this.state;
    const { changeRate, ratedMovies } = this.props;
    const hasMovies = !(loading || error) && movies.length > 0;
    const updatedMovies = movies.map((movie) => ({
      ...movie,
      rating: ratedMovies.find((ratedMovie) => movie.id === ratedMovie.id)?.rating || 0,
    }));

    return (
      <>
        <SearchForm getMovies={this.getMovies} onChangeValue={this.onChangeValue} value={searchValue} />
        <div className="movies">
          {loading && <Spin size="large" />}
          {error && <Alert message={errorMessage} type="warning" showIcon />}
          {hasMovies && (
            <Movies
              movies={updatedMovies}
              currentPage={currentPage}
              onChangePage={this.onChangePage}
              totalResults={totalResults}
              changeRate={changeRate}
            />
          )}
        </div>
      </>
    );
  }
}

SearchMoviesTab.defaultProps = {
  changeRate: () => {},
  ratedMovies: [],
};

SearchMoviesTab.propTypes = {
  changeRate: PropTypes.func,
  ratedMovies: PropTypes.arrayOf(PropTypes.object),
};

export default SearchMoviesTab;
