import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App Routing", () => {
  const routes = [
    { path: "/login", text: /Patients Login/i },
    { path: "/signup", text: /Create an Account/i },
    { path: "/dashboard", text: /Hospital Dashboard/i },
    { path: "/hospitallogin", text: /Hospital Staff Login/i },
    { path: "/forticshospital", text: /Fortis Staff Panel/i },
    { path: "/updatepassword", text: /update password/i }
  ];

  routes.forEach(({ path, text }) => {
    test(`renders component for route ${path}`, async () => {
      window.history.pushState({}, "Test page", path);

      render(<App />);
      const element = await screen.findByText(text, { exact: false });

      expect(element).toBeInTheDocument();
    });
  });
});
