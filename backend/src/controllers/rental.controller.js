import Rental from "../models/Rental.js";

// @desc Créer / Louer un film
// @route POST /api/rentals
// @access Private
export const createRental = async (req, res, next) => {
    const { movie, user, rentalDate, returnDate, status } = req.body;

    const rental = await Rental.create({
        movie,
        user,
        rentalDate,
        returnDate,
        status
    });

    return res.status(201).json({
        "success": true,
        "data": rental
    });
};

// @desc Obtenir les locations d'un utilisateur
// @route GET /api/rentals/my-rentals
// @access Private
export const getMyRentals = async (req, res, next) => {
    const filter = { ...req.query };

    const rentals = await Rental.find(filter).populate('movie');
    const total = await Rental.countDocuments(filter);

    return res.status(200).json({
        "success": true,
        "count": rentals.length,
        "total": total,
        "data": rentals
    });
};

// @desc Obtenir toutes les locations (admin)
// @route GET /api/rentals
// @access Private/Admin
export const getAllRentals = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortOption = req.query.sort;

    const skip = (page - 1) * limit;

    const rentals = await Rental.find(req.query)
        .populate('movie')
        .populate('user')
        .sort(sortOption)
        .skip(skip)
        .limit(limit);

    const total = await Rental.countDocuments(req.query);

    return res.status(200).json({
        "success": true,
        "count": rentals.length,
        "total": total,
        "data": rentals
    });
};

// @desc Annuler une location
// @route DELETE /api/rentals/:id
// @access Private
export const cancelRental = async (req, res, next) => {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
        return res.status(404).json({
            "success": false,
            "message": "Rental not found"
        });
    }

    await rental.deleteOne();

    return res.status(200).json({
        "success": true,
        "message": "Rental cancelled successfully"
    });
};

// @desc Obtenir les statistiques des locations
// @route GET /api/rentals/stats
// @access Private/Admin
export const getRentalStats = async (req, res, next) => {
    const stats = await Rental.aggregate([
        {
            $group: {
                _id: "$status",
                count: { $sum: 1 }
            }
        }
    ]);

    return res.status(200).json({
        "success": true,
        "data": stats
    });
};
