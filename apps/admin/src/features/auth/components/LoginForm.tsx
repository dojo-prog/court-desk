import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "cn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginBodySchema, type LoginBody } from "@courtdesk/shared";
import { useLogin } from "../hooks/useLogin";
import ButtonLoader from "@/components/common/ButtonLoader";

const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();

  const form = useForm({
    resolver: zodResolver(LoginBodySchema),

    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginBody) => {
    login(data);
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FieldGroup>
              {/* Email */}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@dojo.com"
                  {...form.register("email")}
                />

                <FieldError errors={[form.formState.errors.email]} />
              </Field>

              {/* Password */}
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  {...form.register("password")}
                />

                <FieldError errors={[form.formState.errors.password]} />
              </Field>

              {/* Login Button */}
              <Field>
                <Button type="submit" className={"text-white"}>
                  <ButtonLoader isLoading={isPending}>Login</ButtonLoader>
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginForm;
