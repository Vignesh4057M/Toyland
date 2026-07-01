import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./AdminLogin.css";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "Admin", password: "Admin123" })
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => { e.preventDefault(); setError(""); try { const { data } = await api.post("/admin/login", form); localStorage.setItem("adminToken", data.token); navigate("/admin"); } catch (err) { setError(err.response?.data?.message || "Invalid admin login"); } }
  return <section className="admin-login-page"><form className="admin-login-card" onSubmit={handleSubmit}><img src="/logo.png" alt="ToyLand" /><h1>Admin Login</h1><p>Manage ToyLand products, orders and users.</p>{error && <div className="admin-login-error">{error}</div>}<div className="admin-login-form"><input className="input" name="username" value={form.username} onChange={(e) => setForm({...form, username:e.target.value})} placeholder="Username" /><input className="input" name="password" type="password" value={form.password} onChange={(e) => setForm({...form, password:e.target.value})} placeholder="Password" /><button className="btn-primary" type="submit">Login Securely</button></div></form></section>;
}
