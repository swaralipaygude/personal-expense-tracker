import React, { useState, useEffect } from 'react';
import AddExpense from './components/AddExpense';
import ExpenseList from './components/ExpenseList';
import axios from 'axios';
import './App.css';

function App() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch expenses from the backend
    axios.get('http://localhost:3000/expenses')
      .then(res => setExpenses(res.data))
      .catch(err => console.error("Error fetching expenses", err));
  }, []);

  const addNewExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  return (
    <div className="App">
      <h1 className="title">💸 Personal Expense Tracker</h1>
      <AddExpense addNewExpense={addNewExpense} />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
    </div>
  );
}

export default App;
