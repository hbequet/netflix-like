import express from 'express';
import {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieStats,
    getSimilarMovies

} from '../controllers/movie.controller.js';
import {admin, protect} from "../middleware/auth.middleware.js";
const router = express.Router();

// Routes publiques
router.get('/', getAllMovies);
router.get('/stats', getMovieStats); // TODO: Protéger avec admin (séance 9)
router.get('/:id', getMovieById);
router.get('/:id/similar', getSimilarMovies);

router.post('/', protect, admin, createMovie);
router.put('/:id', protect, admin, updateMovie);
router.delete('/:id', protect, admin, deleteMovie);

export default router;
