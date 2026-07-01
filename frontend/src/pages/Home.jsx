import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import "./Home.css";

const categories = [
  ["Educational Toys", "/educational-toys", "Learning kits, alphabet boards and smart games."],
  ["Action Figures", "/action-figures", "Heroes, robots and collectible figures."],
  ["Building Blocks", "/building-blocks", "Creative blocks for imagination and motor skills."],
  ["Soft Toys", "/soft-toys", "Cute plush toys and teddy bears."],
  ["Baby Toys", "/baby-toys", "Safe toys for babies and toddlers."],
  ["Remote Control Toys", "/remote-control-toys", "Cars, trucks, helicopters and racing toys."],
];

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((response) => setProducts(response.data.slice(0, 8))).catch(() => setProducts([]));
  }, []);

  return (
    <>
      <section className="home-hero">
        <div className="container home-hero-grid">
          <div className="hero-panel home-copy">
            <p className="home-kicker">Premium Toy Store</p>
            <h1 className="home-title">Fun toys for <span>happy kids</span></h1>
            <p className="home-description">Shop educational toys, action figures, building blocks, soft toys and remote control games with fast checkout.</p>
            <div className="home-actions">
              <Link to="/shop" className="btn-primary">Explore Toys</Link>
              <Link to="/about" className="btn-soft">About Store</Link>
            </div>
          </div>
          <div className="home-visual">
            <img src="https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=1200&q=80" alt="ToyLand toys" />
            <div className="home-floating-card"><strong>Safe. Colorful. Kids friendly.</strong><br />Curated toy collection for every age.</div>
          </div>
        </div>
      </section>

      <section className="category-block">
        <div className="container">
          <div className="section-head"><div><h2 className="page-title">Shop by Category</h2><p className="page-subtitle">Choose toys by interest and age group.</p></div><Link to="/shop" className="btn-soft">View All</Link></div>
          <div className="grid-3">
            {categories.map(([name, path, text]) => <Link key={name} to={path} className="category-card"><h3>{name}</h3><p>{text}</p></Link>)}
          </div>
        </div>
      </section>

      <section className="featured-section">
        <div className="container">
          <div className="section-head"><div><h2 className="page-title">Featured Toys</h2><p className="page-subtitle">Latest products from ToyLand collection.</p></div></div>
          {products.length ? <div className="grid-4">{products.map((product) => <ProductCard key={product._id} p={product} />)}</div> : <div className="card empty-state">No products found. Add products from admin panel.</div>}
        </div>
      </section>
    </>
  );
}
