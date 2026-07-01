import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import "./AdminCommon.css";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  const loadOrders = () => {
    api
      .get("/admin/orders")
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, orderStatus) => {
    try {
      await api.put(`/admin/orders/${id}/status`, {
        orderStatus,
      });

      loadOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <div className="hero-panel admin-hero">
        <p>Order Management</p>
        <h1>Orders</h1>
        <p>Update delivery and order status.</p>
      </div>

      <div className="orders-list">
        {orders.length ? (
          orders.map((order) => (
            <div
              className="card order-card"
              key={order._id}
            >
              <div className="order-head">
                <div>
                  <strong>
                    {order.user?.name || "User"}
                  </strong>

                  <p>
                    ₹{order.amount} •{" "}
                    {order.paymentMethod ||
                      "Cash on Delivery"}
                  </p>

                  <small>
                    Order ID :
                    {order._id.slice(-8)}
                  </small>
                </div>

                <select
                  className="input"
                  style={{ maxWidth: 220 }}
                  value={
                    order.orderStatus ||
                    "Pending"
                  }
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                >
                  <option value="Order Placed">
                    Order Placed
                  </option>

                  <option value="Processing">
                    Processing
                  </option>

                  <option value="Shipped">
                    Shipped
                  </option>

                  <option value="Out For Delivery">
                    Out For Delivery
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>

                  <option value="Cancelled">
                    Cancelled
                  </option>
                </select>
              </div>

              <div
                style={{
                  marginTop: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <span>
                  <strong>Status :</strong>{" "}
                  {order.orderStatus}
                </span>

                <button
                  className="btn-primary"
                  onClick={() =>
                    navigate(
                      `/admin/orders/${order._id}`
                    )
                  }
                >
                  View Details
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="card empty-state">
            No orders found.
          </div>
        )}
      </div>
    </section>
  );
}