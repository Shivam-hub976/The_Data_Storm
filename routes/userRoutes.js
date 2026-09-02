const express = require('express');
const router = express.Router();
const User = require('../models/User');

// POST /users - create a new user to generate an ObjectId for the authorId field in Post.js
router.post('/', async (req, res) => {
    try {
        // User.create() validates the request body against the User schema and saves it to the database
        const newUser = await User.create(req.body);

        res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (error) {
        // This will catch missing fields , or if you try to register an email that already exists in the database
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;