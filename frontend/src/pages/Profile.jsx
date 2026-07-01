import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <section className="page-section">
      <div className="container">
        <h1 className="page-title">My Profile</h1>

        <div className="card profile-card">
          <div className="profile-row">
            <strong>Name</strong>
            <span>{user?.name}</span>
          </div>

          <div className="profile-row">
            <strong>Phone</strong>
            <span>{user?.phone}</span>
          </div>

          <div className="profile-row">
            <strong>Email</strong>
            <span>{user?.email || "-"}</span>
          </div>

          <div className="user-profile-actions-grid">

            <div
              className="user-profile-action-card"
              onClick={() => navigate("/orders")}
            >
              <h3>My Orders</h3>
              <p>Track and manage your purchases</p>
            </div>

            <div
              className="user-profile-action-card"
              onClick={() => navigate("/addresses")}
            >
              <h3>Address Management</h3>
              <p>Save and manage delivery locations</p>
            </div>

            <div
              className="user-profile-action-card"
              onClick={() => navigate("/edit-profile")}
            >
              <h3>Edit Profile</h3>
              <p>Update your personal information</p>
            </div>

            <div
              className="user-profile-action-card"
              onClick={() => navigate("/change-password")}
            >
              <h3>Change Password</h3>
              <p>Secure your account</p>
            </div>

            <button
              className="user-profile-logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}