import { useForm } from "react-hook-form";
import { Button } from "src/features/core/components/Button";
import { useAuth } from "src/features/auth/hooks/useAuth";
import toast from "react-hot-toast";

interface LoginData extends LoginRequest {
  rememberMe: boolean;
}

export const LoginForm = () => {
  const { login } = useAuth();

  const defaultValues: LoginData = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({ defaultValues });
  const onSubmit = async (data: any) => {
    const { rememberMe, ...loginPayload } = data;
    const error = await login(loginPayload, rememberMe);
    if (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-80 bg-slate-800 p-4 rounded-md"
      >
        <div className="text-center text-slate-100">Login</div>
        <div className="mt-4">
          <div className="text-slate-100">Email</div>
          <input
            type="email"
            className="w-full rounded-sm px-2 py-1 mt-1 text-slate-900"
            placeholder="Email"
            {...register("email", { required: true })}
          />
          {errors.email && <div className="text-red-500">Email is required</div>}
        </div>
        <div className="mt-4">
          <div className="text-slate-100">Password</div>
          <input
            type="password"
            className="w-full rounded-sm px-2 py-1 mt-1 text-slate-900"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          {errors.password && <div className="text-red-500">Password is required</div>}
        </div>
        <div className="mt-4">
          <Button type="submit">Login</Button>
        </div>
        <div className="mt-4 flex items-center">
          <input type="checkbox" className="rounded-sm" {...register("rememberMe")} />
          <span className="text-slate-100 pl-2">Remember me</span>
        </div>
      </form>
    </div>
  );
};
