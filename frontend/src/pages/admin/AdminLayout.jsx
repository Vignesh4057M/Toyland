import React, { useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Menu, Package, ShoppingBag, Users, X } from "lucide-react";
import "./AdminCommon.css";

const links = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/users", label: "Users", icon: Users },
];

export default function AdminLayout() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logout = () => { localStorage.removeItem("adminToken"); navigate("/admin/login"); };
  const Sidebar = <aside className={`admin-sidebar ${open ? "open" : ""}`}><Link to="/admin" className="admin-logo"><img src="/logo.png" alt="ToyLand" /><div><h2>ToyLand</h2><p>Admin</p></div></Link><nav className="admin-nav">{links.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === "/admin"} onClick={() => setOpen(false)} className={({ isActive }) => `admin-nav-link ${isActive ? "active" : ""}`}><Icon size={20} /> {label}</NavLink>)}</nav><button className="admin-logout" onClick={logout}><LogOut size={18} /> Logout</button></aside>;
  return <div className="admin-shell"><div className="admin-topbar"><strong>ToyLand Admin</strong><button className="admin-menu-btn" onClick={() => setOpen((v) => !v)}>{open ? <X /> : <Menu />}</button></div>{Sidebar}<main className="admin-main"><Outlet /></main></div>;
}
