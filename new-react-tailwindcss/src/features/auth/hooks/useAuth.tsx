import { authSelectors, setToken } from "src/features/auth/store/authSlice";
import { useLoginMutation, useLogoutMutation } from "src/features/auth/store/authService";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "src/store";

let isLocalStorageChecked = false;

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const [loginService] = useLoginMutation();
  const [logoutService] = useLogoutMutation();
  const isLoggedIn = useAppSelector(authSelectors.isLoggedIn);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isLocalStorageChecked) {
      isLocalStorageChecked = true;
      const token = localStorage.getItem("accessToken");
      dispatch(setToken(token));
    }
    setIsLoading(false);
  }, [dispatch]);

  const login = useCallback(
    async (loginRequest: LoginRequest, rememberMe: boolean) => {
      try {
        const { token, error } = await loginService(loginRequest).unwrap();

        if (token) {
          dispatch(setToken(token));
          if (rememberMe) {
            localStorage.setItem("accessToken", token);
          }
        } else {
          dispatch(setToken(null));
          localStorage.removeItem("accessToken");
        }
        return error;
      } catch (e) {
        const errorMessage = (e as any).data?.error;
        return errorMessage || "Something went wrong";
      }
    },
    [dispatch, loginService],
  );

  const logout = useCallback(async () => {
    localStorage.removeItem("accessToken");
    dispatch(setToken(null));
    await logoutService().unwrap();
  }, [dispatch, logoutService]);

  return {
    isLoggedIn,
    isLoading,
    login,
    logout,
  };
};
