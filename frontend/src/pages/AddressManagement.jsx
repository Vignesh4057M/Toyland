import React, { useEffect, useState } from "react";
import api from "../api/api";
import "./AddressManagement.css";

export default function AddressManagement() {
  const [addresses, setAddresses] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    alternatePhone: "",
    address: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
  });

  const [editingId, setEditingId] = useState(null);

  const loadAddresses = async () => {
    try {
      const res = await api.get("/address");
      setAddresses(res.data);
    } catch (error) {
      console.log(error);
      alert("Failed to load addresses");
    }
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const resetForm = () => {
    setForm({
      fullName: "",
      phone: "",
      alternatePhone: "",
      address: "",
      city: "",
      district: "",
      state: "",
      pincode: "",
    });

    setEditingId(null);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await api.put(
          `/address/${editingId}`,
          form
        );

        alert(
          "Address updated successfully"
        );
      } else {
        await api.post(
          "/address",
          form
        );

        alert(
          "Address added successfully"
        );
      }

      resetForm();
      loadAddresses();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const editAddress = (address) => {
    setEditingId(address._id);

    setForm({
      fullName: address.fullName || "",
      phone: address.phone || "",
      alternatePhone:
        address.alternatePhone || "",
      address: address.address || "",
      city: address.city || "",
      district: address.district || "",
      state: address.state || "",
      pincode: address.pincode || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const deleteAddress = async (id) => {
    const confirmDelete =
      window.confirm(
        "Delete this address?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/address/${id}`
      );

      alert(
        "Address deleted successfully"
      );

      loadAddresses();
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  return (
    <section className="page-section">
      <div className="container">
        <h1 className="page-title">
          Manage Addresses
        </h1>

        <form
          className="address-form"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="alternatePhone"
            placeholder="Alternate Phone"
            value={form.alternatePhone}
            onChange={handleChange}
          />

          <textarea
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="district"
            placeholder="District"
            value={form.district}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={form.pincode}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editingId
              ? "Update Address"
              : "Add Address"}
          </button>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
            >
              Cancel Edit
            </button>
          )}
        </form>

        <div className="address-list">
          {addresses.length > 0 ? (
            addresses.map((address) => (
              <div
                className="address-card"
                key={address._id}
              >
                <h3>
                  {address.fullName}
                </h3>

                <p>
                  📞 {address.phone}
                </p>

                {address.alternatePhone && (
                  <p>
                    Alt :
                    {
                      address.alternatePhone
                    }
                  </p>
                )}

                <p>
                  {address.address}
                </p>

                <p>
                  {address.city},{" "}
                  {address.district}
                </p>

                <p>
                  {address.state} -{" "}
                  {address.pincode}
                </p>

                <div className="address-actions">
                  <button
                    type="button"
                    onClick={() =>
                      editAddress(
                        address
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      deleteAddress(
                        address._id
                      )
                    }
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="address-card">
              No addresses found
            </div>
          )}
        </div>
      </div>
    </section>
  );
}