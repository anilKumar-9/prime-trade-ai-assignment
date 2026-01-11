import { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function AdminTasks() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔐 Admin protection
  if (!user) return <Navigate to="/login" />;
  if (user.role !== "ADMIN") return <Navigate to="/user/tasks" />;

  // 🔹 Load all tasks (ADMIN)
  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks/all");
      setTasks(res.data.data || []);
    } catch {
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔥 Delete task (ADMIN)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks(); // refresh list
    } catch {
      alert("Failed to delete task");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📋 Admin Tasks</h1>

          <Link to="/admin/create-task" className="btn btn-primary">
            + Create Task
          </Link>
        </div>

        {loading && <p>Loading tasks...</p>}
        {error && <p className="error-box">{error}</p>}
        {!loading && tasks.length === 0 && <p>No tasks found</p>}

        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="card">
              <h3 className="text-lg font-semibold mb-1">{task.title}</h3>

              <p className="text-muted mb-2">
                {task.description || "No description"}
              </p>

              <p className="text-sm mb-3">
                Assigned to:{" "}
                <span className="font-semibold">
                  {task.userId?.name || "Unknown"}
                </span>
                {task.userId?.email && (
                  <span className="text-muted text-xs">
                    {" "}
                    ({task.userId.email})
                  </span>
                )}
              </p>

              <button
                onClick={() => handleDelete(task._id)}
                className="btn btn-danger"
              >
                Delete Task
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
