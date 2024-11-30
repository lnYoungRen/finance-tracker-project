import { useState } from 'react';
import { useEffect } from 'react';
import SpendingSummary from '../components/SpendingSummary';
import AddExpenseForm from '../components/AddExpenseForm';
import MonthDropdown from '../components/MonthDropdown';
import ExpenseList from '../components/ExpenseList';
import '../index.css';
import axios from 'axios';

const BACKEND = "https://finance-tracker-project.onrender.com";

function Expense() {
  //https://medium.com/@rahul.javatpoint12/simple-ways-to-get-the-current-month-in-javascript-9dad07c3fb90#:~:text=Using%20the%20getMonth()%20Method,call%20getMonth()%20on%20it.
  // if month is saved in local storage then use that, if not get the current month from user computer
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const currentMonth = new Date().toLocaleDateString('default', {month: 'long'});
    return localStorage.getItem('selectedMonth') || currentMonth;
  });
  // list of expense
  const [expenses, setExpenses] = useState([]);
  // total amount of the month
  const [totalSpending, setTotalSpending] = useState(0);
  const userId = localStorage.getItem("userId");
  // fetch expense and total spending when the month changes
  useEffect(() => {
    if(selectedMonth && userId){
      localStorage.setItem('selectedMonth', selectedMonth);
      axios
      .get(`${BACKEND}/users/${userId}/months/${selectedMonth}`)
      .then((res) => {
        setExpenses(res.data.expenses);
        let Total = 0;
        for(let expense of res.data.expenses){
          Total += expense.amount;
        }
        setTotalSpending(Total);
      })
      .catch((error) => console.error(error));
    }
  }, [selectedMonth, userId]);

  function addNewExpense(newExpense){
    const update = [...expenses, newExpense];
    setExpenses(update);
    setTotalSpending(totalSpending + newExpense.amount);
  }

  return (
    <div className="expense-page">
      <div className="header">
        <MonthDropdown selectedMonth={selectedMonth} onChange={setSelectedMonth} />
      </div>
      <div className="total-spending">
        <h2>Total Spending: ${totalSpending.toFixed(2)}</h2>
      </div>

      <SpendingSummary expenses={expenses} />
      {/* call back for adding new expense */}
      <AddExpenseForm onExpenseAdded={addNewExpense} userId={userId} selectedMonth={selectedMonth} />
      {/* onExpenseUpdate={setExpenses}  */}
      <ExpenseList expenses={expenses} userId={userId} selectedMonth={selectedMonth} setExpenses={setExpenses} />
    </div>
  );
}

export default Expense;
