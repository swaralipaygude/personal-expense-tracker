# Personal Expense Tracker

A simple MERN stack web application to track your daily expenses. This app allows users to add, view, edit, and delete expenses, with the data stored in a MongoDB database.

## Features

- Add new expenses with a description, amount, date, and category.
- View a list of all expenses.
- Edit or delete existing expenses.
- Switch between grid and list views of expenses.
- **Future Improvements**:
  - UI enhancements
  - Filter expenses by date, category, and amount
  - Sort expenses by date and amount
  - Group expenses by month/year or category
  - Upload receipt images for each expense

## Prerequisites

- Node.js
- MongoDB installed locally

## Getting Started

Follow these instructions to get a copy of the project running on your local machine.

### Clone the Repository

bash:
git clone https://github.com/YourUsername/personal-expense-tracker.git
cd personal-expense-tracker

Install Dependencies:

npm install
cd client
npm install
cd ..

### Setting Up MongoDB

Install MongoDB locally if you haven't already. Follow the instructions for your OS [here](https://www.mongodb.com/docs/manual/installation/).
Once MongoDB is installed and running, create a database called expensesDB (or use a different name of your choice).
Configure .env
You need to create a .env file in the root directory with the following content:
MONGODB_URI=mongodb://localhost:27017/expensesDB
PORT=3000

MONGODB_URI should be your MongoDB connection string.
PORT is the port number where your Node.js server will run. If you change this, update the frontend's API calls to reflect the new port.

### Running the App
Start the backend server:
npm run start

Start the frontend:
cd client
npm start

Visit http://localhost:3000 to use the app.

#### Example Test Data
For local testing, you can insert example data into your MongoDB database. Run the following in the MongoDB shell:
use expensesDB
db.expenses.insertMany([
  {
    description: "Groceries",
    amount: 50,
    category: "Food & Drinks",
    date: new Date()
  },
  {
    description: "Uber Ride",
    amount: 15,
    category: "Transport",
    date: new Date()
  }
])

### Folder Structure

personal-expense-tracker/
├── client/                  # React frontend
├── models/                  # Mongoose models
├── routes/                  # API routes for CRUD operations
├── server.js                # Entry point for Node.js server
├── .env                     # Environment variables
├── package.json             # Project metadata and dependencies
└── README.md                # Documentation
