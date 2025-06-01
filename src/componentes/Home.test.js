// src/components/Home.test.js
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../components/Home"; // Adjust path if different
import "@testing-library/jest-dom";

describe("Home Component", () => {

  // Test for Hero section heading
  test("renders hero section heading", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const heroHeading = screen.getByText(/Welcome to MediCare Hub/i);
    expect(heroHeading).toBeInTheDocument();
  });

  // Test for About section heading
  test("renders About Us section", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const aboutHeading = screen.getByText(/About Us/i);
    expect(aboutHeading).toBeInTheDocument();
  });


  // Test for Contact Section email
  test("renders Contact Us section with email", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const emailElement = screen.getByText(/support@medicarehub.com/i);
    expect(emailElement).toBeInTheDocument();
  });

  // Test for Testimonials section
  test("renders Testimonials section", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const testimonialHeading = screen.getByText(/What Our Patients Say/i);
    expect(testimonialHeading).toBeInTheDocument();
  });

  // Test for Book Appointment button
  test("renders Book Appointment button in Hero section", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const buttonElement = screen.getByRole("button", { name: /Book Appointment/i });
    expect(buttonElement).toBeInTheDocument();
  });
});
