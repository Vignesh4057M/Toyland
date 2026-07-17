import React from "react";
import { Heart, ShoppingBag, Star, Zap } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api, { imgUrl } from "../api/api";
import "./ProductCard.css";

export default function ProductCard({ p }) {
  const navigate = useNavigate();
  const price = Number(p.discountPrice || p.price || 0);
  const mrp = Number(p.price || 0);
  const discount = p.discountPrice && mrp ? Math.round(((mrp - price) / mrp) * 100) : 0;

  const safePost = async (url, body, message) => {
    try { await api.post(url, body); alert(message) }
    catch { alert("Please login first"); navigate("/login") }
  };

  const addToCart = (event) => { event.preventDefault(); safePost("/cart", { product: p._id, quantity: 1 }, "Added to cart"); };
  const addToFavourite = (event) => { event.preventDefault(); safePost("/favourites", { product: p._id }, "Added to wishlist"); };
  const buyNow = (event) => { event.preventDefault(); navigate("/checkout", { state: { buyNow: p } }); };

  return (
    <Link to={`/product/${p._id}`} className="toy-product-card">
  <div className="toy-product-image-wrap">
    <img
      src={imgUrl(p.images?.[0])}
      alt={p.name}
      className="toy-product-image"
      loading="lazy"
    />
    <div className="toy-product-description-overlay">
  <p>
    {p.description || "Explore this exciting ToyLand product designed for fun, learning and creative play."}
  </p>
</div>

    {discount > 0 && (
      <span className="toy-discount-badge">
        -{discount}%
      </span>
    )}

    <button
      onClick={addToFavourite}
      className="toy-wishlist-btn"
      type="button"
    >
      <Heart size={17} />
    </button>

    <div className="toy-card-actions">
      <button
        onClick={buyNow}
        className="toy-card-action-primary"
        type="button"
      >
        <Zap size={15} />
        Buy Now
      </button>

      <button
        onClick={addToCart}
        className="toy-card-action-light"
        type="button"
      >
        <ShoppingBag size={15} />
        Add to Cart
      </button>
    </div>
  </div>

  <div className="toy-product-info">
    <p className="toy-product-category">
      {p.mainCategory}
    </p>

    <h3 className="toy-product-name">
      {p.name}
    </h3>

    <div className="toy-product-meta">
      <div>
        <span className="toy-product-price">
          ₹{price}
        </span>

        {p.discountPrice && (
          <span className="toy-product-mrp">
            ₹{mrp}
          </span>
        )}
      </div>

      <span className="toy-product-rating">
        <Star size={13} fill="currentColor" />
        4.5
      </span>
    </div>
  </div>
</Link>
  );
}
