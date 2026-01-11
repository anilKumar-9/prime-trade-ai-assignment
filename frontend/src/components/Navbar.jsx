import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clear auth state
    navigate("/login"); // redirect to login
  };

  if (!user) return null;

  return (
    <nav className="bg-card border-b border-border px-6 py-4 flex justify-between items-center">
      <span className="text-accent font-bold text-lg">Prime Trade AI</span>

      <button
        onClick={handleLogout}
        className="bg-danger px-4 py-2 rounded text-white font-semibold hover:opacity-90"
      >
        Logout
      </button>
    </nav>
  );
}
