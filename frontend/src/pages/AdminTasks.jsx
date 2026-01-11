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

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks"); // ADMIN → get all tasks
        setTasks(res.data.data || []);
      } catch (err) {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">📋 Admin Tasks</h1>

          <Link
            to="/admin/create-task"
            className="bg-accent text-black px-4 py-2 rounded font-semibold"
          >
            + Create Task
          </Link>
        </div>

        {loading && <p>Loading tasks...</p>}
        {error && <p className="error-box">{error}</p>}
        {!loading && tasks.length === 0 && <p>No tasks found</p>}

        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="card">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{task.title}</h3>

                <span
                  className={`text-sm px-3 py-1 rounded ${
                    task.status === "COMPLETED"
                      ? "bg-green-200 text-green-800"
                      : task.status === "IN_PROGRESS"
                      ? "bg-blue-200 text-blue-800"
                      : "bg-yellow-200 text-yellow-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>

              <p className="text-muted mb-2">
                {task.description || "No description"}
              </p>

              <p className="text-sm">
                Assigned to:{" "}
                <span className="font-semibold">
                  {task.assignedTo?.name ||
                    task.assignedTo?.email ||
                    "Unassigned"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
