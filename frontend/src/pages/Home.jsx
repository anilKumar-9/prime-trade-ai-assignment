import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
          Prime Trade AI
        </h1>

        <p className="text-muted text-lg mb-8">
          A role-based task & project management platform with secure
          authentication, admin controls, and modern dark UI.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="card">
            <h3 className="font-semibold mb-2">🔐 Secure Auth</h3>
            <p className="text-muted text-sm">
              JWT-based authentication with role-based access control.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2">👤 Admin Control</h3>
            <p className="text-muted text-sm">
              Admins can manage users, promote roles, and assign tasks.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2">📋 Task Management</h3>
            <p className="text-muted text-sm">
              Users can track tasks, update status, and stay productive.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4">
          <Link
            to="/login"
            className="bg-accent text-black px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="border border-border px-6 py-3 rounded-lg text-slate-200 hover:bg-slate-800"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
