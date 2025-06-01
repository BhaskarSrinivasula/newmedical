import React, { useEffect, useState } from "react";
import axios from "axios";

const apiBaseUrl = "http://localhost:4000/";
const hospitals = ["manipalhospital", "apollohospital", "fortishospital"];

// Example Navbar component (replace or import your own)
function Navbar() {
  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    window.location.href = "/";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hospital Dashboard
        </a>
        <button
          className="btn btn-outline-light ms-auto"
          onClick={handleLogout}
          type="button"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

function Dashboard() {
  const [appointments, setAppointments] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    email: "",
    hospital: "manipalhospital",
    appointmentDate: "",
    timeSlot: "",
    description: "",
    status: "Pending",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      window.location.href = "/";
      return;
    }
    setFormData((prev) => ({ ...prev, email: userEmail }));
    fetchAppointments(userEmail);
  }, []);

  const fetchAppointments = async (email) => {
    setLoading(true);
    setError("");
    try {
      let allAppointments = [];
      for (const hospital of hospitals) {
        const res = await axios.get(`${apiBaseUrl}${hospital}`);
        const userAppts = res.data
          .filter((appt) => appt.email === email)
          .map((appt) => ({ ...appt, hospital }));
        allAppointments = allAppointments.concat(userAppts);
      }
      setAppointments(allAppointments);
      if (allAppointments.length === 0) {
        setError("No appointments found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch appointments.");
    }
    setLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage("");

    if (
      !formData.name ||
      !formData.age ||
      !formData.gender ||
      !formData.appointmentDate ||
      !formData.timeSlot ||
      !formData.description
    ) {
      alert("Please fill all fields.");
      return;
    }

    const selectedDate = new Date(formData.appointmentDate);
    const today = new Date();
    today.setDate(today.getDate() + 2);
    if (selectedDate < today) {
      alert("Appointment date should be at least 2 days from today.");
      return;
    }

    try {
      const res = await axios.get(`${apiBaseUrl}${formData.hospital}`);
      const existing = res.data.find(
        (appt) =>
          appt.appointmentDate === formData.appointmentDate &&
          appt.timeSlot === formData.timeSlot
      );
      if (existing) {
        alert(
          `This time slot is already booked at ${formData.hospital} on ${formData.appointmentDate}.`
        );
        return;
      }
    } catch (err) {
      console.error(err);
      alert("Failed to verify appointment slot.");
      return;
    }

    try {
      await axios.post(`${apiBaseUrl}${formData.hospital}`, formData);
      setSuccessMessage("Appointment booked successfully!");
      setFormData((prev) => ({
        ...prev,
        name: "",
        age: "",
        gender: "",
        appointmentDate: "",
        timeSlot: "",
        description: "",
        status: "Pending",
      }));
      fetchAppointments(formData.email);
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to book appointment.");
    }
  };

  const generateTimeSlots = () => {
    const slots = [];
    let start = new Date();
    start.setHours(9, 0, 0, 0);
    const end = new Date();
    end.setHours(20, 0, 0, 0);

    while (start < end) {
      const hrs = start.getHours();
      const mins = start.getMinutes();
      const display =
        (hrs % 12 || 12) +
        ":" +
        (mins === 0 ? "00" : mins) +
        (hrs >= 12 ? " PM" : " AM");
      slots.push(display);
      start.setMinutes(start.getMinutes() + 30);
    }
    return slots;
  };

  // Min date: today + 2 days
  const getMinDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 2);
    return today.toISOString().split("T")[0];
  };

  // Max date: today + 4 days
  const getMaxDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 4);
    return today.toISOString().split("T")[0];
  };

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="text-primary mb-4">Welcome</h2>

        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        <h4>Your Appointments</h4>
        {loading ? (
          <p>Loading appointments...</p>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Hospital</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Email</th>
                  <th>Date</th>
                  <th>Time Slot</th>
                  <th>Description</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((a) => (
                  <tr key={a.id || a.name + a.appointmentDate}>
                    <td>{a.hospital}</td>
                    <td>{a.name}</td>
                    <td>{a.age}</td>
                    <td>{a.gender}</td>
                    <td>{a.email}</td>
                    <td>{a.appointmentDate}</td>
                    <td>{a.timeSlot}</td>
                    <td>{a.description}</td>
                    <td>
                      <span
                        className={`badge ${
                          a.status === "Accepted"
                            ? "bg-success"
                            : a.status === "Rejected"
                            ? "bg-danger"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {a.status || "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "Close Appointment Form" : "Add New Appointment"}
          </button>
        </div>

        {showForm && (
          <div className="card shadow p-4 mt-4">
            <h5 className="mb-3 text-success">Book an Appointment</h5>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label>Name:</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Age:</label>
                <input
                  type="number"
                  className="form-control"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="mb-3">
                <label>Gender:</label>
                <select
                  className="form-select"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label>Registered Email:</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  readOnly
                />
              </div>

              <div className="mb-3">
                <label>Hospital:</label>
                <select
                  className="form-select"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleChange}
                  required
                >
                  {hospitals.map((h) => (
                    <option key={h} value={h}>
                      {h.charAt(0).toUpperCase() + h.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>Appointment Date:</label>
                <input
                  type="date"
                  className="form-control"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  min={getMinDate()}
                  max={getMaxDate()}
                  required
                />
              </div>

              <div className="mb-3">
                <label>Time Slot:</label>
                <select
                  className="form-select"
                  name="timeSlot"
                  value={formData.timeSlot}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select time slot</option>
                  {generateTimeSlots().map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-3">
                <label>Description:</label>
                <textarea
                  className="form-control"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>

              <button type="submit" className="btn btn-success w-100">
                Book Appointment
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;
