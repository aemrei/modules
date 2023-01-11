import { baseApi } from "src/store/api";

const extendedApi = baseApi.enhanceEndpoints({ addTagTypes: ["User"] }).injectEndpoints({
  endpoints: (build) => ({
    getCurrentUser: build.query<User, void>({
      query: () => ({
        url: "https://demo-auth.dev.aemre.net/api/users/me",
        method: "GET",
      }),
      providesTags: (result) => (result ? [{ type: "User", id: result.id }] : []),
    }),
  }),
});

export const { useGetCurrentUserQuery } = extendedApi;
