import React, { useEffect, useState } from "react";
import api from "../../api/api";
import "./AdminCommon.css";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  useEffect(() => { api.get("/admin/users").then((res) => setUsers(res.data)).catch(() => setUsers([])); }, []);
  return <section><div className="hero-panel admin-hero"><p>User Management</p><h1>Users</h1><p>View registered ToyLand customers.</p></div><div className="table-wrap"><table><thead><tr><th>Name</th><th>Email</th><th>Phone</th><th>Joined</th></tr></thead><tbody>{users.map((user) => <tr key={user._id}><td>{user.name}</td><td>{user.email || "-"}</td><td>{user.phone}</td><td>{new Date(user.createdAt).toLocaleDateString()}</td></tr>)}</tbody></table></div></section>;
}
