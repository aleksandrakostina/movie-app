import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import truncateText from '../../utils/truncateText';
import './Movie.css';
import image from './poster-placeholder.png';

const Movie = ({ movie: { overview, title, poster_path: poster, release_date: releaseDate } }) => (
  <div className="card">
    <div className="card__inner">
      <div className="card__img">
        <img src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : image} alt={title} />
      </div>
      <div className="card__header">
        <h3 className="card__title" title={title}>
          {title}
        </h3>
        <ul className="list card__list">
          <li className="list__item">
            <span>Drama</span>
          </li>
          <li className="list__item">
            <span>Action</span>
          </li>
        </ul>
        <p className="card__date">{releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy') : ''}</p>
      </div>
      <div className="card__body">
        <p className="card__text">{truncateText(overview, 260)}</p>
      </div>
    </div>
  </div>
);

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
  }).isRequired,
};

export default Movie;
