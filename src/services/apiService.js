const apiKey = '876f8e59c34779fb0b343ee7b8b9c120';

const api = {
  apiBase: `http://api.themoviedb.org/3`,

  getMovies(query, page = 1) {
    return fetch(`${this.apiBase}/search/movie?query=${query}&page=${page}&api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        return response.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },

  getGenres() {
    return fetch(`${this.apiBase}/genre/movie/list?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        return response.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },

  getGuestSession() {
    return fetch(`${this.apiBase}/authentication/guest_session/new?api_key=${apiKey}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Can`t create guest session');
        }
        return response.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },

  getRatedMovies(guestId, page = 1) {
    return fetch(
      `${this.apiBase}/guest_session/${guestId}/rated/movies?page=${page}&api_key=${apiKey}&sort_by=created_at.asc`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load data');
        }
        return response.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },

  sendRatedMovie(movieId, rated, guestId) {
    return fetch(`${this.apiBase}/movie/${movieId}/rating?guest_session_id=${guestId}&api_key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: rated,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to send data');
        }
        return response.json();
      })
      .catch((err) => {
        throw new Error(err.message);
      });
  },
};

export default api;
