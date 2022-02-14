const GET = 'GET';
const POST = 'POST';

class MovieServices {
  apiKey = '876f8e59c34779fb0b343ee7b8b9c120';

  apiBase = `https://api.themoviedb.org/3`;

  async getResource(url, method = GET, value = '') {
    let options = {};

    if (method === POST) {
      options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify({
          value,
        }),
      };
    }
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error('Failed to load data');
      }
      return await response.json();
    } catch (err) {
      throw new Error(err.message);
    }
  }

  getMovies(query, page = 1) {
    return this.getResource(`${this.apiBase}/search/movie?query=${query}&page=${page}&api_key=${this.apiKey}`);
  }

  getGenres() {
    return this.getResource(`${this.apiBase}/genre/movie/list?api_key=${this.apiKey}`);
  }

  getGuestSession() {
    return this.getResource(`${this.apiBase}/authentication/guest_session/new?api_key=${this.apiKey}`);
  }

  getRatedMovies(guestId, page = 1) {
    return this.getResource(
      `${this.apiBase}/guest_session/${guestId}/rated/movies?page=${page}&api_key=${this.apiKey}&sort_by=created_at.asc`
    );
  }

  sendRatedMovie(movieId, rated, guestId) {
    return this.getResource(
      `${this.apiBase}/movie/${movieId}/rating?guest_session_id=${guestId}&api_key=${this.apiKey}`,
      POST,
      rated
    );
  }
}

export default MovieServices;
