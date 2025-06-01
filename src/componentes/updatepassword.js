import React, { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import MainNavbar from './Navbar';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:4000/users?email=${email}`)
      .then(res => {
        if (res.data.length > 0) {
          const userId = res.data[0].id;
          axios.patch(`http://localhost:4000/users/${userId}`, { password: newPassword })
            .then(() => {
              alert('Password updated successfully!');
              navigate('/');
            })
            .catch(err => console.error("Error updating password: ", err));
        } else {
          alert("User not found with this email");
        }
      })
      .catch(err => console.error("Error connecting to server: ", err));
  };

  return (
    <>
      <MainNavbar fixed="top" />
      <div className="vh-100 d-flex justify-content-center align-items-center login-page">
        <Card className="login-card shadow p-4" style={{ maxWidth: '500px', width: '100%' }}>
          <h2 className="mb-4 fw-bold text-center">Reset Password</h2>
          <Form onSubmit={handleReset}>
            <Form.Group className="mb-3" controlId="resetEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">Update Password</Button>
          </Form>
        </Card>
      </div>
    </>
  );
}

export default ForgotPassword;
