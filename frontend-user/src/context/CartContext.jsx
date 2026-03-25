import {getUser, isAuthenticated, rentalsAPI} from "../services/api.js";
import {createContext, useContext, useEffect, useState} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [rentals, setRentals] = useState([]);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const fetchUserRentals = async () => {
        if (!isAuthenticated()) return;
        try {
            const response = await rentalsAPI.getMyRentals();
            if (response.success) {
                setRentals(response.data);
            }
        } catch (error) {
            console.error("Erreur lors du chargement des locations:", error);
        }
    };

    useEffect(() => {
        fetchUserRentals();
    }, []);

    const addToCart = (movie) => {
        if (!isInCart(movie._id)) setCart((prev) => [...prev, movie]);
    };
    const removeFromCart = (movieId) => setCart((prev) => prev.filter(item => item._id !== movieId));
    const clearCart = () => setCart([]);
    const getCartTotal = () => cart.reduce((total, movie) => total + (movie.price || 0), 0).toFixed(2);
    const getCartCount = () => cart.length;
    const isInCart = (movieId) => cart.some(item => item._id === movieId);

    const isRented = (movieId) => {
        return rentals.some(rental => {
            const rentalMovieId = typeof rental.movie === 'object' ? rental.movie._id : rental.movie;
            return rentalMovieId === movieId;
        });
    };
    const getRentalByMovieId = (movieId) => {
        return rentals.find(rental => {
            const rentalMovieId = typeof rental.movie === 'object' ? rental.movie._id : rental.movie;
            return rentalMovieId === movieId;
        });
    };

    const rentMovie = async (movie) => {
        if (!isAuthenticated()) return { success: false, message: "Vous devez être connecté" };
        if (isRented(movie._id)) return { success: false, message: "Déjà loué" };

        try {
            const rentalDate = new Date();
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + 7);

            const user = getUser();

            const response = await rentalsAPI.rent({
                movie: movie._id,
                user: user?._id,
                rentalDate: rentalDate.toISOString(),
                returnDate: returnDate.toISOString(),
                status: 'active'
            });

            if (response.success) {
                // Rafraîchir les locations depuis le serveur ou ajouter localement
                setRentals((prev) => [...prev, response.data]);
                removeFromCart(movie._id);
                return { success: true, rental: response.data };
            }
        } catch (error) {
            return { success: false, message: error.message };
        }
    };

    // Louer tous les films du panier
    const rentAllInCart = async () => {
        if (!isAuthenticated()) return { success: false, message: "Vous devez être connecté" };
        if (cart.length === 0) return { success: false, message: "Panier vide" };

        try {
            const user = getUser();
            const rentalDate = new Date();
            const returnDate = new Date();
            returnDate.setDate(returnDate.getDate() + 7);

            const promises = cart.map(movie =>
                rentalsAPI.rent({
                    movie: movie._id,
                    user: user?._id,
                    rentalDate: rentalDate.toISOString(),
                    returnDate: returnDate.toISOString(),
                    status: 'active'
                })
            );

            await Promise.all(promises);

            // Une fois que tout est loué, on rafraîchit la liste complète depuis le backend
            await fetchUserRentals();
            clearCart();

            return { success: true, count: cart.length };
        } catch (error) {
            return { success: false, message: "Erreur lors de la location du panier." };
        }
    };

    const value = {
        cart, rentals, addToCart, removeFromCart, clearCart, getCartTotal,
        getCartCount, rentMovie, rentAllInCart, isRented, getRentalByMovieId, isInCart,
        refreshRentals: fetchUserRentals // Exposé au cas où tu as besoin de forcer un refresh ailleurs
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
}