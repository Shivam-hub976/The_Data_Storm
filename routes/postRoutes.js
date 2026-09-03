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

// GET /posts - retrieve all documents from atlas
// Author details
router.get('/', async (req, res) => {
    try{
        //Post.find() searches the database. Passing an empty object {} means "find everything"
        // .populate() reaches into the User collection and replaces the raw id with the actual user object.
        const posts = await Post.find({})
            .populate('authorId', 'name email'); // The second argument limits the field we retrieve from the author document to just name and email, excluding the _id field.

        res.status(200).json({
            success: true,
            count: posts.length,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server Error : Unable to fetch posts'
        });
    }
});

// GET /posts/top/recent - Aggregation: top 3 Most recent posts
router.get('/top/recent', async (req, res) => {
    try {
        // .find({}) gets everything
        // .sort({ createdAt: -1}) orders them by time. -1 means desecending newest first
        // .limit(3) slices off everything after the first 3 results
        // .populate() hydrates the author details just like our main GET route
        const topPosts = await Post.find({})
            .sort({ createdAt: -1 })
            .limit(3)
            .populate('authorId', 'name email');

        res.status(200).json({
            success: true,
            count: topPosts.length,
            data: topPosts
        });    
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server Error : Unable to fetch top posts'
            });
        }
});

// DELETE /posts/:id - delete a single document by its ID
router.delete('/:id', async (req, res) => {
    try {
        // req.params.id extracts the dynamic ID from the URL string
        const deletedPost = await Post.findByIdAndDelete(req.params.id);

        // If the database searches but cannot find a document with that ID, it returns null
        // we catch that null and return a 404 Not Found Status
        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                error: 'Post not found. It may have already been deleted.'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully',
            data: {} // Empty object returned when data deleted.
        });
     } catch(error) {
            // If the ID is improperly formatted like too short, mongoose throws a cast error.
            res.status(400).json({
                success: false,
                error: 'Invalid ID format'
            });
        
    }
});

module.exports = router;