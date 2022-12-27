import { LogoutButton } from "src/features/auth/components/LogoutButton";
import { useAuth } from "src/features/auth/hooks/useAuth";
import { Link } from "react-router-dom";

export const AppBar = () => {
  // check if user is logged in, if so, show app bar
  const { isLoggedIn, isLoading } = useAuth();
  if (isLoading || !isLoggedIn) {
    return null;
  }

  return (
    <nav className="border-slate-200 px-2 sm:px-4 py-2.5 rounded-b bg-slate-900 text-slate-200">
      <div className="flex flex-wrap items-center justify-between mx-auto">
        <Link to="/">
          <div className="ml-4">Home</div>
        </Link>
        <LogoutButton />
      </div>
    </nav>
  );
};
