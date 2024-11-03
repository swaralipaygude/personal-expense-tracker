// EXPRESS SERVER

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());  // To parse JSON data from requests

app.get('/', (req, res) => {
  res.send('Personal Expense Tracker API is running');
});

// MongoDB connection 
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {

}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api', expenseRoutes);  // All expense routes are prefixed with /api



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
