import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import { Result, Tabs } from 'antd';
import api from '../../services/apiService';
import SearchMoviesTab from '../SearchMoviesTab/SearchMoviesTab';
import { GenresProvider } from '../GenresContext';
import RatedMoviesTab from '../RatedMoviesTab/RatedMoviesTab';

class App extends Component {
  state = {
    guestSessionId: '',
    genres: [],
    ratedMovies: [],
    error: false,
    errorMessage: '',
  };

  componentDidMount() {
    const localSession = localStorage.getItem('session');

    if (!localSession) {
      api
        .getGuestSession()
        .then(({ guest_session_id: guestSessionId }) => {
          this.setState({ guestSessionId });
          localStorage.setItem('session', guestSessionId);
        })
        .catch(this.onError);
    } else {
      this.setState({ guestSessionId: localSession });
    }

    api
      .getGenres()
      .then(({ genres }) => this.setState({ genres }))
      .catch(this.onError);
  }

  componentDidUpdate(prevProps, prevState) {
    const { guestSessionId } = this.state;

    if (prevState.guestSessionId !== guestSessionId) {
      this.getRatedMovies(guestSessionId);
    }
  }

  onError = (err) => {
    this.setState({ error: true, errorMessage: err.message });
  };

  getRatedMovies = (guestSessionId) => {
    api
      .getRatedMovies(guestSessionId)
      .then(({ results }) => this.setState({ ratedMovies: results }))
      .catch(this.onError);
  };

  changeRate = (rate, movie) => {
    const { guestSessionId } = this.state;

    api.sendRatedMovie(movie.id, rate, guestSessionId).catch(this.onError);
    this.setState(({ ratedMovies }) => {
      if (ratedMovies.find((ratedMovie) => ratedMovie.id === movie.id)) {
        return {
          ratedMovies: ratedMovies.map((ratedMovie) =>
            ratedMovie.id === movie.id ? { ...ratedMovie, rating: rate } : ratedMovie
          ),
        };
      }
      return {
        ratedMovies: [...ratedMovies, { ...movie, rating: rate }],
      };
    });
  };

  render() {
    const { genres, ratedMovies, error, errorMessage } = this.state;

    return (
      <div className="app">
        <div className="wrapper app__wrapper">
          {error ? (
            <Result title={errorMessage} status="warning" />
          ) : (
            <GenresProvider value={genres}>
              <Tabs defaultActiveKey="search" centered>
                <Tabs.TabPane tab="Search" key="search">
                  <SearchMoviesTab changeRate={this.changeRate} ratedMovies={ratedMovies} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Rated" key="rated">
                  <RatedMoviesTab changeRate={this.changeRate} movies={ratedMovies} />
                </Tabs.TabPane>
              </Tabs>
            </GenresProvider>
          )}
        </div>
      </div>
    );
  }
}

export default App;
