import { baseApi } from "src/store/api";

const extendedApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "https://demo-auth.dev.aemre.net/api/auth/login",
        method: "POST",
        body,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: "https://demo-auth.dev.aemre.net/api/auth/logout",
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = extendedApi;
