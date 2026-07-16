import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Success.css";

export default function Success() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const type = state?.type || "success";

  const config = {
    cart: {
      icon: "🛒",
      title: "Added to Cart",
      message: "Your product has been added to the cart successfully.",
      button1: "Go To Cart",
      button2: "Continue Shopping",
      route1: "/cart",
    },

    wishlist: {
      icon: "❤️",
      title: "Added to Wishlist",
      message: "Your product has been added to your wishlist.",
      button1: "View Wishlist",
      button2: "Continue Shopping",
      route1: "/favourites",
    },

    order: {
      icon: "✅",
      title: "Order Placed Successfully",
      message:
        "Thank you for shopping with ToyLand. Your order has been placed successfully.",
      button1: "View Orders",
      button2: "Continue Shopping",
      route1: "/orders",
    },
    profile: {
  icon: "👤",
  title: "Profile Updated",
  message: "Your profile has been updated successfully.",
  button1: "Go to Profile",
  button2: "Continue Shopping",
  route1: "/profile",
},

password: {
  icon: "🔒",
  title: "Password Changed",
  message: "Your password has been changed successfully.",
  button1: "Go to Profile",
  button2: "Continue Shopping",
  route1: "/profile",
},

addressAdd: {
  icon: "📍",
  title: "Address Added",
  message: "Your new address has been added successfully.",
  button1: "View Addresses",
  button2: "Continue Shopping",
  route1: "/addresses",
},

addressUpdate: {
  icon: "✏️",
  title: "Address Updated",
  message: "Your address has been updated successfully.",
  button1: "View Addresses",
  button2: "Continue Shopping",
  route1: "/addresses",
},

addressDelete: {
  icon: "🗑️",
  title: "Address Deleted",
  message: "Your address has been deleted successfully.",
  button1: "View Addresses",
  button2: "Continue Shopping",
  route1: "/addresses",
},
  };

const data =
  config[type] || {
    icon: "✅",
    title: "Success",
    message: "Operation completed successfully.",
    button1: "Home",
    button2: "Shop",
    route1: "/",
  };
  return (
    <section className="success-page">

      <div className="success-card">

        <div className="success-icon">
          {data.icon}
        </div>

        <h1>{data.title}</h1>

        <p>{data.message}</p>

        <div className="success-buttons">

          <button
            className="success-primary"
            onClick={() => navigate(data.route1)}
          >
            {data.button1}
          </button>

          <button
            className="success-secondary"
            onClick={() => navigate("/shop")}
          >
            {data.button2}
          </button>

        </div>

      </div>

    </section>
  );
}