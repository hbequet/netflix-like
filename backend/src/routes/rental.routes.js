import express from 'express'; 
import {
    getAllRentals,
    getMyRentals,
    getRentalStats,
    createRental,
    cancelRental, getRecommendations
} from '../controllers/rental.controller.js';
import {admin, protect} from "../middleware/auth.middleware.js";

const router = express.Router(); 

// Attention à l'ordre des routes ! 
// Les routes statiques comme /stats, /my-rentals et /recommendations 
// doivent être placées AVANT les routes dynamiques contenant des paramètres comme /:id 
// pour éviter que "stats" ou "my-rentals" ne soient interprétés comme des IDs.

// Routes GET 
router.get('/', protect, admin, getAllRentals);
router.get('/my-rentals', protect, admin, getMyRentals);
router.get('/stats', protect, admin, getRentalStats);
router.get('/recommendations', protect, admin, getRecommendations);

// Route POST 
router.post('/', protect, admin, createRental);

// Route DELETE 
router.delete('/:id', protect, admin, cancelRental);

export default router;
