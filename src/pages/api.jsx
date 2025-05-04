import axios from 'axios';

const TMDB_API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlMTE4ZmUyOTQ4NmFmNTkyZTEyMTEwNGI5Mjg3NDIyZiIsIm5iZiI6MTcxMjk0MzAzNy41OCwic3ViIjoiNjYxOTZmYmRhZjNkYTYwMTYzMTg5YWExIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.zsgUKUcqkSG4ne-O-O8FcOx27i1h7rfz2LTXqykPy8o'; // Replace with your API key if needed
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
    language: 'en-US', // Ensures consistent results
  },
});

// Fix: Use predefined sizes (e.g., "w500" instead of "original")
export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

// Generic error handler
const handleApiError = (error) => {
  console.error('API Error:', error.response ? error.response.data : error.message);
  return [];
};

// Fetch Trending Movies
export const fetchTrending = async () => {
  try {
    const response = await api.get('/trending/movie/week');
    return response.data.results || [];
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch Popular Movies
export const fetchPopular = async () => {
  try {
    const response = await api.get('/movie/popular');
    return response.data.results || [];
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch Top Rated Movies
export const fetchTopRated = async () => {
  try {
    const response = await api.get('/movie/top_rated');
    return response.data.results || [];
  } catch (error) {
    return handleApiError(error);
  }
};

// Search for Movies
export const searchMovies = async (query) => {
  try {
    if (!query) return []; // Prevent empty searches
    const response = await api.get('/search/movie', {
      params: { query },
    });
    return response.data.results || [];
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch Movie Details by ID
export const fetchMovieDetails = async (movieId) => {
  try {
    if (!movieId) throw new Error('Movie ID is required');
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch movie details:', error);
    return null;
  }
};

