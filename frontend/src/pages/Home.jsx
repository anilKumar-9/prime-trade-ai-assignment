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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-screen flex items-center justify-center bg-bg px-6">
      <div className="w-full max-w-md">
        {/* 🔐 Register Card */}
        <form
          onSubmit={handleSubmit}
          className="bg-card border border-border rounded-xl p-6"
        >
          <h2 className="text-2xl font-bold text-center mb-2">
            📝 Create an Account
          </h2>

          <p className="text-sm text-muted text-center mb-6">
            Register as a user to receive and view assigned tasks
          </p>

          {error && <p className="error-box mb-4">{error}</p>}

          <div className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Full Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="input w-full"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1">Email</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="input w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="input w-full"
                required
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full"
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </div>

          <p className="text-sm text-muted text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-accent font-semibold">
              Login
            </Link>
          </p>
        </form>

        {/* 📘 Demo Instructions */}
        <div className="mt-6 bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold mb-2">🔎 How to Test This Project</h3>

          <ul className="text-sm text-muted space-y-2 list-disc list-inside">
            <li>
              Login using the <b>Super Admin</b> credentials provided in the
              README.
            </li>
            <li>As Admin, create tasks and assign them to registered users.</li>
            <li>Register a new user here and login as that user.</li>
            <li>Verify that the user can view only their assigned tasks.</li>
            <li>Admin can view and delete all tasks.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
