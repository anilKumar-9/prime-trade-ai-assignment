import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function CreateTaskAdmin() {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔐 Admin protection
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "ADMIN") return <Navigate to="/user/tasks" />;

  // 🔹 Fetch users for assignment
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data.data || []);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔹 Create task
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !userId) {
      alert("Title and assigned user are required");
      return;
    }

    try {
      await api.post("/tasks", {
        title,
        description,
        userId, // 🔥 IMPORTANT: assignment happens here
      });

      alert("Task created successfully");

      // reset form
      setTitle("");
      setDescription("");
      setUserId("");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create task");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bg p-6">
        <h1 className="text-2xl font-bold mb-6">➕ Create Task (Admin)</h1>

        {loading && <p>Loading users...</p>}
        {error && <p className="error-box">{error}</p>}

        {!loading && (
          <form
            onSubmit={handleSubmit}
            className="max-w-md bg-card p-6 rounded space-y-4"
          >
            {/* Title */}
            <div>
              <label className="block mb-1 font-semibold">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full"
                placeholder="Enter task title"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-1 font-semibold">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="input w-full"
                placeholder="Enter task description"
                rows={3}
              />
            </div>

            {/* Assign User */}
            <div>
              <label className="block mb-1 font-semibold">Assign to User</label>
              <select
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="input w-full"
                required
              >
                <option value="">Select user</option>
                {users.map((u) => (
                  <option key={u._id} value={u._id}>
                    {u.name} ({u.email})
                  </option>
                ))}
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="bg-accent text-black px-4 py-2 rounded font-semibold w-full"
            >
              Create Task
            </button>
          </form>
        )}
      </div>
    </>
  );
}
