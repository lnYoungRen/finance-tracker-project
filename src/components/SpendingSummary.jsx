import { useEffect, useState } from "react";
function SpendingSummary({ expenses }) {

  const [spendingSummary, setSpendingSummary] = useState({
    daily: '0.00',
    weekly: '0.00',
    monthly: '0.00',
  });
  
  useEffect(() => {
    const monthlySpending = expenses.reduce((total, expense) => total + expense.amount, 0);
    const dailySpending = (monthlySpending / 30).toFixed(2);
    const weeklySpending = (monthlySpending / 4).toFixed(2);

    setSpendingSummary({
      daily: dailySpending,
      weekly: weeklySpending,
      monthly: monthlySpending.toFixed(2),
    });
  }, [expenses]);

  return (
    <div className="spending-summary">
      <div className="summary-box">
        <p>Daily</p>
        <p>${spendingSummary.daily}</p>
      </div>
      <div className="summary-box">
        <p>Weekly</p>
        <p>${spendingSummary.weekly}</p>
      </div>
      <div className="summary-box">
        <p>Monthly</p>
        <p>${spendingSummary.monthly}</p>
      </div>
    </div>
  );
}

export default SpendingSummary;
