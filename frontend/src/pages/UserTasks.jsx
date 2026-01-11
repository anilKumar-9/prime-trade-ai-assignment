import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function UserTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "USER") return <Navigate to="/admin/tasks" />;

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data.data || []);
      } catch {
        setError("Failed to load tasks");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#0b1220] px-6 py-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">My Tasks</h2>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-900/40 text-red-300 px-4 py-3">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading && <p className="text-gray-400">Loading tasks...</p>}

          {/* Empty */}
          {!loading && tasks.length === 0 && !error && (
            <p className="text-gray-400">No tasks assigned yet.</p>
          )}

          {/* Tasks */}
          <div className="grid gap-5 sm:grid-cols-2">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="rounded-xl border border-white/10 bg-gradient-to-br from-[#0f172a] to-[#020617] p-5"
              >
                <h3 className="text-lg font-semibold text-white mb-2">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-300 leading-relaxed">
                  {task.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
