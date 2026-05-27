import { useAuth } from "@/context/AuthContext";
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute() {
  const {isAuthenticated, authLoading }= useAuth();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // authenticated
  return <Outlet />;
}

