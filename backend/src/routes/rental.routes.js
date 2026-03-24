import express from 'express'; 
import {
    getAllRentals,
    getMyRentals,
    getRentalStats,
    createRental,
    cancelRental,
    getRecommendations
} from '../controllers/rental.controller.js';

const router = express.Router(); 

// Attention à l'ordre des routes ! 
// Les routes statiques comme /stats, /my-rentals et /recommendations 
// doivent être placées AVANT les routes dynamiques contenant des paramètres comme /:id 
// pour éviter que "stats" ou "my-rentals" ne soient interprétés comme des IDs.

// Routes GET 
router.get('/', getAllRentals); 
router.get('/my-rentals', getMyRentals); 
router.get('/stats', getRentalStats); 
router.get('/recommendations', getRecommendations); // Route bonus 

// Route POST 
router.post('/', createRental); 

// Route DELETE 
router.delete('/:id', cancelRental); 

export default router; 