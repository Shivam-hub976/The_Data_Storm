const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// POST /posts - create a new document in atlas
router.post('/', async (req, res) => {
    try {
        //Post.create() takes the JSON body and saves it directly to the database
        // If the body is missing a title or content, the Mongoose schema will throw an error and the catch block will handle it

        const newPost = await Post.create(req.body);

        res.status(201).json({
            success: true,
            data: newPost
        });
    } catch (error) {
        // This catches mongoose validation errors (like missing title or content) and sends a 400 Bad Request response
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;