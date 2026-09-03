// Force Node to use Google DNS for SRV lookups (bypasses ISP blocking)
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());
// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Mount the post routes
const postRoutes = require('./routes/postRoutes');
app.use('/posts', postRoutes);

// Mount the user routes
const userRoutes = require('./routes/userRoutes');
app.use('/users', userRoutes);

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        console.log('Successfully connected to MongoDB Atlas!');

        // Start the Server only after the DB connects
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection failed:', error.message);
    });