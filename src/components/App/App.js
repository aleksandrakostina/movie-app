import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import { Alert, Spin } from 'antd';
import api from '../../services/apiService';
import Movies from '../Movies';

class App extends Component {
  state = {
    movies: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    api.getMovies('return').then(this.onMoviesLoaded).catch(this.onError);
  }

  onMoviesLoaded = (movies) => {
    this.setState({ movies: movies.results, loading: false, error: false });
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  render() {
    const { movies, loading, error } = this.state;

    return (
      <div className="app">
        <div className="wrapper app__wrapper">
          <div className="movies">
            {loading && <Spin size="large" />}
            {error && (
              <Alert closable message="Что-то пошло не так, проверьте подключение к сети" type="error" showIcon />
            )}
            <Movies movies={movies} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
