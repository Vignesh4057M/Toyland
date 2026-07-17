import React, {
  useEffect,
  useState,
} from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";
import api, {
  imgUrl,
} from "../api/api";
import "./ProductDetails.css";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

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

  const addToCart = async () => {
    try {
      await api.post("/cart", {
        product: product._id,
        quantity: 1,
      });

      navigate("/success", {
        state: {
          type: "cart",
        },
      });
    } catch {
      navigate("/login", {
        state: {
          message:
            "Please login first",
        },
      });
    }
  };

  const addToFavourite =
    async () => {
      try {
        await api.post(
          "/favourites",
          {
            product: product._id,
          }
        );

        navigate("/success", {
          state: {
            type: "wishlist",
          },
        });
      } catch {
        navigate("/login", {
          state: {
            message:
              "Please login first",
          },
        });
      }
    };

  if (loading) {
    return (
      <section className="toy-product-details-page">
        <div className="toyland-loader">
          <div className="toy-spinner"></div>

          <h3>
            Loading Product...
          </h3>
        </div>
      </section>
    );
  }

  if (!product) {
    return (
      <section className="toy-product-details-page">
        <div className="toy-product-empty-state">
          Product not found.
        </div>
      </section>
    );
  }

  return (
    <section className="toy-product-details-page">
      <div className="toy-product-details-container details-grid">
        <div className="details-image-card">
          <img
            src={imgUrl(
              product.images?.[0]
            )}
            alt={
              product.name ||
              "Toy product"
            }
          />
        </div>

        <div className="details-content">
          <p className="details-category">
            {product.mainCategory ||
              "ToyLand Product"}
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
            ₹
            {product.discountPrice ||
              product.price}

            {product.discountPrice && (
              <span>
                ₹{product.price}
              </span>
            )}
          </div>

          <p className="details-list">
            <strong>Stock:</strong>{" "}
            {product.stock} pieces
          </p>

          <p className="details-list">
            <strong>
              Sub Category:
            </strong>{" "}
            {product.subCategory ||
              "Toys"}
          </p>

          <div className="details-actions">
            <button
              type="button"
              className="toy-product-cart-btn"
              onClick={addToCart}
            >
              Add to Cart
            </button>

            <button
              type="button"
              className="toy-product-soft-btn"
              onClick={
                addToFavourite
              }
            >
              Add to Wishlist
            </button>

            <button
              type="button"
              className="toy-product-soft-btn"
              onClick={() =>
                navigate(
                  "/checkout",
                  {
                    state: {
                      buyNow:
                        product,
                    },
                  }
                )
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