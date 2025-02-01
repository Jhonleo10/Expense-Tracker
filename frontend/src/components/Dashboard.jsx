import React, { useState, useEffect } from "react";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css"; 

const Dashboard = () => {
  const navigate = useNavigate();

  
  const [name, setName] = useState("");
  const [totalSalary, setTotalSalary] = useState(0);
  const [initialSalary, setInitialSalary] = useState(0); // To calculate percentage
  const [totalExpense, setTotalExpense] = useState(0);
  const [expenseReason, setExpenseReason] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [transactionHistory, setTransactionHistory] = useState([]);

  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // Assuming user data is saved in localStorage
    if (user) {
      setName(user.name);
      setInitialSalary(user.salary);
      setTotalSalary(user.salary);
    }

    
    const savedTotalSalary = localStorage.getItem("totalSalary");
    const savedTotalExpense = localStorage.getItem("totalExpense");
    const savedTransactionHistory =
      JSON.parse(localStorage.getItem("transactionHistory")) || [];

    if (savedTotalSalary) {
      setTotalSalary(parseFloat(savedTotalSalary));
    }

    if (savedTotalExpense) {
      setTotalExpense(parseFloat(savedTotalExpense));
    }

    setTransactionHistory(savedTransactionHistory);
  }, []);

  const handleAddExpense = () => {
    if (expenseReason && expenseAmount > 0) {
      
      const newTotalExpense = totalExpense + parseFloat(expenseAmount);
      const newTotalSalary = totalSalary - newTotalExpense;
      setTotalExpense(newTotalExpense);
      setTotalSalary(newTotalSalary);
      const updatedTransactionHistory = [
        ...transactionHistory,
        { reason: expenseReason, amount: expenseAmount },
      ];
      setTransactionHistory(updatedTransactionHistory);
  
      
      localStorage.setItem("totalSalary", newTotalSalary.toFixed(2));
      localStorage.setItem("totalExpense", newTotalExpense.toFixed(2));
      localStorage.setItem("transactionHistory", JSON.stringify(updatedTransactionHistory));
      setExpenseReason("");
      setExpenseAmount(0);
    } else {
      alert("Please enter a valid reason and amount greater than 0");
    }
  };
  

  const handleViewHistory = () => {
    navigate("/history", { state: { transactionHistory } });
  };

  const handleLogout = () => {
  
    localStorage.removeItem("user");
    localStorage.removeItem("totalSalary");
    localStorage.removeItem("totalExpense");
    localStorage.removeItem("transactionHistory");
    navigate("/login");
  };

  const calculatePercentage = () => {
    if (initialSalary === 0) return 100; 
    return Math.max((totalSalary / initialSalary) * 100, 0); 
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  return (
    <div className="dashboard">
      <div className="logout-button">
        <Button variant="danger" onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <Row className="my-3 justify-content-center ">
        <Col md={6} sm={12} className="text-center">
          <Card className="shadow-sm zoom-card bg-secondary">
            <Card.Body className="text-white">
              <h2 className="text-white">Welcome, {name}</h2>
              <h4>Salary: {formatCurrency(initialSalary)}</h4>
              <Button variant="dark" onClick={handleViewHistory}>
                View Expense History
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="progress-section my-4">
        <div className="circular-progress-container">
          <div className="circular-progress">
            <svg className="progress-ring" viewBox="0 0 100 100">
              <circle
                className="progress-ring__circle"
                cx="50"
                cy="50"
                r="45"
                strokeDasharray="283"
                strokeDashoffset={(283 * (100 - calculatePercentage())) / 100}
              />
            </svg>
            <div className="progress-text">
              {formatCurrency(totalSalary)}
              <small> Remaining</small>
            </div>
          </div>
        </div>
        <h3 className="text-center">Total Expense: {totalExpense}</h3>
      </div>

      <Row className="mt-4 justify-content-center">
        <Col md={6} sm={12}>
          <Card className="shadow-sm zoom-card bg-secondary">
            <Card.Body className="text-white" >
              <h4>Add Expense</h4>
              <Form>
                <Form.Group controlId="expenseReason">
                  <Form.Label>Expense Reason</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter reason"
                    value={expenseReason}
                    onChange={(e) => setExpenseReason(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="expenseAmount">
                  <Form.Label>Expense Amount</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter amount"
                    value={expenseAmount}
                    onChange={(e) => setExpenseAmount(e.target.value)}
                  />
                </Form.Group>

                <Button variant="dark" onClick={handleAddExpense} className="mt-3">
                  Add Expense
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
