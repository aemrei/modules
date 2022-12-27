import React from "react";
import { useAuth } from "src/features/auth/hooks/useAuth";
import { Navigate } from "react-router-dom";

export const withAuthentication = (
  expectedAuthState: "authenticated" | "unauthenticated",
  Component: React.FunctionComponent,
) => {
  const WithAuthentication = (props: any) => {
    const { isLoading, isLoggedIn } = useAuth();

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (!isLoggedIn && expectedAuthState === "authenticated") {
      return <Navigate to={"/login"} />;
    }

    if (isLoggedIn && expectedAuthState === "unauthenticated") {
      return <Navigate to={"/"} />;
    }

    return <Component />;
  };

  return WithAuthentication;
};
