import React, { useEffect, useState } from "react";
import api from "../api/api";
import ProductCard from "../components/ProductCard";
import "./Favourites.css";

export default function Favourites() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api
      .get("/favourites")
      .then((res) => setItems(res.data))
      .catch(() => setItems([]));
  }, []);

  return (
    <section className="wishlist-page">
      <div className="wishlist-container">
        <h1 className="wishlist-page-title">
          Wishlist
        </h1>

        <p className="wishlist-page-subtitle">
          Your favourite toys.
        </p>

        <div className="wishlist-content">
          {items.length ? (
            <div className="wishlist-product-grid">
              {items.map(
                (item) =>
                  item.product && (
                    <ProductCard
                      key={item._id}
                      p={item.product}
                    />
                  )
              )}
            </div>
          ) : (
            <div className="wishlist-empty-card">
              No wishlist products.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}