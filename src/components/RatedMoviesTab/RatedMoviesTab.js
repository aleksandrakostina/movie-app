import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Movies from '../Movies';

class RatedMoviesTab extends Component {
  state = {
    currentPage: 1,
  };

  onChangePage = (page) => {
    this.setState({ currentPage: page });
  };

  render() {
    const { currentPage } = this.state;
    const { changeRate, movies } = this.props;

    return (
      <div className="movies">
        <Movies
          movies={movies}
          currentPage={currentPage}
          onChangePage={this.onChangePage}
          totalResults={movies.length}
          changeRate={changeRate}
        />
      </div>
    );
  }
}

RatedMoviesTab.defaultProps = {
  changeRate: () => {},
  movies: [],
};

RatedMoviesTab.propTypes = {
  changeRate: PropTypes.func,
  movies: PropTypes.arrayOf(PropTypes.object),
};

export default RatedMoviesTab;
