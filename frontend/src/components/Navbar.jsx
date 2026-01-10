import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears localStorage
    navigate("/login"); // redirect
  };

  if (!user) return null;

  return (
    <nav className="bg-card border-b border-border px-6 py-4 flex justify-between">
      <div className="flex gap-4 items-center">
        <Link to="/dashboard" className="text-accent font-bold">
          Prime Trade AI
        </Link>

        <Link to="/tasks" className="text-muted hover:text-white">
          Tasks
        </Link>

        {user.role === "ADMIN" && (
          <Link to="/admin" className="text-muted hover:text-white">
            Admin
          </Link>
        )}
      </div>

      <button
        onClick={handleLogout}
        className="bg-danger px-3 py-1 rounded text-white"
      >
        Logout
      </button>
    </nav>
  );
}
