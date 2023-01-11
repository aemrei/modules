import { useAuth } from "src/features/auth/hooks/useAuth";
import React from "react";
import { Button } from "src/features/core/components/Button";

export const LogoutButton = () => {
  const { logout } = useAuth();
  return <Button onClick={() => logout()}>Logout</Button>;
};
