import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api, { imgUrl } from "../../api/api";
import "./AdminOrderDetails.css";

export default function AdminOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/admin/orders/${id}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <section className="admin-order-page">
        <div className="admin-order-container">
          <div className="admin-loading">
            Loading...
          </div>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="admin-order-page">
        <div className="admin-order-container">
          <div className="admin-loading">
            Order not found
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-order-page">
      <div className="admin-order-container">

        <div className="admin-order-header">
          <div>
            <h1>
              Order #{order._id.slice(-6)}
            </h1>

            <p>
              {new Date(
                order.createdAt
              ).toLocaleString()}
            </p>
          </div>

          <span className="status-badge">
            {order.orderStatus}
          </span>
        </div>

        <div className="admin-order-grid">

          {/* USER */}

          <div className="info-card">
            <h3>Customer Details</h3>

            <p>
              <strong>Name :</strong>{" "}
              {order.user?.name}
            </p>

            <p>
              <strong>Phone :</strong>{" "}
              {order.user?.phone}
            </p>

            <p>
              <strong>Email :</strong>{" "}
              {order.user?.email}
            </p>
          </div>

          {/* ADDRESS */}

          <div className="info-card">

            <h3>Delivery Address</h3>

            <p>{order.adtoys?.fullName}</p>

<p>{order.adtoys?.phone}</p>

<p>{order.adtoys?.alternatePhone}</p>

<p>{order.adtoys?.adtoys}</p>

<p>
  {order.adtoys?.city},
  {" "}
  {order.adtoys?.district}
</p>

<p>{order.adtoys?.state}</p>

<p>{order.adtoys?.pincode}</p>
          </div>

          {/* PAYMENT */}

          <div className="info-card">
  <h3>Payment Details</h3>

  <p>
    <strong>Method :</strong>{" "}
    {order.paymentMethod}
  </p>

  <p>
    <strong>Status :</strong>{" "}
    {order.paymentStatus}
  </p>

  <p>
    <strong>Total :</strong> ₹
    {order.amount}
  </p>

  <p>
    <strong>Delivery :</strong>{" "}
    {order.deliveryStatus}
  </p>
</div>

{/* CANCELLATION DETAILS */}

{order.orderStatus === "Cancelled" && (
  <div className="info-card">
    <h3>Cancellation Details</h3>

    <p>
      <strong>Reason :</strong>{" "}
      {order.cancelReason || "-"}
    </p>

    {order.cancelReason === "Other" && (
      <p>
        <strong>Customer Note :</strong>{" "}
        {order.cancelNote || "-"}
      </p>
    )}

    <p>
      <strong>Cancelled On :</strong>{" "}
      {order.cancelledAt
        ? new Date(order.cancelledAt).toLocaleString()
        : "-"}
    </p>
  </div>
)}

        </div>

        <div className="items-section">

          <h2>Ordered Products</h2>

          {order.items.map((item) => (

            <div
              className="product-card"
              key={item._id}
            >

              <img
                src={
                  item.product?.images?.length
                    ? imgUrl(
                        item.product.images[0]
                      )
                    : "/placeholder.png"
                }
                alt={item.product?.name}
              />

              <div className="product-info">

                <h3>
                  {item.product?.name}
                </h3>

                <p>
                  Quantity :
                  {" "}
                  {item.quantity}
                </p>

                <p>
                  Price :
                  {" "}
                  ₹{item.price}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}