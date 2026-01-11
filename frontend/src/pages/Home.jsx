import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-6">
      <div className="max-w-5xl w-full">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-accent mb-4">
            Prime Trade AI
          </h1>

          <p className="text-lg text-muted mb-2">Assessment Project</p>

          <p className="text-muted max-w-2xl mx-auto">
            A role-based task management system where admins assign tasks and
            users securely access only their assigned work.
          </p>

          {/* Actions */}
          <div className="flex justify-center gap-4 mt-8">
            <Link to="/login" className="btn btn-primary px-6">
              Login
            </Link>

            <Link to="/register" className="btn border border-border px-6">
              Create Account
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="card text-center">
            <h3 className="font-semibold mb-2">🔐 Secure Access</h3>
            <p className="text-sm text-muted">
              JWT-based authentication with role-based authorization.
            </p>
          </div>

          <div className="card text-center">
            <h3 className="font-semibold mb-2">👑 Admin Control</h3>
            <p className="text-sm text-muted">
              Admins can create, assign, view, and delete tasks.
            </p>
          </div>

          <div className="card text-center">
            <h3 className="font-semibold mb-2">📋 User Tasks</h3>
            <p className="text-sm text-muted">
              Users can view only the tasks assigned to them.
            </p>
          </div>
        </div>

        {/* Demo Section */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Demo Credentials */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">
              🔐 Demo Admin Credentials
            </h2>

            <p className="text-sm text-muted mb-4">
              Use the credentials below to test admin features:
            </p>

            <div className="text-sm space-y-1">
              <p>
                <span className="font-semibold">Email:</span>{" "}
                <span className="text-accent">admin@test.com</span>
              </p>
              <p>
                <span className="font-semibold">Password:</span>{" "}
                <span className="text-accent">8978281820</span>
              </p>
            </div>
          </div>

          {/* Demo Steps */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold mb-3">
              🧪 How to Test the Project
            </h2>

            <ol className="list-decimal list-inside text-sm text-muted space-y-2">
              <li>Login using the demo admin credentials.</li>
              <li>Create tasks and assign them to users.</li>
              <li>Create a new user using “Create Account”.</li>
              <li>Login as that user.</li>
              <li>Verify only assigned tasks are visible.</li>
              <li>Admin can view and delete all tasks.</li>
            </ol>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-xs text-muted text-center mt-10">
          ℹ️ All newly registered accounts are created with the <b>USER</b> role
          by default.
        </p>
      </div>
    </div>
  );
}
