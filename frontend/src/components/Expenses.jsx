import React, { useState, useEffect } from "react";

function Expenses({ user }) {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${user.id}`);
      const data = await res.json();
      setExpenses(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Your Expenses</h2>
      <ul className="list-group mt-4">
        {expenses.map((expense) => (
          <li key={expense.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{expense.reason}</span>
            <span>${expense.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Expenses;
