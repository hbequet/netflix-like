import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';
import user from "../models/User.js";

// @desc Inscription d'un nouvel utilisateur
// @route POST /api/auth/register
// @access Public
export const register = async (req, res, next) => {
    try {
        // Validation des champs obligatoire name,mail,password
        // Validation du mot de passe >6 caract
        // Vérifier si l'email existe déjà
        // Créer l'utilisateur
        // inutile de hasher le mot de passe, il le sera automatiquement par le middleware pre-save
        // Générer le token
        const token = generateToken(user._id);
        res.status(201).json({
            success: true,
            message: 'Inscription réussie',
            token,
            user: user.toJSON()
        });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(e => e.message);
            return res.status(400).json({
                success: false,
                message: 'Erreur de validation',
                errors: messages
            });
        }
        next(error);
    }
};

// @desc Connexion d'un utilisateur
// @route POST /api/auth/login
// @access Public
export const login = async (req, res, next) => {
    try {
        // Validation
        // Trouver l'utilisateur (inclure le password pour la comparaison)
        // Vérifier le mot de passe
        // Vérifier si le compte est actif
        // Générer le token
        const token = generateToken(user._id);
        res.status(200).json({
            success: true,
            message: 'Connexion réussie',
            token,
            user: user.toJSON()
        });
    } catch (error) {
        next(error);
    }
};

// @desc Obtenir le profil de l'utilisateur connecté
// @route GET /api/auth/me
// @access Private
export const getMe = async (req, res, next) => {
    //NB : req.user est ajouté par le middleware protect
};

// @desc Mettre à jour le profil
// @route PUT /api/auth/profile
// @access Private
export const updateProfile = async (req, res, next) => {
};

// @desc Changer le mot de passe
// @route PUT /api/auth/change-password
// @access Private
export const changePassword = async (req, res, next) => {
};

// @desc Déconnexion (côté client principalement)
// @route POST /api/auth/logout
// @access Private
export const logout = async (req, res, next) => {
    try {
        // Avec JWT, la déconnexion se fait principalement côté client
        // en supprimant le token du localStorage
        // On peut aussi implémenter une blacklist de tokens côté serveur
        res.status(200).json({
            success: true,
            message: 'Déconnexion réussie'
        });
    } catch (error) {
        next(error);
    }
};
