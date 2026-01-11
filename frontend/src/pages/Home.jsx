import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full text-center">
        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-accent mb-4">
          Prime Trade AI
        </h1>

        <p className="text-muted text-lg mb-10">
          A role-based task & project management platform with secure
          authentication, admin controls, and a modern dark UI.
        </p>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card">
            <h3 className="font-semibold mb-2">🔐 Secure Authentication</h3>
            <p className="text-muted text-sm">
              JWT-based authentication with role-based access control.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2">👑 Admin Management</h3>
            <p className="text-muted text-sm">
              Admins can manage users, promote roles, and assign tasks.
            </p>
          </div>

          <div className="card">
            <h3 className="font-semibold mb-2">📋 Task Tracking</h3>
            <p className="text-muted text-sm">
              Users can view, update, and manage assigned tasks efficiently.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-center gap-4 mb-12">
          <Link
            to="/login"
            className="bg-accent text-black px-6 py-3 rounded-lg font-semibold hover:opacity-90"
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

        {/* Demo / Assessment Section */}
        <div className="max-w-xl mx-auto border border-border rounded-lg p-5 bg-slate-900 text-left">
          <h3 className="text-accent font-semibold text-lg mb-3">
            🔑 Assessment Demo Credentials
          </h3>

          <div className="text-sm text-slate-300 mb-4">
            <p className="font-semibold">Super Admin</p>
            <p>
              Email: <span className="text-white">admin@test.com</span>
            </p>
            <p>
              Password: <span className="text-white">8978281820</span>
            </p>
          </div>

          <h4 className="text-slate-200 font-semibold mb-2">
            🧪 Steps to Test the Application
          </h4>

          <ol className="list-decimal list-inside text-sm text-slate-400 space-y-1">
            <li>Login using the above admin credentials.</li>
            <li>Access the Admin Dashboard after login.</li>
            <li>View all registered users.</li>
            <li>Promote users to Admin role if required.</li>
            <li>Create and assign tasks to users.</li>
            <li>Login as a user to view and manage assigned tasks.</li>
          </ol>

          <p className="text-xs text-slate-500 mt-3">
            ⚠️ These credentials are provided only for assessment and testing
            purposes.
          </p>
        </div>
      </div>
    </div>
  );
}
