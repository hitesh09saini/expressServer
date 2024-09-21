const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { resError, resSuccess } = require('valid-response-hiteshfolio');

// Validation middleware for registration
const registerValidation = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('role').optional().isString().withMessage('Role must be a string'),
];

// Validation middleware for login
const loginValidation = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
];

// Validation middleware for forgot password
const forgotPasswordValidation = [
    body('email').isEmail().withMessage('Valid email is required'),
];

// Validation middleware for reset password
const resetPasswordValidation = [
    body('resetToken').notEmpty().withMessage('Reset token is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

// Register a new user
exports.register = [
    registerValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resError(res, 400, errors.array());
        }

        const { name, email, password, role } = req.body;
        const avatarPath = req.file ? `/avatar/${req.file.filename}` : '';

        try {
            const userExists = await User.findOne({ email });
            if (userExists) {
                return resError(res, 400, 'User already exists');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({
                name,
                email,
                password: hashedPassword,
                role,
                image: avatarPath,
            });

            await user.save();
            return resSuccess(res, 201, 'User registered successfully', user);
        } catch (error) {
            return resError(res, 400, error.message);
        }
    },
];

// User login
exports.login = [
    loginValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resError(res, 400, errors.array());
        }

        const { email, password } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return resError(res, 400, 'Invalid email or password');
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return resError(res, 400, 'Invalid email or password');
            }

            const token = user.generateAuthToken();
            return resSuccess(res, 200, 'Login successful', { token });
        } catch (error) {
            return resError(res, 400, error.message);
        }
    },
];

// Forgot password
exports.forgotPassword = [
    forgotPasswordValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resError(res, 400, errors.array());
        }

        const { email } = req.body;

        try {
            const user = await User.findOne({ email });
            if (!user) {
                return resError(res, 400, 'User not found');
            }

            const resetToken = crypto.randomBytes(32).toString('hex');
            user.resetToken = resetToken;
            user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
            await user.save();

            // Send the token via email (implement your email sending logic)
            // await sendEmail(user.email, resetToken);

            return resSuccess(res, 200, 'Reset token sent to email');
        } catch (error) {
            return resError(res, 400, error.message);
        }
    },
];

// Reset password
exports.resetPassword = [
    resetPasswordValidation,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return resError(res, 400, errors.array());
        }

        const { resetToken, newPassword } = req.body;

        try {
            const user = await User.findOne({
                resetToken,
                resetTokenExpiry: { $gt: Date.now() },
            });

            if (!user) {
                return resError(res, 400, 'Invalid or expired token');
            }

            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            user.resetToken = undefined;
            user.resetTokenExpiry = undefined;
            await user.save();

            return resSuccess(res, 200, 'Password has been reset successfully');
        } catch (error) {
            return resError(res, 400, error.message);
        }
    },
];
