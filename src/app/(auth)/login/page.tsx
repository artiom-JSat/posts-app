'use client';

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "@/shared/store/auth.store";
import { authSchema, AuthFormValues } from "@/features/auth/auth.schema";
import { Button, Input, Label, Card, CardContent, CardDescription, CardHeader, CardTitle, Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  function onSubmit(values: AuthFormValues) {
    console.log("Success:", values);
    login(values.email);
    router.push('/posts');
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <Tabs defaultValue="login" className="w-full max-w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Enter your credentials to access</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Поле Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    {...register("email")}
                    className={errors.email ? "border-destructive" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Поле Пароль */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="******"
                    {...register("password")}
                    className={errors.password ? "border-destructive" : ""}
                  />
                  {errors.password && (
                    <p className="text-sm font-medium text-destructive">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button type="submit" className="w-full">
                  Continue
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Register</CardTitle>
              <CardDescription>Create an account</CardDescription>
            </CardHeader>
            <CardContent className="py-10 text-center text-muted-foreground">
              Use the "Login" tab.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}