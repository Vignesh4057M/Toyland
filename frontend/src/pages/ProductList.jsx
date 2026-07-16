import React, { useEffect, useMemo, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import "./ProductList.css";

const categories = ["All", "Educational Toys", "Action Figures", "Building Blocks", "Soft Toys", "Baby Toys", "Outdoor Toys", "Puzzle Toys", "Remote Control Toys"];

export default function ProductList({ category }) {
  const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(category || "All");

  useEffect(() => {
  const params = {};

  if (selectedCategory !== "All")
    params.category = selectedCategory;

  if (search)
    params.search = search;

  setLoading(true);

  api
    .get("/products", { params })
    .then((response) => {
      setProducts(response.data);
    })
    .catch(() => {
      setProducts([]);
    })
    .finally(() => {
      setLoading(false);
    });

}, [selectedCategory, search]);

  const title = useMemo(() => selectedCategory === "All" ? "All Toys" : selectedCategory, [selectedCategory]);

  return (
    <section className="page-section">
      <div className="container">
        <div className="shop-header">
          <h1 className="page-title">{title}</h1>
          <p className="page-subtitle">Search and filter ToyLand products.</p>
          <div className="shop-filter card" style={{ padding: 16 }}>
            <input className="input" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search toys..." />
            <select className="input" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </div>
        </div>
        <div className="product-grid-wrap">
          {loading ? (
    <div className="toyland-loader">
        <div className="toy-spinner"></div>
        <h3>Loading Toys...</h3>
    </div>
) : products.length ? (
    <div className="grid-4">
        {products.map((product) => (
            <ProductCard
                key={product._id}
                p={product}
            />
        ))}
    </div>
) : (
    <div className="card empty-state">
        No toys found.
    </div>
)}
        </div>
      </div>
    </section>
  );
}
