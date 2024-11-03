// EXPRESS SERVER

const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());  // To parse JSON data from requests

// Sample route
app.get('/', (req, res) => {
  res.send('Personal Expense Tracker API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
