const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const UserInfo = require('../models/userInfo'); // Import the model
const userAuthentication = require('../models/userAuthentication');
const crypto = require('crypto');

// Validation middleware
const registerValidation = [
    body('user_name').trim().notEmpty().withMessage('Username is required'),
    body('email')
        .isEmail().withMessage('Invalid email address')
        .custom(async (email) => {
            const existingUser = await UserInfo.findOne({ email });
            if (existingUser) {
                throw new Error('Email already registered');
            }
            return true;
        }),
    body('user_type')
        .isIn(['customer', 'seller'])
        .withMessage('User type must be either customer or seller'),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters'),
    body('joined_date').optional().isISO8601().withMessage('Invalid date format'),
    body('location').custom((value, { req }) => {
        if (req.body.user_type === 'seller' && (!value || value.trim() === '')) {
          throw new Error('Location is required for sellers');
        }
        return true;
      }).trim(),
];

// Registration route
router.post('/register', registerValidation, async (req, res) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { user_name, email, user_type, password, location } = req.body;

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new UserInfo({
            user_name,
            email,
            user_type,
            password: hashedPassword,
            joined_date: new Date(),
            location
        });

        // Save user to database
        await newUser.save();

        // Return success without password
        const userResponse = newUser.toObject();
        delete userResponse.password;
        
        res.status(201).json({
            message: 'User registered successfully',
            user: userResponse
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Registration failed', message: error.message });
    }
});

// Login route
router.post('/login', [
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').notEmpty().withMessage('Password is required')
], async (req, res) => {
    console.log('Login route hit');
    try {
        // Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Find user by email
        const user = await UserInfo.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare password
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate unique token using crypto
        const uniqueToken = crypto.randomBytes(32).toString('hex');
        

        // Generate JWT token with unique crypto token
        const token = jwt.sign(
            { 
                userId: user._id, 
                email: user.email,
                userType: user.user_type,
                uniqueToken: uniqueToken // Include crypto-generated token
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Save authentication record with crypto token
        const authRecord = new userAuthentication({
            email: user.email,
            user_type: user.user_type,
            token: uniqueToken, // Save the crypto-generated token
            login_date: new Date()
        });
        await authRecord.save();

        // Clean user data for response
        const userResponse = user.toObject();
        delete userResponse.password;

        // Set token in authorization header
        //res.header('Authorization', `Bearer ${token}`);

        // Send response
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userResponse,
            token: uniqueToken
        });

        console.log(`User logged in: ${email}`);

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            error: 'Login failed', 
            message: error.message 
        });
    }
});

// Logout route
router.post('/logout', async (req, res) => {
    try {
        const token = req.headers.authorization;
        
        if (!token) {
            return res.status(401).json({ error: 'No token provided' });
        }

        // Delete the authentication record
        const result = await userAuthentication.deleteOne({ token });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Session not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });

    } catch (error) {
        console.error('Logout error:', error);
        res.status(500).json({
            success: false,
            error: 'Logout failed',
            message: error.message
        });
    }
});



module.exports = router;