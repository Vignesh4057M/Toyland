import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Auth({ registerMode = false }) {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (registerMode) await register(form);
      else await login(form.phone, form.password);
      navigate("/");
    } catch (err) { setError(err.response?.data?.message || "Authentication failed"); }
  };

  return (
    <section className="auth-page">
      <form className="card auth-card" onSubmit={handleSubmit}>
        <img src="/logo.png" alt="ToyLand" className="auth-logo" />
        <h1 className="auth-title">{registerMode ? "Create Account" : "Welcome Back"}</h1>
        <p className="auth-subtitle">{registerMode ? "Register to start shopping toys" : "Login with your phone and password"}</p>
        {error && <div className="auth-error">{error}</div>}
        <div className="auth-form">
          {registerMode && <input className="input" name="name" value={form.name} onChange={handleChange} placeholder="Full name" required />}
          {registerMode && <input className="input" name="email" value={form.email} onChange={handleChange} placeholder="Email optional" />}
          <input className="input" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone number" required />
          <input className="input" name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" required />
          <button className="btn-primary" type="submit">{registerMode ? "Register" : "Login"}</button>
        </div>
        <p className="auth-switch">{registerMode ? "Already have account? " : "New user? "}<Link to={registerMode ? "/login" : "/register"}>{registerMode ? "Login" : "Register"}</Link></p>
      </form>
    </section>
  );
}
