import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Dashboard from "./pages/Dashboard.jsx";

// USER PAGES
import UserTasks from "./pages/UserTasks.jsx";

// ADMIN PAGES
import AdminPanel from "./pages/AdminPanel.jsx";
import CreateTaskAdmin from "./pages/CreateTaskAdmin.jsx";
import AdminTasks from "./pages/AdminTasks.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminRoute from "./components/AdminRoute.jsx";

function App() {
  console.log("🔥 CORRECT APP.JSX IS RUNNING");

  return (
    <BrowserRouter>
      <Routes>
        {/* 🌐 Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔐 Common protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 👤 USER ROUTES */}
        <Route
          path="/user/tasks"
          element={
            <ProtectedRoute>
              <UserTasks />
            </ProtectedRoute>
          }
        />

        {/* 👑 ADMIN ROUTES */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/tasks"
          element={
            <AdminRoute>
              <AdminTasks />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/create-task"
          element={
            <AdminRoute>
              <CreateTaskAdmin />
            </AdminRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
