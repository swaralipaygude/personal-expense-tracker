// EXPRESS SERVER

require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const expenseRoutes = require('./routes/expenseRoutes');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());  // To parse JSON data from requests
app.use(cors()); // Enable CORS for all routes
// app.use(cors({
//   origin: 'http://localhost:3000', // frontend URL
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true
// }));

app.get('/', (req, res) => {
  res.send('Personal Expense Tracker API is running');
});

// MongoDB connection 
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, {

}).then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/', expenseRoutes);



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
