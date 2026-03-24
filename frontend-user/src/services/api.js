const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
/**
 * Fonction utilitaire pour gérer les requêtes fetch
 * @param {string} endpoint - L'endpoint de l'API
 * @param {object} options - Options de la requête fetch
 * @returns {Promise} - Promesse avec les données ou erreur
 */
const fetchAPI = async (endpoint, options = {}) => {
    // Récupérer le token depuis localStorage
    const token = localStorage.getItem('token');
    // Configuration par défaut
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` })
        }
    };
    // Fusionner les options
    const config = {
        ...defaultOptions,
        ...options,
        headers: {
            ...defaultOptions.headers,
            ...options.headers
        }
    };
    try {
        const response = await fetch(`${API_URL}${endpoint}`, config);
        // Gestion des erreurs HTTP
        if (!response.ok) {
            // Cas spécial : 401 Unauthorized (token expiré/invalide)
            if (response.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login';
            }
            // Essayer de parser le JSON d'erreur
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                errorData = { message: response.statusText };
            }

            throw new Error(errorData.message || `HTTP Error: ${response.status}`);
        }

        // Parser et retourner les données JSON
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
};

// ==================== AUTH ENDPOINTS ====================
export const authAPI = {
    /**
     * Inscription d'un nouvel utilisateur
     * @param {object} userData - { name, email, password }
     */
    register: async (userData) => {
        return await fetchAPI('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    },
    /**
     * TODO :Connexion d'un utilisateur
     * @param {object} credentials - { email, password }
     */
    login: async (credentials) => { },
    /**
     * TODO :Obtenir le profil de l'utilisateur connecté
     */
    getMe: async () => { },
    /**
     * TODO :Mettre à jour le profil
     * @param {object} updates - { name, email }
     */
    updateProfile: async (updates) => { },
    /**
     * TODO : Changer le mot de passe
     * @param {object} passwords - { currentPassword, newPassword }
     */
    changePassword: async (passwords) => { },
    /**
     * TODO : Déconnexion
     */
    logout: async () => { }
};

// ==================== MOVIES ENDPOINTS ====================
export const moviesAPI = {
    /**
     * Obtenir tous les films avec filtres optionnels
     * @param {object} params - { genre, year, search, sort, page, limit }
     */
    getAll: async (params = {}) => {
        // Construire la query string
        const queryParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                queryParams.append(key, value);
            }
        });
        const queryString = queryParams.toString();
        const endpoint = queryString ? `/movies?${queryString}` : '/movies';
        return await fetchAPI(endpoint);
    },
    /**
     * TODO : Obtenir un film par son ID
     * @param {string} id - ID du film
     */
    getById: async (id) => { },
    /**
     * TODO : Obtenir les films similaires
     * @param {string} id - ID du film
     */
    getSimilar: async (id) => {},
    /**
     * TODO : Créer un nouveau film (admin)
     * @param {object} movieData - Données du film
     */
    create: async (movieData) => {},
    /**
     * TODO : Mettre à jour un film (admin)
     * @param {string} id - ID du film
     * @param {object} updates - Données à mettre à jour
     */
    update: async (id, updates) => {},
    /**
     * TODO : Supprimer un film (admin)
     * @param {string} id - ID du film
     */
    delete: async (id) => {},
    /**
     * TODO : Obtenir les statistiques des films (admin)
     */
    getStats: async () => {},
    /**
     * TODO : Recherche avancée
     * @param {object} filters - Filtres de recherche
     */
    search: async (filters) => { }
};

// ==================== RENTALS ENDPOINTS ====================
export const rentalsAPI = {
    /**
     * TODO : Louer un film
     * @param {string} movieId - ID du film à louer
     */
    rent: async (movieId) => { },
    /**
     * TODO : Obtenir mes locations
     * @param {object} params - { status: 'active' | 'expired' | 'all' }
     */
    getMyRentals: async (params = {}) => { },
    /**
     * TODO : Obtenir toutes les locations (admin)
     * @param {object} params - { page, limit, status }
     */
    getAll: async (params = {}) => {},
    /**
     * TODO : Annuler une location
     * @param {string} id - ID de la location
     */
    cancel: async (id) => {},
    /**
     * Obtenir les statistiques des locations (admin)
     */
    getStats: async () => {}
};

// ==================== HELPER FUNCTIONS ====================
/**
 * TODO : Vérifier si l'utilisateur est connecté
 */
export const isAuthenticated = () => {};
/**
 * TODO : Obtenir le token actuel
 */
export const getToken = () => {};
/**
 * TODO : Sauvegarder les données d'authentification
 */
export const saveAuth = (token, user) => {};
/**
 * TODO : Supprimer les données d'authentification
 */
export const clearAuth = () => {};
/**
 * TODO : Obtenir l'utilisateur depuis localStorage
 */
export const getUser = () => {};

// Export par défaut
export default {
    authAPI,
    moviesAPI,
    rentalsAPI,
    isAuthenticated,
    getToken,
    saveAuth,
    clearAuth,
    getUser
};
