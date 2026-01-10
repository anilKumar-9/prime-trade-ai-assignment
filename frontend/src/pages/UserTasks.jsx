import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function UserTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  if (!user) return <Navigate to="/login" />;
  if (user.role !== "USER") return <Navigate to="/admin/tasks" />;

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data.data || []);
      } catch {
        setError("Failed to load tasks");
      }
    };

    loadTasks();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-bg p-6">
        <h2 className="text-2xl font-bold mb-4">My Tasks</h2>

        {error && <p className="error-box">{error}</p>}
        {tasks.length === 0 && !error && <p>No tasks assigned</p>}

        <div className="grid gap-4">
          {tasks.map((task) => (
            <div key={task._id} className="card">
              <h3 className="font-semibold">{task.title}</h3>
              <p className="text-muted">{task.description}</p>
              <span className="text-sm">Status: {task.status}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
