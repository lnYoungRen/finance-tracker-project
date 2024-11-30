import { useState, useEffect } from 'react';
import axios from "axios";

const BACKEND = "https://finance-tracker-project.onrender.com";

function ExpenseList({ expenses, userId, selectedMonth, setExpenses}) {
  // track expense being edit
  const [editingId, setEditingId] = useState(null);
  // store data of the expense being edited
  const [editedExpense, setEditedExpense] = useState({});

  useEffect(() => {
    axios
      .get(`${BACKEND}/${userId}/months/${selectedMonth}`)
      .then((response) => {
        setExpenses(response.data.expenses); // Update the parent component's state with the latest data
      })
      .catch((error) => console.error(error));
  }, [expenses, userId, selectedMonth, setExpenses]);

  function handleEditClick(expense){
    // set edit id to expense being edit
    setEditingId(expense._id);
    // get the value
    setEditedExpense({ ...expense });
  };

  function handleSaveClick() {
    axios
      .patch(
        `${BACKEND}/users/${userId}/months/${selectedMonth}/expenses/${editingId}`, editedExpense
      )
      .then((res) => {
        const updatedExpenses = expenses.map((expense) => 
          expense._id === editingId ? res.data.expense : expense
        );
        setExpenses(updatedExpenses)
        setEditingId(null); // Exit editing mode
      })
      .catch((error) => {
        console.error('Error saving the expense:', error);
      });
  }
  
  function handleCancelClick() {
    setEditingId(null); // Exit editing mode
  }
  

  function handleDeleteClick(id) {
    axios
      .delete(
        `${BACKEND}/users/${userId}/months/${selectedMonth}/expenses/${id}`
      )
      .then(() => {
        const updatedExpenses = expenses.filter((expenses) => expenses._id !== id);
        setExpenses(updatedExpenses);
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting the expense:', error);
      });
  }
  

  // Viewing Template, get an expense and display it
  const ViewingTemplate = (expense) => {
    const { _id, amountType, date, amount, comment } = expense;
    return (
      <div className="expense-item" key={expense._id}>
        <div className="expense-content">
          <div className="expense-left">
            <span className="expense-category">{amountType}</span>
            <span className="expense-date">{new Date(date).toISOString().split('T')[0]}</span>
          </div>
          <div className="expense-right">
            <span className="expense-amount">${amount.toFixed(2)}</span>
            <span className="expense-comment">{comment}</span>
          </div>
        </div>
        <div className="expense-actions">
          <button className="edit-btn" onClick={() => handleEditClick(expense)}>
            Edit
          </button>
          <button onClick={() => handleDeleteClick(_id)}>Delete</button>
        </div>
      </div>
    );
  };

  // Editing Template
  const EditingTemplate = (expense) => {
    // const { _id, amountType, date, amount, comment } = expense;
    return (
      <div className="expense-item" key={expense._id}>
        <div className="expense-content">
          <div className="expense-left">
            <select
              value={editedExpense.amountType}
              onChange={(e) =>
                setEditedExpense({ ...editedExpense, amountType: e.target.value })
              }
            >
              <option value="" disabled hidden>Select Category</option>
              <option value="Other">Other</option>
              <option value="Living Expense">Living Expense</option>
              <option value="Housing">Housing</option>
            </select>
            <input
              type="date"
              value={new Date(expense.date).toISOString().split('T')[0]}
              onChange={(e) =>
                setEditedExpense({ ...editedExpense, date: e.target.value })
              }
            />
          </div>
          <div className="expense-right">
            <input
              type="number"
              value={editedExpense.amount}
              placeholder="new amount"
              onChange={(e) =>
                setEditedExpense({
                  ...editedExpense,
                  amount: parseFloat(e.target.value),
                })
              }
            />
            <input
              type="text"
              value={editedExpense.comment}
              placeholder="New comment"
              onChange={(e) =>
                setEditedExpense({ ...editedExpense, comment: e.target.value })
              }
            />
          </div>
        </div>
        <div className="expense-actions">
          <button className="edit-btn" onClick={handleSaveClick}>
            Save
          </button>
          <button onClick={handleCancelClick}>Cancel</button>
        </div>
      </div>
    );
  };

  return (
    <div className="expense-list">
      {expenses.map((expense) =>
      // if id equals to editing id then use the editing template to display that expense, other wise use view template to display
        expense._id === editingId ? EditingTemplate(expense) : ViewingTemplate(expense)
      )}
    </div>
  );
}

export default ExpenseList;
