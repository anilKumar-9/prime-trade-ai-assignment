import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-card p-6 rounded-xl border border-border"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          🔐 Login to Prime Trade AI
        </h2>

        {error && <p className="error-box mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="input w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="input w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>

        <p className="text-sm text-muted text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/register" className="text-accent font-semibold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
