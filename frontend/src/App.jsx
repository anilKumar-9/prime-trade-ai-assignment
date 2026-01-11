import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// USER
import UserTasks from "./pages/UserTasks";

// ADMIN
import AdminPanelPage from "./pages/AdminPanelPage";
import CreateTaskAdmin from "./pages/CreateTaskAdmin";
import AdminTasks from "./pages/AdminTasks";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {


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
              <AdminPanelPage />
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
