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
    <section className="toyland-wishlist-page">
      <div className="toyland-wishlist-container">

        <div className="toyland-wishlist-header">
          <h1 className="toyland-wishlist-title">
            ❤️ My Wishlist
          </h1>

          <p className="toyland-wishlist-subtitle">
            Save your favourite toys and buy them anytime.
          </p>
        </div>

        <div className="toyland-wishlist-content">
          {items.length ? (
            <div className="toyland-wishlist-grid">
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
            <div className="toyland-wishlist-empty">
              <div className="toyland-empty-icon">
                💖
              </div>

              <h2>Your Wishlist is Empty</h2>

              <p>
                Start adding your favourite toys to
                see them here.
              </p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}