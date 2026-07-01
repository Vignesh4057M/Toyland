import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import ProductDetails from "./pages/ProductDetails";
import Auth from "./pages/Auth";
import Cart from "./pages/Cart";
import Favourites from "./pages/Favourites";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import About from "./pages/About";
import Profile from "./pages/Profile";
import { AdminRoute, UserRoute } from "./routes/ProtectedRoute";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";

import EditProfile from "./pages/EditProfile";
import OrderDetails from "./pages/OrderDetails";
import ChangePassword from "./pages/ChangePassword";
import AddressManagement from "./pages/AddressManagement";

function UserLayout({ children }) {
  return <Layout>{children}</Layout>;
}

export default function App() {
  return (
    <AuthProvider>
      <Routes>

        {/* User Routes */}

        <Route
          path="/"
          element={
            <UserLayout>
              <Home />
            </UserLayout>
          }
        />

        <Route
          path="/shop"
          element={
            <UserLayout>
              <ProductList />
            </UserLayout>
          }
        />

        <Route
          path="/educational-toys"
          element={
            <UserLayout>
              <ProductList category="Educational Toys" />
            </UserLayout>
          }
        />

        <Route
          path="/action-figures"
          element={
            <UserLayout>
              <ProductList category="Action Figures" />
            </UserLayout>
          }
        />

        <Route
          path="/building-blocks"
          element={
            <UserLayout>
              <ProductList category="Building Blocks" />
            </UserLayout>
          }
        />

        <Route
          path="/soft-toys"
          element={
            <UserLayout>
              <ProductList category="Soft Toys" />
            </UserLayout>
          }
        />

        <Route
          path="/baby-toys"
          element={
            <UserLayout>
              <ProductList category="Baby Toys" />
            </UserLayout>
          }
        />

        <Route
          path="/outdoor-toys"
          element={
            <UserLayout>
              <ProductList category="Outdoor Toys" />
            </UserLayout>
          }
        />

        <Route
          path="/puzzle-toys"
          element={
            <UserLayout>
              <ProductList category="Puzzle Toys" />
            </UserLayout>
          }
        />

        <Route
          path="/remote-control-toys"
          element={
            <UserLayout>
              <ProductList category="Remote Control Toys" />
            </UserLayout>
          }
        />

        <Route
          path="/product/:id"
          element={
            <UserLayout>
              <ProductDetails />
            </UserLayout>
          }
        />

        <Route
          path="/login"
          element={
            <UserLayout>
              <Auth />
            </UserLayout>
          }
        />

        <Route
          path="/register"
          element={
            <UserLayout>
              <Auth registerMode />
            </UserLayout>
          }
        />

        <Route
          path="/about"
          element={
            <UserLayout>
              <About />
            </UserLayout>
          }
        />

        <Route
          path="/cart"
          element={
            <UserLayout>
              <UserRoute>
                <Cart />
              </UserRoute>
            </UserLayout>
          }
        />

        <Route
          path="/favourites"
          element={
            <UserLayout>
              <UserRoute>
                <Favourites />
              </UserRoute>
            </UserLayout>
          }
        />

        <Route
          path="/checkout"
          element={
            <UserLayout>
              <Checkout />
            </UserLayout>
          }
        />

        <Route
          path="/orders"
          element={
            <UserLayout>
              <UserRoute>
                <Orders />
              </UserRoute>
            </UserLayout>
          }
        />

        <Route
          path="/orders/:id"
          element={
            <UserLayout>
              <UserRoute>
                <OrderDetails />
              </UserRoute>
            </UserLayout>
          }
        />

        <Route
          path="/profile"
          element={
            <UserLayout>
              <UserRoute>
                <Profile />
              </UserRoute>
            </UserLayout>
          }
        />

        <Route
          path="/edit-profile"
          element={
            <UserLayout>
              <UserRoute>
                <EditProfile />
              </UserRoute>
            </UserLayout>
          }
        />

        <Route
          path="/change-password"
          element={
            <UserLayout>
              <UserRoute>
                <ChangePassword />
              </UserRoute>
            </UserLayout>
          }
        />

        <Route
          path="/addresses"
          element={
            <UserLayout>
              <UserRoute>
                <AddressManagement />
              </UserRoute>
            </UserLayout>
          }
        />

        {/* Admin */}

        <Route
          path="/admin/login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route
            index
            element={<Dashboard />}
          />

          <Route
            path="products"
            element={<AdminProducts />}
          />

          <Route
            path="orders"
            element={<AdminOrders />}
          />

          {/* NEW ROUTE */}
          <Route
            path="orders/:id"
            element={<AdminOrderDetails />}
          />

          <Route
            path="users"
            element={<AdminUsers />}
          />
        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={
            <UserLayout>
              <section className="page-section">
                <div className="container card empty-state">
                  Page not found
                </div>
              </section>
            </UserLayout>
          }
        />
      </Routes>
    </AuthProvider>
  );
}