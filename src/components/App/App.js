import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import { Alert, Spin } from 'antd';
import debounce from 'lodash.debounce';
import api from '../../services/apiService';
import Movies from '../Movies';
import SearchForm from '../SearchForm';

class App extends Component {
  constructor() {
    super();
    this.getMoviesDebounced = debounce(this.getMovies, 500);
  }

  state = {
    movies: [],
    totalResults: 0,
    loading: false,
    error: false,
    errorMessage: '',
    searchValue: '',
    currentPage: 1,
  };

  componentWillUnmount() {
    this.getMoviesDebounced.cancel();
  }

  getMovies = (query, page) => {
    if (query.length) {
      this.setState({ loading: true });
      api.getMovies(query, page).then(this.onMoviesLoaded).catch(this.onError);
    } else {
      this.setState({ movies: [], error: false, errorMessage: '' });
    }
  };

  onMoviesLoaded = (movies) => {
    this.setState({ movies: movies.results, totalResults: movies.total_results, loading: false, currentPage: 1 });

    if (movies.results.length) {
      this.setState({ error: false, errorMessage: '' });
    } else {
      this.setState({ error: true, errorMessage: 'По вашему запросу ничего не найдено' });
    }
  };

  onError = () => {
    this.setState({ loading: false, error: true, errorMessage: 'Что-то пошло не так, проверьте подключение к сети' });
  };

  onChangePage = (page) => {
    const { searchValue } = this.state;
    this.setState({ currentPage: page });
    this.getMovies(searchValue, page);
  };

  onChangeValue = (searchValue) => {
    this.setState({ searchValue });
    this.getMoviesDebounced(searchValue);
  };

  render() {
    const { movies, loading, error, totalResults, searchValue, currentPage, errorMessage } = this.state;
    const hasMovies = !(loading || error) && movies.length > 0;

    return (
      <div className="app">
        <div className="wrapper app__wrapper">
          <SearchForm getMovies={this.getMovies} onChangeValue={this.onChangeValue} value={searchValue} />
          <div className="movies">
            {loading && <Spin size="large" />}
            {error && <Alert message={errorMessage} type="warning" showIcon />}
            {hasMovies && (
              <Movies
                movies={movies}
                currentPage={currentPage}
                onChangePage={this.onChangePage}
                totalResults={totalResults}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
