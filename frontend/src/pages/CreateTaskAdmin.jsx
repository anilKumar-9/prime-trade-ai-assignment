import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function CreateTaskAdmin() {
  const { user } = useAuth();

  // 🔐 Route protection
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "ADMIN") return <Navigate to="/dashboard" />;

  // 📦 State
  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("PENDING");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [creating, setCreating] = useState(false);

  // 👑 Load users
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await api.get("/users");
        const normalUsers = res.data.data.filter((u) => u.role === "USER");

        setUsers(normalUsers);

        // ✅ AUTO SELECT FIRST USER
        if (normalUsers.length > 0) {
          setUserId(normalUsers[0]._id);
        }
      } catch {
        setError("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };

    loadUsers();
  }, []);

  // 🧠 Create task
  const handleCreate = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    if (!userId) {
      setError("Please select a user");
      return;
    }

    if (creating) return;

    try {
      setCreating(true);

      await api.post("/tasks", {
        title,
        description,
        userId,
        status,
      });

      setSuccess("Task created successfully 🎉");

      setTitle("");
      setDescription("");
      setStatus("PENDING");

      // keep user selected (admin convenience)
    } catch (err) {
      setError(err.response?.data?.message || "Task creation failed");
    } finally {
      setCreating(false);
    }
  };

  // 👤 Selected user details
  const selectedUser = users.find((u) => u._id === userId);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bg p-6 flex justify-center">
        <form onSubmit={handleCreate} className="card w-full max-w-lg">
          <h2 className="page-title">Create Task (Admin)</h2>

          {error && <div className="error-box mb-3">{error}</div>}
          {success && <div className="success-box mb-3">{success}</div>}

          {/* Title */}
          <input
            placeholder="Task Title *"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-3"
          />

          {/* Description */}
          <textarea
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-3"
          />

          {/* Assign User */}
          <select
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={loadingUsers || users.length === 0}
            className="mb-2"
          >
            {loadingUsers && <option>Loading users...</option>}
            {!loadingUsers && users.length === 0 && (
              <option>No users available</option>
            )}

            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.name} ({u.email})
              </option>
            ))}
          </select>

          {/* 👤 Selected User Preview */}
          {selectedUser && (
            <div className="mb-3 text-sm text-gray-500">
              Assigned to: <b>{selectedUser.name}</b> — {selectedUser.email}
            </div>
          )}

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="mb-4"
          >
            <option value="PENDING">Pending</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
          </select>

          {/* Submit */}
          <button
            type="submit"
            className="w-full"
            disabled={creating || users.length === 0}
          >
            {creating ? "Creating Task..." : "Create Task"}
          </button>
        </form>
      </div>
    </>
  );
}
