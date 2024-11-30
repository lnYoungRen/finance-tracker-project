import { useState } from "react";
import axios from "axios";

const BACKEND = "http://localhost:5001";

function AddExpenseForm(props) {
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [comment, setComment] = useState('');
    const [date, setDate] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      try{
        const newExpense = {
          amount: Number(amount),
          comment, 
          date, 
          amountType: category
        };
        const res = await axios.post(`${BACKEND}/users/${props.userId}/months/${props.selectedMonth}/expenses`, newExpense);

        if(res.status===201){
          props.onExpenseAdded(res.data.expense);
          setAmount("");
          setComment("");
          setDate("");
          setCategory("");
        }
      } catch(error){
        console.error("error adding", error);
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="add-expense-form">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
          <option value="" disabled>Select Category</option>
          <option value="Others">Others</option>
          <option value="Living Expenses">Living Expense</option>
          <option value="Housing">Housing</option>
        </select>
        <input
          type="text"
          placeholder="Add comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <button type="submit">Add Expense</button>
      </form>
    );
}
  
export default AddExpenseForm;