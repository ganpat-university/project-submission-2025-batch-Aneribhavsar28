const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');
const { authenticateAdmin } = require('../middleware/auth');

// GET all movies (public)
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single movie (public)
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new movie (admin only)
router.post('/', authenticateAdmin, async (req, res) => {
  try {
    const { title, director, year, genre, description, rating, image } = req.body;
    
    const newMovie = new Movie({
      title,
      director,
      year,
      genre,
      description,
      rating,
      image
    });

    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update movie (admin only)
router.put('/:id', authenticateAdmin, async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json(updatedMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE movie (admin only)
router.delete('/:id', authenticateAdmin, async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    
    res.json({ message: 'Movie deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;