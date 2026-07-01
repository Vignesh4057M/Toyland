import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone } from "lucide-react";
import { FaInstagram } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-overlay"></div>

      <div className="container footer-content">
        <div className="footer-grid">

          <div className="footer-column brand-column">
            <div className="footer-brand">
              <img src="/logo.png" alt="ToyLand logo" />

              <div>
                <h3 className="footer-title">ToyLand</h3>
                <p className="footer-tagline">Toys & Games</p>
              </div>
            </div>

            <p className="footer-text">
              Discover exciting toys, educational games, action figures,
              and creative play experiences designed to inspire children
              and bring joy to every family.
            </p>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Quick Links</h4>

            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/educational-toys">Educational Toys</Link>
              <Link to="/action-figures">Action Figures</Link>
              <Link to="/about">About Us</Link>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Store Location</h4>

            <div className="footer-card">
              <p className="footer-line">
                <MapPin size={18} />
                <span>
                  Aruppukottai Main Road,
                  Bus Stand,
                  Kariyapatti - 626106
                </span>
              </p>
            </div>
          </div>

          <div className="footer-column">
            <h4 className="footer-heading">Contact Us</h4>

            <div className="footer-card">
              <p className="footer-line">
                <Phone size={18} />
                <span>91506 48548</span>
              </p>

              <p className="footer-line">
                <Phone size={18} />
                <span>8098954035</span>
              </p>

              <a
                className="footer-instagram"
                href="https://instagram.com/toyland"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
                Follow on Instagram
              </a>
            </div>
          </div>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} ToyLand. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}