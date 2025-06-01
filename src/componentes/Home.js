import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css"; // Bootstrap icons CSS
import { Navbar, Nav, Container, Card, Button, Row, Col } from "react-bootstrap";
import { EnvelopeFill, TelephoneFill, GeoAltFill } from "react-bootstrap-icons";
import { useNavigate, Link } from "react-router-dom";
import "../components/CSS/home.css";
import img1 from '../asserts/clock.png';
import img2 from '../asserts/doctor.png';
import img3 from '../asserts/health.png';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="brand-logo">MediCare Hub</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="#about">About</Nav.Link>
              <Nav.Link as={Link} to="#contact">Contact</Nav.Link>

              {/* Navbar buttons styled as Nav.Link */}
              <Nav.Link as={Link} to="/login" className="btn btn-outline-light ms-2">
                Login
              </Nav.Link>
              <Nav.Link
                onClick={() => navigate("/Hospitallogin")}
                className="btn btn-outline-light ms-2"
                style={{ cursor: "pointer" }}
              >
                Hospital Login
              </Nav.Link>
              <Nav.Link as={Link} to="/login" className="btn btn-light ms-2">
                Sign Up
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <div className="hero-section d-flex flex-column justify-content-center align-items-center text-white text-center" style={{ minHeight: '60vh' }}>
        <h1 className="display-5 fw-bold">Welcome to MediCare Hub</h1>
        <p className="lead">Your Trusted Healthcare Booking Partner</p>
        <Button variant="light" size="lg" onClick={() => navigate("/login")}>
          Book Appointment
        </Button>
      </div>

      {/* About Section */}
      <Container id="about" className="my-5">
        <h2 className="section-heading">About Us</h2>
        <p className="section-description">
          MediCare Hub is an online healthcare booking platform where patients can find the best doctors and book appointments at their convenience. Our goal is to provide seamless, secure, and easy-to-use booking services for hospitals and clinics.
        </p>
      </Container>

      {/* Services / Cards Section */}
      <Container id="services" className="my-5">
        <h2 className="section-heading">Our Services</h2>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="service-card">
              <Card.Img variant="top" src={img1} />
              <Card.Body>
                <Card.Title>24/7 Emergency Care</Card.Title>
                <Card.Text>
                  Immediate care available anytime, ensuring your safety and health come first.
                </Card.Text>
                <Button variant="secondary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="service-card">
              <Card.Img variant="top" src={img2} />
              <Card.Body>
                <Card.Title>Online Doctor Consultation</Card.Title>
                <Card.Text>
                  Book video consultations with experienced doctors from the comfort of your home.
                </Card.Text>
                <Button variant="secondary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card className="service-card small">
              <Card.Img variant="top" src={img3} />
              <Card.Body>
                <Card.Title>Health Packages</Card.Title>
                <Card.Text>
                  Affordable health check-up packages for you and your family’s well-being.
                </Card.Text>
                <Button variant="secondary">Learn More</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Specialties Section */}
      <Container id="specialties" className="my-5">
        <h2 className="section-heading">Top Hospitals in Bangalore</h2>
        <Row>
          <Col md={3} className="mb-4">
            <Card className="specialty-card text-center p-3">
              <Card.Body>
                <Card.Title>Manipal Hospital</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="specialty-card text-center p-3">
              <Card.Body>
                <Card.Title>Fortis Hospital</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="specialty-card text-center p-3">
              <Card.Body>
                <Card.Title>Apollo Hospital</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} className="mb-4">
            <Card className="specialty-card text-center p-3">
              <Card.Body>
                <Card.Title>Narayana Health</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Testimonials Section */}
      <Container id="testimonials" className="my-5">
        <h2 className="section-heading">What Our Patients Say</h2>
        <Row>
          <Col md={6} className="mb-4">
            <Card className="testimonial-card p-3">
              <Card.Body>
                <Card.Text>"Excellent platform to book consultations and health packages — highly recommended!"</Card.Text>
                <Card.Title className="text-end">— Asha R.</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="mb-4">
            <Card className="testimonial-card p-3">
              <Card.Body>
                <Card.Text>"Quick service and top hospital tie-ups. Loved the seamless booking process."</Card.Text>
                <Card.Title className="text-end">— Ravi K.</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Contact Section */}
      <Container id="contact" className="my-5">
        <h2 className="section-heading text-center mb-4">Contact Us</h2>
        <Row className="justify-content-center">
          <Col md={6} className="contact-card p-4 shadow rounded bg-light">
            <h4 className="mb-3">Office Address</h4>
            <p><GeoAltFill className="me-2 text-primary" size={24} />123 MG Road, Bangalore, Karnataka, 560001</p>

            <h4 className="mt-4 mb-3">Email</h4>
            <p><EnvelopeFill className="me-2 text-primary" size={24} />support@medicarehub.com</p>

            <h4 className="mt-4 mb-3">Phone</h4>
            <p><TelephoneFill className="me-2 text-primary" size={24} />+91 98765 43210</p>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <footer className="footer text-white text-center p-3">
        <div className="mb-2">
          <a href="#" className="text-white me-3"><i className="bi bi-facebook"></i></a>
          <a href="#" className="text-white me-3"><i className="bi bi-twitter"></i></a>
          <a href="#" className="text-white me-3"><i className="bi bi-instagram"></i></a>
          <a href="#" className="text-white"><i className="bi bi-linkedin"></i></a>
        </div>
        <p>&copy; 2025 MediCare Hub | Designed for a better healthcare experience</p>
      </footer>
    </div>
  );
}

export default Home;
