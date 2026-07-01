import React, { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";
import "./ChangePassword.css";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      form.newPassword !==
      form.confirmPassword
    ) {
      return alert(
        "Passwords do not match"
      );
    }

    try {
      await api.post(
        "/auth/change-password",
        {
          currentPassword:
            form.currentPassword,
          newPassword:
            form.newPassword,
        }
      );

      alert(
        "Password changed successfully"
      );

      navigate("/profile");
    } catch (err) {
  console.log("FULL ERROR =>", err);
  console.log("RESPONSE =>", err.response);
  console.log("MESSAGE =>", err.message);

  alert(
    err.response?.data?.message ||
    err.message ||
    "Something went wrong"
  );
}
  };

  return (
    <section className="page-section">
      <div className="container">
        <div className="change-password-card">
          <h2>
            Change Password
          </h2>

          <form
            onSubmit={handleSubmit}
          >
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={
                form.currentPassword
              }
              onChange={
                handleChange
              }
              required
            />

            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={
                form.newPassword
              }
              onChange={
                handleChange
              }
              required
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={
                form.confirmPassword
              }
              onChange={
                handleChange
              }
              required
            />

            <button
              type="submit"
            >
              Update Password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}