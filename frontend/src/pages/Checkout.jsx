import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api/api";
import "./Checkout.css";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const buyNow = location.state?.buyNow;
  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState({ fullName: "", phone: "", address: "", city: "", pincode: "",district: "",
  state: "" });

  useEffect(() => { if (!buyNow) api.get("/cart").then((res) => setCartItems(res.data)).catch(() => setCartItems([])); }, [buyNow]);
  const products = buyNow ? [{ product: buyNow, quantity: 1 }] : cartItems;
  const total = useMemo(() => products.reduce((sum, item) => sum + Number(item.product?.discountPrice || item.product?.price || 0) * Number(item.quantity || 1), 0), [products]);
  const handleChange = (e) => setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
     await api.post("/orders", {
  items: products.map((item) => ({
    product: item.product._id,
    quantity: item.quantity,
    price: item.product.discountPrice || item.product.price,
  })),

  amount: total,

  adtoys: {
    fullName: address.fullName,
    phone: address.phone,
    alternatePhone: address.alternatePhone || "",
    address: address.address,
    city: address.city,
    district: address.district || "",
    state: address.state || "",
    pincode: address.pincode,
  },

  paymentMethod: "Cash on Delivery",
});
      alert("Order placed successfully"); navigate("/orders")
    } catch (err) {
  console.log(err.response);
  console.log(err.response?.data);

  alert(    err.response?.data?.message ||
    "Please login to place order"
  );
 navigate("/login"); }
  };

  return <section className="page-section"><div className="container"><h1 className="page-title">Checkout</h1><div className="checkout-layout" style={{marginTop:24}}><form className="card checkout-form" onSubmit={placeOrder}><h2>Shipping Details</h2><div className="checkout-grid"><input className="input" name="fullName" value={address.fullName} onChange={handleChange} placeholder="Full name" required /><input className="input" name="phone" value={address.phone} onChange={handleChange} placeholder="Phone" required /><textarea className="input" name="address" value={address.address} onChange={handleChange} placeholder="Address" required /><input className="input" name="city" value={address.city} onChange={handleChange} placeholder="City" required />
  <input
  className="input"
  name="district"
  value={address.district}
  onChange={handleChange}
  placeholder="District"
/>

<input
  className="input"
  name="state"
  value={address.state}
  onChange={handleChange}
  placeholder="State"
/>
<input className="input" name="pincode" value={address.pincode} onChange={handleChange} placeholder="Pincode" required /><button className="btn-primary" type="submit">Place Order</button></div></form><aside className="card checkout-summary"><h2>Products</h2>{products.map((item) => <div className="checkout-summary-item" key={item.product?._id}><span>{item.product?.name} × {item.quantity}</span><strong>₹{Number(item.product?.discountPrice || item.product?.price || 0) * Number(item.quantity || 1)}</strong></div>)}<h2>Total: ₹{total}</h2></aside></div></div></section>;
}
