import React, { useState } from 'react';
import axios from 'axios';
import './ExpenseList.css';

function ExpenseList({ expenses, setExpenses }) {
  const [editingExpense, setEditingExpense] = useState(null);
  const [view, setView] = useState('grid'); // Default is 'grid'

  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
  });

  const handleEdit = (expense) => {
    setEditingExpense(expense._id);
    setFormData({
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    axios
      .put(`http://localhost:3000/expenses/${editingExpense}`, formData)
      .then((res) => {
        const updatedExpenses = expenses.map((expense) =>
          expense._id === editingExpense ? res.data : expense
        );
        setExpenses(updatedExpenses);
        setEditingExpense(null);
        setFormData({ description: '', amount: '', category: '' });
      })
      .catch((err) => console.error("Error updating expense", err));
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3000/expenses/${id}`)
      .then(() => {
        const filteredExpenses = expenses.filter((expense) => expense._id !== id);
        setExpenses(filteredExpenses);
      })
      .catch((err) => console.error("Error deleting expense", err));
  };

  return (
    
    <div className="expense-list-parent-div"> 

    <h2>Expense List</h2>
        <button onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
        {view === 'grid' ? 'Switch to List View' : 'Switch to Grid View'}
        </button>
    
    <div className="expense-list">
        
      {expenses.length === 0 ? (
        <p>No expenses to display.</p>
      ) : (
        
        expenses.map((expense) => (
            <div key={expense._id} className={`expense-card ${view}`}>

            <h3>{expense.description}</h3>
            <p>💲 {expense.amount}</p>
            <p>📅 {new Date(expense.date).toLocaleDateString()}</p>
            <p>Category: {expense.category || 'N/A'}</p>
            <button onClick={() => handleEdit(expense)} className="edit-btn">✏️ Edit</button>
            <span className="button-space"></span>
            <button onClick={() => handleDelete(expense._id)} className="delete-btn">🗑️ Delete</button>
          </div>
        ))
      )}
      {editingExpense && (
        <form onSubmit={handleUpdate} className="expense-form">
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Expense Description"
            required
          />
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            placeholder="Amount"
            required
          />
          <select name="category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })}>
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
          <button type="submit">Update Expense</button>
        </form>
      )}
    </div>

    </div>
  );
}

export default ExpenseList;
