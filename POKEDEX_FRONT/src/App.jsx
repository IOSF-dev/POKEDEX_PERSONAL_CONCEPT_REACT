import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AdminPanel from "./pages/AdminPanel";
import LoginPage from "./pages/LoginPage";
import OnBoarding from "./pages/OnBoarding";
import UserPanel from "./pages/UserPanel";
import { getSession } from "./services/sessions";




function ProtectedRoute({ allowedRole, children }) {
  const session = getSession();

  if (!session) {
    return <Navigate to="/login" replace />;
  }


  if (session.mode !== allowedRole) {
    return <Navigate to={session.mode === "admin" ? "/admin" : "/pokemon"} replace />;
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
