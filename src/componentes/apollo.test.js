import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import HospitalDashboard from "./apollo";
import axios from "axios";

jest.mock("axios");

describe("HospitalDashboard", () => {
  test("renders fetched appointments", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 1,
          name: "John",
          age: "30",
          date: "2025-06-02",
          timeSlot: "10:00 AM",
          email: "john@example.com",
          status: "Pending",
        },
      ],
    });

    render(<HospitalDashboard />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });
  });

  test("clicking Accept triggers API call", async () => {
    axios.get.mockResolvedValueOnce({
      data: [
        {
          id: 2,
          name: "Mary",
          age: "28",
          date: "2025-06-05",
          timeSlot: "12:00 PM",
          email: "mary@example.com",
          status: "Pending",
        },
      ],
    });

    axios.patch.mockResolvedValueOnce({});

    render(<HospitalDashboard />);

    await waitFor(() => {
      expect(screen.getByText("Mary")).toBeInTheDocument();
    });

    const acceptBtn = screen.getByRole("button", { name: /accept/i });
    fireEvent.click(acceptBtn);

    await waitFor(() => {
      expect(axios.patch).toHaveBeenCalled();
    });
  });
});
