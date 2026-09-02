const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Prevents multiple users from registering with the same email
        lowercase: true,
        trim: true
    }
}, {
    //Mongoose automatically adds createdAt and updatedAt field when timestamps is set to true
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);