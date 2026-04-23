import React from "react";
import ProtectedRoutes from "../RouteProtection";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading";

function AuthWrapper({ children }) {
  const { isLoading: isUserLoading } = useAuth0();
  //console.log("path => ", window.location.pathname.split(" "));
  const asPath =
    window.location.pathname.split(" ")[0] === "/login"
      ? ""
      : window.location.pathname.split(" ");

  const protectedRoutes = asPath;

  return (
    <>
      {isUserLoading ? (
        <Loading />
      ) : (
        <>
          {protectedRoutes.includes(window.location.pathname) ? (
            <ProtectedRoutes>{children}</ProtectedRoutes>
          ) : (
            children
          )}
        </>
      )}
    </>
  );
}

export default AuthWrapper;
