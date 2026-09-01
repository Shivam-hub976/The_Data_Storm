const mongoose = require('mongoose');

// The Blueprint (Schema)
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true //Automatically strips whitespace from the ends
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now //Automates the timestamp so the frontend doesn't have to send it
    }
});

// Compile the Schema into a Model and export it
module.exports = mongoose.model('Post', postSchema);