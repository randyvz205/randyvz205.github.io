// This script sets up the server to handle the feedback submission

// Import necessary modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Create an Express application
const app = express();

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Connect to the MongoDB database
mongoose.connect('mongodb://localhost:27017/feedback', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema for the feedback
const feedbackSchema = new mongoose.Schema({
    name: String,
    email: String,
    feedback: String,
    date: { type: Date, default: Date.now }
});

// Create a model from the schema
const Feedback = mongoose.model('Feedback', feedbackSchema);

// Endpoint to handle feedback submission
app.post('/submit-feedback', async (req, res) => {
    try {
        const feedback = new Feedback(req.body); // Create a new feedback document
        await feedback.save(); // Save the feedback document to the database
        res.status(200).send('Feedback submitted successfully'); // Send a success response
    } catch (error) {
        console.error('Error saving feedback:', error);
        res.status(500).send('Failed to submit feedback'); // Send an error response
    }
});

// Start the server and listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});