import { useLocation } from "react-router-dom";
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FiArrowDownCircle, FiArrowUpCircle } from "react-icons/fi";
import "../styles/history.css";

export default function TransactionHistory() {
  const location = useLocation();
  const { transactionHistory } = location.state || [];

  return (
    <Container className="transaction-history-container">
      <h2 className="text-center my-4">Transaction History</h2>
      <div className="timeline">
        {transactionHistory.map((transaction, index) => (
          <div
            key={index}
            className={`timeline-item ${
              index % 1 === 0 ? "timeline-item-left" : "timeline-item-right"
            }`}
          >
            <div className="timeline-icon">
              <FiArrowDownCircle
                className={
                  transaction.amount > 0 ? "income-icon" : "expense-icon"
                }
              />
            </div>
            <div className="timeline-content shadow">
              <h5>{transaction.reason}</h5>
              <p className="transaction-date">
                {new Date().toLocaleDateString()} {/* Placeholder for date */}
              </p>
              <p className="transaction-amount">
                ₹{transaction.amount.toLocaleString("en-IN")}
              </p>
              <Button variant="outline-primary" size="sm">
                Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
