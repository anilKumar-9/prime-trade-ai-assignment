import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  const { user } = useAuth();

  // 🔐 Safety check
  if (!user) {
    return <Navigate to="/login" />;
  }

  const taskPath = user.role === "ADMIN" ? "/admin/tasks" : "/user/tasks";

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-bg p-6">
        <h1 className="text-3xl font-bold mb-2">
          Welcome, <span className="text-accent">{user.name}</span>
        </h1>

        <p className="text-muted mb-6">
          Role: <span className="font-semibold">{user.role}</span>
        </p>

        <div className="grid gap-4 md:grid-cols-3 max-w-4xl">
          {/* Tasks */}
          <div className="card">
            <h2 className="text-lg font-semibold mb-2">📋 Tasks</h2>
            <p className="text-muted text-sm mb-4">
              {user.role === "ADMIN"
                ? "View and manage all tasks."
                : "View and manage your assigned tasks."}
            </p>

            <Link
              to={taskPath}
              className="inline-block bg-accent text-black px-4 py-2 rounded"
            >
              Go to Tasks
            </Link>
          </div>

          {/* Admin Panel */}
          {user.role === "ADMIN" && (
            <div className="card">
              <h2 className="text-lg font-semibold mb-2">🛠 Admin Panel</h2>
              <p className="text-muted text-sm mb-4">
                Manage users and assign tasks.
              </p>
              <Link
                to="/admin"
                className="inline-block bg-accent text-black px-4 py-2 rounded"
              >
                Go to Admin Panel
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
