import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function AdminPanelPage() {
  const { user: loggedInUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const promote = async (id) => {
    try {
      await api.put(`/users/${id}/promote`);
      alert("User promoted to admin");
      fetchUsers(); // 🔁 refresh list
    } catch (err) {
      alert(err.response?.data?.message || "Promotion failed");
    }
  };

  if (loading) return <p>Loading users...</p>;

  return (
    <div>
      <h2>Admin Panel</h2>

      {users.length === 0 && <p>No users found</p>}

      {users.map((u) => (
        <div key={u._id} style={{ marginBottom: "10px" }}>
          <b>{u.email}</b> — {u.role}
          {/* prevent self promotion */}
          {u.role !== "ADMIN" && u._id !== loggedInUser.id && (
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => promote(u._id)}
            >
              Promote
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
