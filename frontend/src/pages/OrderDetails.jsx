import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { imgUrl } from "../api/api";
import "./OrderDetails.css";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
const [cancelReason, setCancelReason] = useState("");
const [cancelNote, setCancelNote] = useState("");
const [cancelLoading, setCancelLoading] = useState(false);
  
// handle concel order 
const handleCancelOrder = async () => {
  if (!cancelReason) {
    alert("Please select a cancellation reason.");
    return;
  }

  if (
    cancelReason === "Other" &&
    cancelNote.trim() === ""
  ) {
    alert("Please enter your reason.");
    return;
  }

  try {
    setCancelLoading(true);

    const res = await api.put(`/orders/${id}/cancel`, {
      cancelReason,
      cancelNote,
    });

    alert(res.data.message);

    setOrder(res.data.order);

    setShowCancelModal(false);

    setCancelReason("");

    setCancelNote("");
  } catch (err) {
    alert(
      err.response?.data?.message ||
      "Failed to cancel order."
    );
  } finally {
    setCancelLoading(false);
  }
};

  useEffect(() => {
    api
      .get(`/orders/${id}`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(() => {
        setOrder(null);
        setLoading(false);
      });
  }, [id]);

  const isStepCompleted = (currentStatus, step) => {
    const steps = [
      "Order Placed",
      "Processing",
      "Shipped",
      "Delivered",
    ];

    return (
      steps.indexOf(currentStatus || "Order Placed") >=
      steps.indexOf(step)
    );
  };

  if (loading) {
    return (
      <section className="tl-order-page">
        <div className="tl-order-container">
          <div className="tl-order-card">
            Loading...
          </div>
        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="tl-order-page">
        <div className="tl-order-container">
          <div className="tl-order-card">
            Order not found
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="tl-order-page">
      <div className="tl-order-container">

        <button
          className="tl-order-back-btn"
          onClick={() => navigate("/orders")}
        >
          ← Back to Orders
        </button>

        <div className="tl-order-card">

          <div className="tl-order-header">
            <div>
              <h2>
                Order #{order._id.slice(-6)}
              </h2>

              <p>
                Ordered on{" "}
                {new Date(
                  order.createdAt
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="tl-order-status-badge">
              {order.orderStatus}
            </div>
          </div>

          <div className="tl-order-timeline">

            <div
              className={`tl-order-step ${
                isStepCompleted(
                  order.orderStatus,
                  "Order Placed"
                )
                  ? "active"
                  : ""
              }`}
            >
              Order Placed
            </div>

            <div
              className={`tl-order-step ${
                isStepCompleted(
                  order.orderStatus,
                  "Processing"
                )
                  ? "active"
                  : ""
              }`}
            >
              Processing
            </div>

            <div
              className={`tl-order-step ${
                isStepCompleted(
                  order.orderStatus,
                  "Shipped"
                )
                  ? "active"
                  : ""
              }`}
            >
              Shipped
            </div>

            <div
              className={`tl-order-step ${
                isStepCompleted(
                  order.orderStatus,
                  "Delivered"
                )
                  ? "active"
                  : ""
              }`}
            >
              Delivered
            </div>

          </div>

          <div className="tl-order-products">

            {order.items?.map((item, index) => (
              <div
                className="tl-order-product-card"
                key={item._id || index}
              >
                <img
                  src={
                    item.product?.images?.[0]
                      ? imgUrl(
                          item.product.images[0]
                        )
                      : item.image
                      ? imgUrl(item.image)
                      : "/placeholder.png"
                  }
                  alt={
                    item.product?.name ||
                    item.name
                  }
                  className="tl-order-product-image"
                />

                <div className="tl-order-product-info">
                  <h3>
                    {item.product?.name ||
                      item.name}
                  </h3>

                  <p>
                    Quantity : {item.quantity}
                  </p>

                  <p>
                    Price : ₹
                    {item.price ||
                      item.product?.price}
                  </p>
                </div>
              </div>
            ))}

          </div>

          <div className="tl-order-info-grid">

  <div className="tl-order-info-card">
    <h3>Shipping Address</h3>

    <p>{order.adtoys?.fullName}</p>
    <p>{order.adtoys?.phone}</p>
    <p>{order.adtoys?.adtoys}</p>
    <p>{order.adtoys?.city}</p>
    <p>{order.adtoys?.district}</p>
    <p>{order.adtoys?.state}</p>
    <p>{order.adtoys?.pincode}</p>
  </div>

  <div className="tl-order-info-card">
    <h3>Payment Details</h3>

    <p>
      <strong>Method :</strong> {order.paymentMethod}
    </p>

    <p>
      <strong>Status :</strong> {order.paymentStatus}
    </p>

    <p>
      <strong>Amount :</strong> ₹{order.amount}
    </p>

    {(order.orderStatus === "Order Placed" ||
      order.orderStatus === "Processing") && (
      <button
        className="tl-order-cancel-btn"
        onClick={() => setShowCancelModal(true)}
      >
        Cancel Order
      </button>
    )}
  </div>

</div>

        </div>
      </div>

            

      {showCancelModal && (
        <div className="tl-cancel-modal-overlay">
          <div className="tl-cancel-modal">

            <h2>Cancel Order</h2>

            <p>Please tell us why you're cancelling this order.</p>

            <div className="tl-cancel-options">

              <label>
                <input
                  type="radio"
                  name="cancelReason"
                  value="Ordered by mistake"
                  checked={cancelReason === "Ordered by mistake"}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
                Ordered by mistake
              </label>

              <label>
                <input
                  type="radio"
                  name="cancelReason"
                  value="Found a better price elsewhere"
                  checked={cancelReason === "Found a better price elsewhere"}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
                Found a better price elsewhere
              </label>

              <label>
                <input
                  type="radio"
                  name="cancelReason"
                  value="Delivery is taking too long"
                  checked={cancelReason === "Delivery is taking too long"}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
                Delivery is taking too long
              </label>

              <label>
                <input
                  type="radio"
                  name="cancelReason"
                  value="Product no longer needed"
                  checked={cancelReason === "Product no longer needed"}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
                Product no longer needed
              </label>

              <label>
                <input
                  type="radio"
                  name="cancelReason"
                  value="Other"
                  checked={cancelReason === "Other"}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
                Other
              </label>

            </div>

            {cancelReason === "Other" && (
              <textarea
                className="tl-cancel-textarea"
                placeholder="Please enter your reason..."
                value={cancelNote}
                onChange={(e) => setCancelNote(e.target.value)}
              />
            )}

            <div className="tl-cancel-buttons">

              <button
                className="tl-cancel-close-btn"
                onClick={() => {
                  setShowCancelModal(false);
                  setCancelReason("");
                  setCancelNote("");
                }}
              >
                Keep Order
              </button>

              <button
                className="tl-order-cancel-btn"
                onClick={handleCancelOrder}
                disabled={cancelLoading}
              >
                {cancelLoading ? "Cancelling..." : "Confirm Cancel"}
              </button>

            </div>

          </div>
        </div>
      )}

    
    </section>
  );
}