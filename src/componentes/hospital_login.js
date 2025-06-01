import React, { useState } from "react";
import { Form, Button, Container, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HospitalLogin = () => {
  const [hospital, setHospital] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const hospitals = [
    "Manipal Hospital",
    "Fortis Hospital",
    "Apollo Hospital",
    "Narayana Health",
  ];

  const getHospitalRoute = (hospitalName) => {
    switch (hospitalName) {
      case "Manipal Hospital":
        return "/hospital";
      case "Apollo Hospital":
        return "/apollohospital";
      case "Narayana Health":
        return "/narayanahospital"; // Add this route in App.js if missing
      case "Fortis Hospital":
        return "/forticshospital";
      default:
        return "/";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/hospitalStaffLogins");
      const users = await res.json();

      const user = users.find(
        (u) =>
          u.hospital === hospital &&
          u.userId === userId &&
          u.password === password
      );

      if (user) {
        setMessage("Login successful! Redirecting...");
        const route = getHospitalRoute(hospital);
        setTimeout(() => {
          navigate(route);
        }, 500);
      } else {
        setMessage("Invalid credentials!");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error connecting to server.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card style={{ maxWidth: "400px", width: "100%" }} className="p-4 shadow">
        <h3 className="text-center mb-4">Hospital Staff Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="hospitalSelect" className="mb-3">
            <Form.Label>Select Hospital</Form.Label>
            <Form.Select
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              required
            >
              <option value="" disabled>
                -- Choose Hospital --
              </option>
              {hospitals.map((h, i) => (
                <option key={i} value={h}>
                  {h}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="userId" className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Login
          </Button>
        </Form>
        {message && <p className="mt-3 text-center">{message}</p>}
      </Card>
    </Container>
  );
};

export default HospitalLogin;
