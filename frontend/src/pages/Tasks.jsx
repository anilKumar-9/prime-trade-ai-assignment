import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/register", form);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          📝 Create an Account
        </h2>

        {error && <p className="error-box mb-4">{error}</p>}

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            className="input w-full"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input w-full"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="input w-full"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <p className="text-sm text-muted text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-accent font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
