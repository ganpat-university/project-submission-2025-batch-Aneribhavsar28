import React, { useState } from 'react';
import Navbar from './Navbar';
import Home from './Home';
import MovieDetails from './MovieDetails';

function Main() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Search functionality will be implemented later
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar onSearch={handleSearch} />
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      ) : (
        <Home onMovieClick={handleMovieClick} />
      )}
    </div>
  );
}

export default Main;