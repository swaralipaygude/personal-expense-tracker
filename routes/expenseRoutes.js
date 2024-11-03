
const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); 

// CREATE - Add a new expense
router.post('/expenses', async (req, res) => {
    // console.log('Request Body:', req.body);

  const { description, amount, category } = req.body;
  try {
    const newExpense = new Expense({ description, amount, category });
    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (error) {
    res.status(400).json({ message: 'Error creating expense', error });
  }
});

// READ - Get all expenses
router.get('/expenses', async (req, res) => {
  try {
    const expenses = await Expense.find({});
    res.status(200).json(expenses);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching expenses', error });
  }
});

// READ - Get a single expense by ID
router.get('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching expense', error });
  }
});

// UPDATE - Update an expense by ID
router.put('/expenses/:id', async (req, res) => {
  const { description, amount, category } = req.body;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { description, amount, category },
      { new: true }  // Return the updated expense
    );
    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json(updatedExpense);
  } catch (error) {
    res.status(400).json({ message: 'Error updating expense', error });
  }
});

// DELETE - Delete an expense by ID
router.delete('/expenses/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error deleting expense', error });
  }
});

module.exports = router;
