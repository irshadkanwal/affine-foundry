import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

function ProtectedRoutes({ children }) {
  const { isAuthenticated } = useAuth0();

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isAuthenticated) {
      window.location.replace("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;
  return <>{children}</>;
}

export default ProtectedRoutes;
