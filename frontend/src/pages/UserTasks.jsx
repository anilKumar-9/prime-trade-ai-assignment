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
        setError("Unable to fetch your tasks. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, []);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">My Tasks</h2>

          {/* Error State */}
          {error && (
            <div className="mb-4 rounded-lg bg-red-100 text-red-700 px-4 py-3">
              {error}
            </div>
          )}

          {/* Loading State */}
          {loading && <p className="text-gray-500">Loading your tasks...</p>}

          {/* Empty State */}
          {!loading && tasks.length === 0 && !error && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium">No tasks assigned yet</p>
              <p className="text-sm mt-1">
                Once admin assigns tasks, they’ll appear here.
              </p>
            </div>
          )}

          {/* Tasks Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {task.title}
                </h3>

                <p className="text-sm text-gray-600 leading-relaxed">
                  {task.description}
                </p>

                <div className="mt-4 text-xs text-gray-400">
                  Assigned by Admin
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
