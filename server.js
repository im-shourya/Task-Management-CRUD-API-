// Import required packages
require('dotenv').config(); 
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();


app.use(bodyParser.json());



// Import API routes
const taskRoutes = require('./routes/tasks');
app.use('/api/tasks', taskRoutes);


const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

// --- Database Connection ---
if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in the .env file.');
    process.exit(1);
}


const connectionOptions = {
    serverSelectionTimeoutMS: 60000, 
    socketTimeoutMS: 60000,          
};


mongoose.connect(MONGODB_URI, connectionOptions)
.then(() => {
    console.log('Successfully connected to MongoDB.');
    // Start the server only after a successful database connection
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch(err => {
    console.error('Database connection error:', err);
    process.exit(1);
});


// This will now serve your frontend application
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

