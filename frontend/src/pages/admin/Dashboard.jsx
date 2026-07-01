import React, { useEffect, useState } from "react";
import { IndianRupee, Package, ShoppingBag, Users } from "lucide-react";
import api from "../../api/api";
import "./AdminCommon.css";

const iconMap = { totalIncome: IndianRupee, totalProducts: Package, totalUsers: Users, todayTotalOrders: ShoppingBag, pendingOrders: ShoppingBag, deliveredOrders: ShoppingBag, cancelledOrders: ShoppingBag };
export default function Dashboard() {
  const [summary, setSummary] = useState({});
  useEffect(() => { api.get("/admin/summary").then((res) => setSummary(res.data)).catch(() => setSummary({})); }, []);
  return <section><div className="hero-panel admin-hero"><p>Admin Dashboard</p><h1>Store Overview</h1><p>Track income, orders, products and users.</p></div><div className="grid-4">{Object.entries(summary).map(([key,value]) => { const Icon = iconMap[key] || ShoppingBag; return <div className="card stat-card" key={key}><div className="stat-icon"><Icon /></div><div className="stat-label">{key.replace(/([A-Z])/g," $1")}</div><div className="stat-value">{value}</div></div>; })}</div></section>;
}
