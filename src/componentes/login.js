import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import MainNavbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img from '../asserts/login.png';
import '../components/CSS/FormStyles.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const navigate = useNavigate();

  localStorage.setItem("userEmail", email);

  const validate = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validate();
    setErrors(formErrors);
    setTouched({ email: true, password: true });

    if (Object.keys(formErrors).length === 0) {
      axios.get(`http://localhost:4000/users?email=${email}&password=${password}`)
        .then(res => {
          if (res.data.length > 0) {
            alert("Login successful!");
            navigate('/dashboard');
          } else {
            alert("Invalid email or password");
          }
        })
        .catch(err => console.error("Error connecting to server: ", err));
    }
  };

  const handleBlur = (field) => () => {
    setTouched({ ...touched, [field]: true });
    setErrors(validate());
  };

  return (
    <>
      <MainNavbar fixed="top" />
      <div className="vh-100 d-flex justify-content-center align-items-center login-page">
        <Card className="login-card shadow p-4" style={{ maxWidth: '900px', width: '100%' }}>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="mb-4 fw-bold text-center">Patients Login</h2>
              <Form noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={handleBlur('email')}
                    isInvalid={touched.email && !!errors.email}
                    isValid={touched.email && !errors.email}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={handleBlur('password')}
                    isInvalid={touched.password && !!errors.password}
                    isValid={touched.password && !errors.password}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-2">Login</Button>

                <div className="d-flex justify-content-between">
                  <Button variant="link" className="p-0" onClick={() => navigate('/updatepassword')}>
                    Forgot Password?
                  </Button>
                  <Button variant="link" className="p-0" onClick={() => navigate('/signup')}>
                    New User? Register
                  </Button>
                </div>
              </Form>
            </Col>

            <Col md={6} className="text-center d-none d-md-block">
              <img
                src={img}
                alt="Login Illustration"
                className="login-image"
                style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }}
              />
            </Col>
          </Row>
        </Card>
      </div>
    </>
  );
}

export default Login;
