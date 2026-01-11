import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function CreateTaskAdmin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  const [users, setUsers] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔐 Admin protection
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "ADMIN") return <Navigate to="/user/tasks" />;

  // 🔹 Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/users");
        setUsers(res.data.data || []);
      } catch {
        setError("Failed to load users");
      } finally {
        setLoadingUsers(false);
      }
    };

    fetchUsers();
  }, []);

  // 🔹 Create task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!title || !userId) {
      setError("Title and assigned user are required");
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/tasks", {
        title,
        description,
        userId,
      });

      setSuccess("Task created successfully");

      setTitle("");
      setDescription("");
      setUserId("");

      // Redirect to admin tasks after short delay
      setTimeout(() => navigate("/admin/tasks"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bg p-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-2xl font-bold mb-6">➕ Create Task (Admin)</h1>

          <div className="card max-w-md">
            {loadingUsers && <p>Loading users...</p>}
            {error && <p className="error-box mb-4">{error}</p>}
            {success && (
              <p className="bg-green-900 text-green-300 px-3 py-2 rounded mb-4">
                {success}
              </p>
            )}

            {!loadingUsers && (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Title */}
                <div>
                  <label className="block mb-1 font-semibold">Task Title</label>
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
                  <label className="block mb-1 font-semibold">
                    Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="input w-full"
                    placeholder="Enter task description"
                    rows={4}
                  />
                </div>

                {/* Assign User */}
                <div>
                  <label className="block mb-1 font-semibold">
                    Assign to User
                  </label>
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
                  disabled={submitting}
                  className="btn btn-primary w-full"
                >
                  {submitting ? "Creating Task..." : "Create Task"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
