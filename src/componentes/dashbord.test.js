import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Dashboard from "./dashbord";
import axios from "axios";

// Mock axios
jest.mock("axios");

// Mock localStorage
beforeEach(() => {
  Storage.prototype.getItem = jest.fn(() => "testuser@example.com");
  Storage.prototype.removeItem = jest.fn();
  delete window.location;
  window.location = { href: "" };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe("Dashboard Component", () => {
  test("fetches and displays appointments on load", async () => {
    // Mock response for 3 hospitals
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: "John Doe",
          age: "30",
          gender: "Male",
          email: "testuser@example.com",
          appointmentDate: "2025-06-03",
          timeSlot: "10:00 AM",
          description: "General checkup",
          status: "Pending",
        },
      ],
    });
    // Mock empty for other hospitals
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.get.mockResolvedValueOnce({ data: [] });

    render(<Dashboard />);

    // Check loading text
    expect(screen.getByText(/loading appointments/i)).toBeInTheDocument();

    // Wait for appointment to display
    await waitFor(() =>
      expect(screen.getByText(/John Doe/i)).toBeInTheDocument()
    );

    // Check if the appointment data appears in the table
    expect(screen.getByText(/General checkup/i)).toBeInTheDocument();
    expect(screen.getByText(/10:00 AM/i)).toBeInTheDocument();
    expect(screen.getByText(/Pending/i)).toBeInTheDocument();
  });

  test("shows appointment form when button is clicked", () => {
    render(<Dashboard />);

    // Check button initially
    const button = screen.getByRole("button", { name: /add new appointment/i });
    expect(button).toBeInTheDocument();

    // Click the button
    fireEvent.click(button);

    // Now check if the form appears
    expect(
      screen.getByRole("heading", { name: /Book an Appointment/i })
    ).toBeInTheDocument();
  });
});
