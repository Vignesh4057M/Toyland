import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api, { imgUrl } from "../api/api";
import "./Cart.css";

export default function Cart() {
  const [items, setItems] = useState([]);
  const loadCart = () => api.get("/cart").then((res) => setItems(res.data)).catch(() => setItems([]));
  useEffect(() => { loadCart(); }, []);

  const updateQty = async (item, quantity) => { if (quantity < 1) return; await api.put(`/cart/${item._id}`, { quantity }); loadCart(); }
  const removeItem = async (id) => { await api.delete(`/cart/${id}`); loadCart(); };
  const total = useMemo(() => items.reduce((sum, item) => sum + Number(item.product?.discountPrice || item.product?.price || 0) * Number(item.quantity || 1), 0), [items]);

  return (
    <section className="toy-cart-page">
      <div className="container">
        <h1 className="toy-cart-title">My Cart</h1>
        <p className="toy-cart-subtitle">
  Review your selected toys before checkout.
</p>
        <div className="cart-layout" style={{ marginTop: 24 }}>
          <div className="cart-list">
            {items.length ? items.map((item) => <div className="toy-cart-item" key={item._id}>
              <img src={imgUrl(item.product?.images?.[0])} alt={item.product?.name} />
              <div><h3>{item.product?.name}</h3><p>₹{item.product?.discountPrice || item.product?.price}</p><div className="cart-qty"><button onClick={() => updateQty(item, item.quantity - 1)}>-</button><strong>{item.quantity}</strong><button onClick={() => updateQty(item, item.quantity + 1)}>+</button></div></div>
              <button
  className="toy-cart-remove-btn"
  onClick={() => removeItem(item._id)}
>
  Remove
</button>
            </div>) : <div className="toy-cart-empty-state">
  Cart is empty.
</div>}
          </div>
          <aside className="toy-cart-summary"><h2>Order Summary</h2><div className="cart-summary-row"><span>Items</span><strong>{items.length}</strong></div><div className="cart-summary-row cart-total"><span>Total</span><span>₹{total}</span></div><Link
  className="toy-cart-checkout-btn"
  to="/checkout"
  style={{ width: "100%" }}
>
  Checkout
</Link></aside>
        </div>
      </div>
    </section>
  );
}
