import React, { useState } from 'react';
import axios from 'axios';
import './AddExpense.css';

function AddExpense({ addNewExpense }) {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;
  
    axios.post('http://localhost:3000/expenses', formData)
      .then(res => {
        addNewExpense(res.data);
        setFormData({ description: '', amount: '', category: '' });
      })
      .catch(err => console.error("Error adding expense", err));
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Expense Description"
        required
      />
      <input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="Amount"
        required
      />
      <select name="category" value={formData.category} onChange={handleChange}>
        <option value="">Select Category</option>
        <option value="Food & Drinks">🍔 Food & Drinks</option>
        <option value="Transport">🚗 Transport</option>
        <option value="Entertainment">🎬 Entertainment</option>
        <option value="Shopping">🛍️ Shopping</option>
        <option value="Health">🏥 Health</option>
        <option value="Travel">✈️ Travel</option>
        <option value="Utilities">💡 Utilities</option>
        <option value="Rent">🏠 Rent</option>
        <option value="Education">📚 Education</option>
        <option value="Savings">💰 Savings</option>
        <option value="Other">💡 Other</option>
      </select>
      <button type="submit">Add Expense</button>
    </form>
  );
}

export default AddExpense;
