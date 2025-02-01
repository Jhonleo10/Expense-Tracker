import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css'; 

const Profile = () => {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState(0);
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setName(user.name);
      setSalary(user.salary);
      setPhone(user.phone);
    }
    setLoading(false); 
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

   
    const userProfile = { name, salary, phone };
    localStorage.setItem('user', JSON.stringify(userProfile));

   
    navigate('/dashboard');
  };

  
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-page">
      <Container className="d-flex justify-content-center align-items-center min-vh-100">
        <Row className="w-100">
          <Col md={6} sm={12} className="profile-form-container">
            <div className="form-wrapper">
              <h2>Edit Profile</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formName" className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-input"
                  />
                </Form.Group>

                <Form.Group controlId="formSalary" className="mb-3">
                  <Form.Label>Salary</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter your salary"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="form-input"
                  />
                </Form.Group>

                <Form.Group controlId="formPhone" className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="submit-btn">
                  Save Profile
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Profile;

