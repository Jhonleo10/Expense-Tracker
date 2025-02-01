import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Container,Row, Col,Card,Form,Button,} from "react-bootstrap";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        formData
      );

      if (response.data.message === "Registration successful.") {
      
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100">
          
          <Col
            md={6}
            className="d-none d-md-flex align-items-center justify-content-center"
          >
            <div className="brand-section">
              <h1 className="brand-title">Welcome to Expense Tracker</h1>
              <p className="brand-subtitle">Budgeting Yourself......!</p>
            </div>
          </Col>

          
          <Col md={6} sm={12}>
            <Card className="p-4 login-card">
              <h2 className="text-center mb-4 text-light">Register</h2>
              <Form onSubmit={handleSubmit}>
                
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

              
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                
                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                
                {error && <div className="text-danger mb-3">{error}</div>}

                
                <Button
                  type="submit"
                  disabled={loading}
                  variant="primary"
                  className="w-100"
                >
                  {loading ? "Registering..." : "Register"}
                </Button>
              </Form>

              
              <p className="text-center mt-3">
                Have an account? <a href="/login">Login here</a>
              </p>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
