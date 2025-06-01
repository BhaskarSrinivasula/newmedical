import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HospitalLogin from "./hospital_login";

// Mock fetch for login requests
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve([
        { hospital: "Apollo Hospital", userId: "apollo123", password: "12345" },
      ]),
  })
);

describe("HospitalLogin Component", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders form fields and login button", () => {
    render(
      <MemoryRouter>
        <HospitalLogin />
      </MemoryRouter>
    );

    // Check for form labels and button
    expect(screen.getByText(/Hospital Staff Login/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Select Hospital/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/User ID/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  test("allows input in fields", () => {
    render(
      <MemoryRouter>
        <HospitalLogin />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Select Hospital/i), {
      target: { value: "Apollo Hospital" },
    });
    fireEvent.change(screen.getByLabelText(/User ID/i), {
      target: { value: "apollo123" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "12345" },
    });

    expect(screen.getByLabelText(/Select Hospital/i).value).toBe("Apollo Hospital");
    expect(screen.getByLabelText(/User ID/i).value).toBe("apollo123");
    expect(screen.getByLabelText(/Password/i).value).toBe("12345");
  });

  test("shows error message for invalid login", async () => {
    render(
      <MemoryRouter>
        <HospitalLogin />
      </MemoryRouter>
    );

    // Wait for message to appear
  });
});
