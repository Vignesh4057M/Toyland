import React, { useState } from "react";
import { Heart, Home, MoreVertical, ShoppingBag, User, X } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Shop", path: "/shop" },
  { name: "Educational Toys", path: "/educational-toys" },
  { name: "Action Figures", path: "/action-figures" },
  { name: "About", path: "/about" },
];

const bottomNav = [
  { icon: Home, path: "/", label: "Home" },
  { icon: Heart, path: "/favourites", label: "Wishlist" },
  { icon: ShoppingBag, path: "/cart", label: "Cart" },
  { icon: User, path: "/profile", label: "Profile" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <header className="navbar">
        <nav className="container navbar-inner">
          <Link to="/" className="navbar-logo" onClick={() => setOpen(false)}>
            <img src="/logo.png" alt="ToyLand logo" />
            <div>
              <div className="navbar-logo-title">ToyLand</div>
              <div className="navbar-logo-sub">Toys & Games</div>
            </div>
          </Link>

          <div className="navbar-links">
            {menuItems.map((item) => (
              <NavLink key={item.path} to={item.path} className={({ isActive }) => `navbar-link ${isActive ? "active" : ""}`}>
                {item.name}
              </NavLink>
            ))}
          </div>

          <div className="navbar-icons">
            <Link to="/favourites" className="navbar-icon"><Heart size={19} /></Link>
            <Link to="/cart" className="navbar-icon"><ShoppingBag size={19} /></Link>
            <Link to="/profile" className="navbar-icon"><User size={19} /></Link>
          </div>

          <button className="mobile-toggle" onClick={() => setOpen((value) => !value)} aria-label="Open menu">
            {open ? <X size={22} /> : <MoreVertical size={22} />}
          </button>
        </nav>

        <div className={`mobile-menu ${open ? "open" : ""}`}>
          {menuItems.map((item) => (
            <NavLink key={item.path} to={item.path} onClick={() => setOpen(false)} className={({ isActive }) => `mobile-link ${isActive ? "active" : ""}`}>
              {item.name}
            </NavLink>
          ))}
        </div>
      </header>

      <nav className="mobile-bottom-nav">
        <div className="mobile-bottom-inner">
          {bottomNav.map(({ icon: Icon, path, label }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path} className={`mobile-bottom-link ${active ? "active" : ""}`}>
                <span className="mobile-bottom-icon"><Icon size={20} /></span>
                <span>{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
