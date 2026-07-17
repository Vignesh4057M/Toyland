import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { imgUrl } from "../api/api";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    api
      .get(`/products/${id}`)
      .then((res) => {
        setProduct(res.data);
      })
      .catch(() => {
        setProduct(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <section className="page-section">
        <div className="toyland-loader">
          <div className="toy-spinner"></div>
          <h3>Loading Product...</h3>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="page-section">
        <div className="container card empty-state">
          Product not found.
        </div>
      </section>
    );
  }

  const addToCart = async () => {
    try {
      await api.post("/cart", {
        product: product._id,
        quantity: 1,
      });

      // alert("Added to cart");
      navigate("/success",{
state:{
type:"cart"
}
});
   } catch {
  navigate("/login", {
    state: {
      message: "Please login first",
    },
  });
}
  };

  const addToFavourite = async () => {
    try {
      await api.post("/favourites", {
        product: product._id,
      });

      // alert("Added to wishlist");
      navigate("/success",{
state:{
type:"wishlist"
}
});
    } catch {
  navigate("/login", {
    state: {
      message: "Please login first",
    },
  });
}
  };

  return (
    <section className="toy-product-details-page">
      <div className="container details-grid">

        <div className="card details-image-card">
          <img
            src={imgUrl(product.images?.[0])}
            alt={product.name}
          />
        </div>

        <div className="card details-content">

          <p className="details-category">
            {product.mainCategory}
          </p>

          <h1 className="details-title">
            {product.name}
          </h1>

          <p className="details-list">
            {product.about ||
              product.description ||
              "Premium toy product from ToyLand."}
          </p>

          <div className="details-price">
            ₹{product.discountPrice || product.price}

            {product.discountPrice && (
              <span>₹{product.price}</span>
            )}
          </div>

          <p className="details-list">
            <strong>Stock:</strong> {product.stock} pieces
          </p>

          <p className="details-list">
            <strong>Sub Category:</strong>{" "}
            {product.subCategory || "Toys"}
          </p>

          <div className="details-actions">

            <button
              className="btn-primary"
              onClick={addToCart}
            >
              Add to Cart
            </button>

            <button
              className="btn-soft"
              onClick={addToFavourite}
            >
              Add to Wishlist
            </button>

            <button
              className="btn-soft"
              onClick={() =>
                navigate("/checkout", {
                  state: {
                    buyNow: product,
                  },
                })
              }
            >
              Buy Now
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}