import React, { useEffect, useState } from "react";
import api, { imgUrl } from "../api/api";
import "./Orders.css";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/orders/my-orders")
      .then((res) => setOrders(res.data))
      .catch(() => setOrders([]));
  }, []);

 const getStatusClass = (status) => {
  switch (status) {
    case "Delivered":
      return "toy-status-delivered";

    case "Cancelled":
      return "toy-status-cancelled";

    case "Shipped":
      return "toy-status-shipped";

    case "Processing":
      return "toy-status-processing";

    default:
      return "toy-status-pending";
  }
};
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

  return (
    <section className="toy-orders-page">
      <div className="toy-orders-container">
<h1 className="toy-orders-title">My Orders</h1>

        <p className="toy-orders-subtitle">
          Track and manage your ToyLand orders.
        </p>

        <div className="orders-list">
          {orders.length ? (
            orders.map((order) => (
              <div
  className="toy-order-card"
  key={order._id}
>
               <div className="toy-order-product-details">
                  <div>
                    <h3>
                      Order #
                      {order._id.slice(-6)}
                    </h3>

                    <p className="order-date">
                      Ordered on{" "}
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>

                    <p className="order-amount">
                      Total Amount : ₹
                      {order.amount}
                    </p>
                  </div>

                  <span
                    className={`order-status ${getStatusClass(
                      order.orderStatus
                    )}`}
                  >
                    {order.orderStatus ||
                      "Order Placed"}
                  </span>
                </div>

                <div className="order-products">
                  {order.items?.map(
                    (item, index) => (
                      <div
                        className="order-product"
                        key={
                          item._id || index
                        }
                      >
                        <img
                          src={
                            item.product
                              ?.images?.[0]
                              ? imgUrl(
                                  item.product
                                    .images[0]
                                )
                              : item.image
                              ? imgUrl(
                                  item.image
                                )
                              : "/placeholder.png"
                          }
                          alt={
                            item.product
                              ?.name ||
                            item.name
                          }
                          className="toy-order-image"
                        />

                        <div className="product-details">
                          <h4>
                            {item.product
                              ?.name ||
                              item.name ||
                              "Toy Product"}
                          </h4>

                          <p>
                            Quantity :{" "}
                            {item.quantity}
                          </p>

                          {(item.price ||
                            item.product
                              ?.price) && (
                            <p>
                              Price : ₹
                              {item.price ||
                                item.product
                                  ?.price}
                            </p>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </div>

                <div className="order-footer">
                  <div>
                    <strong>
                      Payment :
                    </strong>{" "}
                    {order.paymentMethod}
                  </div>

                  <div>
                    <strong>
                      Payment Status :
                    </strong>{" "}
                    {order.paymentStatus}
                  </div>
                </div>

                <div className="order-action">
  <button
    className="view-order-btn"
    onClick={() => navigate(`/orders/${order._id}`)}
  >
    View Details
  </button>
</div>

                <div className="order-timeline">
                  <div
                    className={`timeline-step ${
                      isStepCompleted(
                        order.orderStatus,
                        "Order Placed"
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className="timeline-icon">
                      ✓
                    </div>

                    <span>
                      Order Placed
                    </span>
                  </div>

                  <div
                    className={`timeline-step ${
                      isStepCompleted(
                        order.orderStatus,
                        "Processing"
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className="timeline-icon">
                      ✓
                    </div>

                    <span>
                      Processing
                    </span>
                  </div>

                  <div
                    className={`timeline-step ${
                      isStepCompleted(
                        order.orderStatus,
                        "Shipped"
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className="timeline-icon">
                      ✓
                    </div>

                    <span>Shipped</span>
                  </div>

                  <div
                    className={`timeline-step ${
                      isStepCompleted(
                        order.orderStatus,
                        "Delivered"
                      )
                        ? "active"
                        : ""
                    }`}
                  >
                    <div className="timeline-icon">
                      ✓
                    </div>

                    <span>
                      Delivered
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="toy-orders-empty-state">
  No orders found.
</div>
          )}
        </div>
      </div>
      
    </section>
  );
}