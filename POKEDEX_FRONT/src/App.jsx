import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/LoginPage";
import OnBoarding from "./pages/OnBoarding";
import UserPanel from "./pages/UserPanel";

function getStoredSession() {
  const possibleKeys = ["pokedex_auth", "pdx_user"];

  for (const key of possibleKeys) {
    const rawValue = localStorage.getItem(key);

    if (!rawValue) {
      continue;
    }

    try {
      return JSON.parse(rawValue);
    } catch {
      localStorage.removeItem(key);
    }
  }

  return null;
}

function ProtectedRoute({ allowedRole, children }) {
  const session = getStoredSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (session.mode !== allowedRole) {
    const fallbackPath = session.mode === "admin" ? "/admin" : "/pokemon";
    return <Navigate to={fallbackPath} replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pokemon"
          element={
            <ProtectedRoute allowedRole="pokemon">
              <UserPanel />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
