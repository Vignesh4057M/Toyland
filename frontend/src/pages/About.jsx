import React from "react";
import "./About.css";

export default function About() {
  return (
    <section className="about-page">
      <div className="container">

        <div className="about-hero">
          <span className="about-badge">
            Welcome to ToyLand
          </span>

          <h1 className="page-title">
            About ToyLand
          </h1>

          <p className="about-subtitle">
            Bringing imagination, learning, and fun together through
            carefully selected toys for children of all ages.
          </p>
        </div>

        <div className="about-content">
          <p>
            ToyLand is a modern online toy shopping destination built for
            kids, parents, and toy retailers. Our platform combines a
            seamless shopping experience with powerful inventory and order
            management tools.
          </p>

          <p>
            We offer a wide range of products including Educational Toys,
            Action Figures, Building Blocks, Soft Toys, Baby Toys,
            Outdoor Toys, Puzzle Toys, and Remote Control Toys.
          </p>

          <div className="about-stats">
            <div className="about-stat">
              <strong>8+</strong>
              <span>Categories</span>
            </div>

            <div className="about-stat">
              <strong>24/7</strong>
              <span>Online Store</span>
            </div>

            <div className="about-stat">
              <strong>100%</strong>
              <span>Kids Friendly</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}