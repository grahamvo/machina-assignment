import { Navigate, useLocation } from "react-router";

import { useAuth } from "Context/auth-provider";

import type { ProtectedRouteProps } from "../types/routes";

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/sign-in" replace state={{ from: location }} />;
  }

  return children;
};

export default ProtectedRoute;