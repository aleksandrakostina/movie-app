const apiKey = '876f8e59c34779fb0b343ee7b8b9c120';

const api = {
  apiBase: `http://api.themoviedb.org/3`,

  getMovies(query) {
    return fetch(`${this.apiBase}/search/movie?query=${query}&api_key=${apiKey}`).then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });
  },

  getGenres() {
    return fetch(`${this.apiBase}/genre/movie/list?api_key=${apiKey}`).then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    });
  },
};

export default api;
