import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "src/features/auth/hooks/useAuth";

export const withAuthentication = (
  expectedAuthState: "authenticated" | "unauthenticated",
  Component: React.FunctionComponent<any>,
) => {
  const WithAuthentication = (props: any) => {
    const { isLoading, isLoggedIn } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isLoading) {
        return;
      }
      if (!isLoggedIn && expectedAuthState === "authenticated") {
        router.push("/login");
      } else if (isLoggedIn && expectedAuthState === "unauthenticated") {
        router.push("/");
      }
    }, [isLoading, isLoggedIn, router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <Component {...props} />;
  };

  return WithAuthentication;
};
