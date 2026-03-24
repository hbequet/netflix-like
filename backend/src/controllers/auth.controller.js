import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js';

// @desc Inscription d'un nouvel utilisateur
// @route POST /api/auth/register
// @access Public
export const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez fournir un nom, un email et un mot de passe'
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Le mot de passe doit contenir au moins 6 caractères'
            });
        }

        const userExists = await User.findByEmail(email);
        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'Cet email est déjà utilisé'
            });
        }

        const user = await User.create({
            name,
            email,
            password
        });

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
        const { email, password } = req.body;

        // Validation
        console.log("Body reçu:", req.body);

        if (!email || !password) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Identifiants invalides'
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Identifiants invalides'
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                success: false,
                message: 'Ce compte a été désactivé. Veuillez contacter le support.'
            });
        }

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
    try {
        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }

        res.status(200).json({
            success: true,
            user: user.toJSON()
        });
    } catch (error) {
        next(error);
    }
};

// @desc Mettre à jour le profil
// @route PUT /api/auth/profile
// @access Private
export const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'Utilisateur non trouvé'
            });
        }

        if (name) user.name = name;
        if (email) user.email = email;

        const updatedUser = await user.save();

        res.status(200).json({
            success: true,
            message: 'Profil mis à jour avec succès',
            user: updatedUser.toJSON()
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'Cet email est déjà utilisé par un autre compte'
            });
        }
        next(error);
    }
};

// @desc Changer le mot de passe
// @route PUT /api/auth/change-password
// @access Private
export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez fournir le mot de passe actuel et le nouveau'
            });
        }

        const user = await User.findById(req.user._id).select('+password');

        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Le mot de passe actuel est incorrect'
            });
        }

        user.password = newPassword;
        await user.save();

        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: 'Mot de passe modifié avec succès',
            token
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

// @desc Déconnexion (côté client principalement)
// @route POST /api/auth/logout
// @access Private
export const logout = async (req, res, next) => {
    try {
        res.status(200).json({
            success: true,
            message: 'Déconnexion réussie.'
        });
    } catch (error) {
        next(error);
    }
};