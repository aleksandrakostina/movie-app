import React, { Component } from 'react';
import 'antd/dist/antd.min.css';
import './App.css';
import { List } from 'antd';
import { format } from 'date-fns';
import api from '../../services/apiService';
import truncateText from '../../utils/truncateText';

class App extends Component {
  state = {
    movies: [],
  };

  componentDidMount() {
    api.getMovies('return').then((res) => this.setState({ movies: res.results }));
  }

  render() {
    const { movies } = this.state;

    return (
      <div className="app">
        <div className="wrapper app__wrapper">
          <List
            grid={{ gutter: [36, 36], md: 1, lg: 2, xl: 2, xxl: 2 }}
            dataSource={movies}
            renderItem={(movie) => (
              <List.Item>
                <div className="card">
                  <div className="card__inner">
                    <div className="card__img">
                      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                    </div>
                    <div className="card__header">
                      <h3 className="card__title">{movie.title}</h3>
                      <ul className="list card__list">
                        <li className="list__item">
                          <span>Drama</span>
                        </li>
                        <li className="list__item">
                          <span>Action</span>
                        </li>
                      </ul>
                      <p className="card__date">{format(new Date(movie.release_date), 'MMMM d, yyyy')}</p>
                    </div>
                    <div className="card__body">
                      <p className="card__text">{truncateText(movie.overview, 260)}</p>
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default App;
