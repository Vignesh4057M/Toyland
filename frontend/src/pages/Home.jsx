import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const categories = [
  [
    "Educational Toys",
    "/educational-toys",
    "Learning kits, alphabet boards and smart games.",
  ],
  [
    "Action Figures",
    "/action-figures",
    "Heroes, robots and collectible figures.",
  ],
  [
    "Building Blocks",
    "/building-blocks",
    "Creative blocks for imagination and motor skills.",
  ],
  [
    "Soft Toys",
    "/soft-toys",
    "Cute plush toys and teddy bears.",
  ],
  [
    "Baby Toys",
    "/baby-toys",
    "Safe toys for babies and toddlers.",
  ],
  [
    "Remote Control Toys",
    "/remote-control-toys",
    "Cars, trucks, helicopters and racing toys.",
  ],
];

export default function Home() {
  const heroImages = [
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1600&q=80",

    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=80",

    "https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=1600&q=80",

    "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?auto=format&fit=crop&w=1600&q=80",
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api
      .get("/products")
      .then((response) => {
        setProducts(response.data.slice(0, 8));
      })
      .catch(() => {
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage(
        (prev) =>
          (prev + 1) %
          heroImages.length
      );
    }, 4000);

    return () =>
      clearInterval(interval);
  }, []);

  return (
    <>
      <section
        className="home-hero"
        style={{
          backgroundImage: `url(${heroImages[currentImage]})`,
        }}
      >
        <div className="toy-home-container">
          <div className="hero-panel home-copy">
            <p className="home-kicker">
              Premium Toy Store
            </p>

            <h1 className="home-title">
              Fun toys for{" "}
              <span>happy kids</span>
            </h1>

            <p className="home-description">
              Shop educational toys,
              action figures, building
              blocks, soft toys and remote
              control games with fast
              checkout.
            </p>

            <div className="home-actions">
              <Link
                to="/shop"
                className="toy-home-primary-btn"
              >
                Explore Toys
              </Link>

              <Link
                to="/about"
                className="toy-home-soft-btn"
              >
                About Store
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="category-block">
        <div className="toy-home-container">
          <div className="section-head">
            <div>
              <h2 className="toy-home-section-title">
                Shop by Category
              </h2>

              <p className="toy-home-section-subtitle">
                Choose toys by interest
                and age group.
              </p>
            </div>

            <Link
              to="/shop"
              className="toy-home-soft-btn"
            >
              View All
            </Link>
          </div>

          <div className="toy-home-category-grid">
            {categories.map(
              ([name, path, text]) => (
                <Link
                  key={name}
                  to={path}
                  className="category-card"
                >
                  <h3>{name}</h3>
                  <p>{text}</p>
                </Link>
              )
            )}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="toy-home-container">
          <div className="section-head">
            <div>
              <h2 className="toy-home-section-title">
                Featured Toys
              </h2>

              <p className="toy-home-section-subtitle">
                Latest products from
                ToyLand collection.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="toyland-loader">
              <div className="toy-spinner"></div>

              <h3>Loading Toys...</h3>
            </div>
          ) : products.length ? (
            <div className="toy-home-product-grid">
              {products.map(
                (product) => (
                  <ProductCard
                    key={product._id}
                    p={product}
                  />
                )
              )}
            </div>
          ) : (
            <div className="toy-home-empty-state">
              No products found.
            </div>
          )}
        </div>
      </section>
    </>
  );
}