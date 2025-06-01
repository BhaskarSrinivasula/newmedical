import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function HospitalDashboard() {
  const [appointments, setAppointments] = useState([]);

  // Fetch appointments on load
  const fetchAppointments = () => {
    axios
      .get("http://localhost:4000/apollohospital")
      .then((res) => setAppointments(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  // Accept appointment
  const handleAccept = (id) => {
    axios
      .patch(`http://localhost:4000/apollohospital/${id}`, { status: "Accepted" })
      .then(() => fetchAppointments())
      .catch((err) => console.error(err));
  };

  // Reject appointment
  const handleReject = (id) => {
    axios
      .patch(`http://localhost:4000/apollohospital/${id}`, { status: "Rejected" })
      .then(() => fetchAppointments())
      .catch((err) => console.error(err));
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
  <div className="container-fluid justify-content-center">
    <a className="navbar-brand fw-bold text-center" href="/">
      Apollo Staff Panel
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarNav"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>

      {/* Heading */}
      <div className="container my-5">
        <h2 className="text-center mb-4 fw-bold">Appointment Requests</h2>

        {/* Appointments Table */}
        <table className="table table-striped table-hover table-bordered shadow">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Date</th>
              <th>Time</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((apt, index) => (
                <tr key={index}>
                  <td>{apt.name}</td>
                  <td>{apt.age}</td>
                  <td>{apt.date}</td>
                  <td>{apt.timeSlot}</td>
                  <td>{apt.email}</td>
                  <td>
                    <span
                      className={`badge ${
                        apt.status === "Accepted"
                          ? "bg-success"
                          : apt.status === "Rejected"
                          ? "bg-danger"
                          : "bg-warning text-dark"
                      }`}
                    >
                      {apt.status}
                    </span>
                  </td>
                  <td>
                    {apt.status === "Pending" ? (
                      <div className="d-flex gap-2">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleAccept(apt.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleReject(apt.id)}
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted">--</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No Appointments Yet</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
