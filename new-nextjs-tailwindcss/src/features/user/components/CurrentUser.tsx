import { useGetCurrentUserQuery } from "src/features/user/store/userService";

export const CurrentUser = () => {
  const { data: user, isLoading, error } = useGetCurrentUserQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>-</div>;
  }

  return (
    <div>
      <div>{user?.id}</div>
    </div>
  );
};
