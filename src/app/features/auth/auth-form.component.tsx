'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/shared/store/auth.store";
import { authSchema, type AuthFormValues } from "@/features/auth/auth.schema";
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle, Input, Label } from "@/shared/ui";

interface AuthFormProps {
  type: "login" | "register";
}

export function AuthForm({ type }: AuthFormProps) {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const isLogin = type === "login";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: AuthFormValues) {
    console.log(`${type} submit:`, values);
    login(values.email);
    router.push('/');
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{isLogin ? "Login" : "Register"}</CardTitle>
        <CardDescription>
          {isLogin ? "Enter your credentials to access" : "Fill in the form to register"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${type}-email`}>Email</Label>
            <Input
              id={`${type}-email`}
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className={errors.email ? "border-destructive" : ""}
            />
            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor={`${type}-password`}>Пароль</Label>
            <Input
              id={`${type}-password`}
              type="password"
              placeholder="******"
              {...register("password")}
              className={errors.password ? "border-destructive" : ""}
            />
            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full">
            {isLogin ? "Login" : "Register"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}