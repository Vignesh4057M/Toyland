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
  const [paymentMethod, setPaymentMethod] = useState(
  "Cash on Delivery"
);

  useEffect(() => { if (!buyNow) api.get("/cart").then((res) => setCartItems(res.data)).catch(() => setCartItems([])); }, [buyNow]);
  const products = buyNow ? [{ product: buyNow, quantity: 1 }] : cartItems;
  const total = useMemo(() => products.reduce((sum, item) => sum + Number(item.product?.discountPrice || item.product?.price || 0) * Number(item.quantity || 1), 0), [products]);
  const handleChange = (e) => setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

 const placeOrder = async (e) => {
  e.preventDefault();

  // ==========================
  // CASH ON DELIVERY
  // ==========================
  if (paymentMethod === "Cash on Delivery") {
    try {
      await api.post("/orders", {
        items: products.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
          price:
            item.product.discountPrice ||
            item.product.price,
        })),

        amount: total,

        adtoys: {
          fullName: address.fullName,
          phone: address.phone,
          alternatePhone:
            address.alternatePhone || "",
          address: address.address,
          city: address.city,
          district: address.district,
          state: address.state,
          pincode: address.pincode,
        },

        paymentMethod: "Cash on Delivery",
        paymentStatus: "Pending",
      });

      // alert("Order Placed Successfully");
     navigate("/success", {
  state: {
    type: "order",
  },
});
    } catch (err) {
      console.log(err);

      // alert("Unable to place order");
      navigate("/success", {
  state: {
    type: "error",
    message: "Unable to place order",
  },
});
    }

    return;
  }

  // ==========================
  // ONLINE PAYMENT (RAZORPAY)
  // ==========================

  try {
    const { data } = await api.post(
      "/payment/create-order",
      {
        amount: total,
      }
    );

    const options = {
      key: "rzp_test_TDGQRiQ8iKsda7",

      amount: data.amount,

      currency: data.currency,

      name: "ToyLand",

      description: "Toy Purchase",

      order_id: data.id,

      prefill: {
        name: address.fullName,
        contact: address.phone,
      },

      theme: {
        color: "#ff6b35",
      },

      handler: async function (response) {
        try {
          await api.post("/payment/verify", {
            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_signature:
              response.razorpay_signature,
          });

          await api.post("/orders", {
            items: products.map((item) => ({
              product: item.product._id,
              quantity: item.quantity,
              price:
                item.product.discountPrice ||
                item.product.price,
            })),

            amount: total,

            adtoys: {
              fullName: address.fullName,
              phone: address.phone,
              alternatePhone:
                address.alternatePhone || "",
              address: address.address,
              city: address.city,
              district: address.district,
              state: address.state,
              pincode: address.pincode,
            },

            paymentMethod: "Razorpay",

            paymentStatus: "Paid",

            razorpayPaymentId:
              response.razorpay_payment_id,
          });

          // alert("Payment Successful");
          navigate("/success", {
  state: {
    type: "payment-success",
  },
});
          
        } catch (err) {
          console.log(err);

          // alert("Payment Verification Failed");
          navigate("/success", {
  state: {
    type: "payment-failed",
  },
});
        }
      },

      modal: {
        ondismiss: function () {
          // alert("Payment Cancelled");
          navigate("/success", {
  state: {
    type: "payment-cancelled",
  },
});
        },
      },
    };

    const razorpay = new window.Razorpay(
      options
    );

    razorpay.open();
  } catch (err) {
    console.log("FULL ERROR:", err);
    console.log("Response:", err.response);
    console.log("Data:", err.response?.data);

    // alert("Unable to start payment");
    navigate("/success", {
  state: {
    type: "payment-error",
  },
});
  }
};

  return (
  <section className="toy-checkout-page">
    <div className="container">
      <h1 className="toy-checkout-title">Checkout</h1>

      <div
        className="checkout-layout"
        style={{ marginTop: 24 }}
      >
 <form
  className="toy-checkout-form"
  onSubmit={placeOrder}
>
          <h2>Shipping Details</h2>

          <div className="checkout-grid">

            <input
  className="toy-checkout-input"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              placeholder="Full name"
              required
            />

            <input
  className="toy-checkout-input"
              name="phone"
              value={address.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />

            <textarea
             className="toy-checkout-input"
              name="address"
              value={address.address}
              onChange={handleChange}
              placeholder="Address"
              required
            />

            <input
  className="toy-checkout-input"
              name="city"
              value={address.city}
              onChange={handleChange}
              placeholder="City"
              required
            />

            <input
  className="toy-checkout-input"
              name="district"
              value={address.district}
              onChange={handleChange}
              placeholder="District"
            />

            <input
  className="toy-checkout-input"
              name="state"
              value={address.state}
              onChange={handleChange}
              placeholder="State"
            />

            <input
  className="toy-checkout-input"
              name="pincode"
              value={address.pincode}
              onChange={handleChange}
              placeholder="Pincode"
              required
            />

            {/* Payment Method */}

            <div className="payment-method-box">

              <h3>Select Payment Method</h3>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={
                    paymentMethod ===
                    "Cash on Delivery"
                  }
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                Cash on Delivery
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="Razorpay"
                  checked={
                    paymentMethod ===
                    "Razorpay"
                  }
                  onChange={(e) =>
                    setPaymentMethod(e.target.value)
                  }
                />

                Online Payment
                <small>
                  (UPI / Card / Wallet /
                  NetBanking)
                </small>
              </label>

            </div>

            <button
  className="toy-checkout-submit-btn"
  type="submit"
>
              {paymentMethod === "Razorpay"
                ? `Pay ₹${total}`
                : "Place Order"}
            </button>

          </div>
        </form>

       <aside className="toy-checkout-summary">

          <h2>Products</h2>

          {products.map((item) => (
            <div
              className="checkout-summary-item"
              key={item.product?._id}
            >
              <span>
                {item.product?.name} ×{" "}
                {item.quantity}
              </span>

              <strong>
                ₹
                {Number(
                  item.product?.discountPrice ||
                    item.product?.price ||
                    0
                ) *
                  Number(
                    item.quantity || 1
                  )}
              </strong>
            </div>
          ))}

          <h2>Total: ₹{total}</h2>

        </aside>

      </div>
    </div>
  </section>
);
}
