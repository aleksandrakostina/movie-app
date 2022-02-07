import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import { Rate } from 'antd';
import truncateText from '../../utils/truncateText';
import './Movie.css';
import image from './poster-placeholder.png';

const Movie = ({
  movie: { overview, title, poster_path: poster, release_date: releaseDate, vote_average: avgVote, rating },
  changeRate,
  genres,
  movie,
}) => {
  const classNameRated = ['card__rated'];
  if (avgVote < 3) {
    classNameRated.push('card__rated--bad');
  } else if (avgVote < 5) {
    classNameRated.push('card__rated--normal');
  } else if (avgVote < 7) {
    classNameRated.push('card__rated--best');
  } else {
    classNameRated.push('card__rated--top');
  }

  const onChangeRate = (rate) => {
    changeRate(rate, movie);
  };

  return (
    <div className="card">
      <div className="card__inner">
        <div className="card__img">
          <img src={poster ? `https://image.tmdb.org/t/p/w500/${poster}` : image} alt={title} />
        </div>
        <div className="card__header">
          <div className="card__top">
            <h3 className="card__title" title={title}>
              {title}
            </h3>
            <div className={classNameRated.join(' ')}>{avgVote}</div>
          </div>
          <ul className="list card__list">
            {genres.map((genre) => (
              <li key={genre.id} className="list__item">
                <span>{genre.name}</span>
              </li>
            ))}
          </ul>
          <p className="card__date">{releaseDate ? format(new Date(releaseDate), 'MMMM d, yyyy') : ''}</p>
        </div>
        <div className="card__body">
          <p className="card__text">{truncateText(overview, 180)}</p>
          <Rate allowHalf count="10" onChange={onChangeRate} defaultValue={rating} value={rating} />
        </div>
      </div>
    </div>
  );
};

Movie.defaultProps = {
  changeRate: () => {},
  genres: [],
};

Movie.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    release_date: PropTypes.string,
    overview: PropTypes.string,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
    rating: PropTypes.number,
  }).isRequired,
  changeRate: PropTypes.func,
  genres: PropTypes.arrayOf(PropTypes.object),
};

export default Movie;
