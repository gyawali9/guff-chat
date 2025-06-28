import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { signInSchema } from "@/modules/auth/schemas";
import { loginUserThunk } from "@/store/slice/user/user.thunk";
import type { SignInType } from "../../types";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import { Loader2Icon } from "lucide-react";

const LoginView = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { buttonLoading } = useAppSelector((state) => state.user);

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmit = async (value: SignInType) => {
    const res = await dispatch(loginUserThunk(value));
    if (res?.meta?.requestStatus === "fulfilled") {
      navigate("/");
    }
  };
  return (
    <div className="flex flex-col gap-6">
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Welcome back</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="userName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="eg@username"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="********"
                            {...field}
                          ></Input>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button
                  disabled={buttonLoading}
                  type="submit"
                  className="cursor-pointer w-full"
                >
                  {buttonLoading && <Loader2Icon className="animate-spin" />}
                  Sign In
                </Button>

                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:items-center after:border-t"></div>

                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <span
                    onClick={() => navigate("/signup")}
                    className="underline underline-offset-4 cursor-pointer"
                  >
                    Sign up
                  </span>
                </div>
              </div>
            </form>
          </Form>

          <div
            className="bg-radial from-sidebar-accent to-sidebar
          relative hidden md:flex flex-col gap-y-4 items-center justify-center
          "
          >
            <img src="/logo.svg" alt="Image" className="h-[92px] w-[92px]" />
            <p className="text-2xl font-semibold text-green-600">Guff Chat</p>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:undrline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>
      </div>
    </div>
  );
};

export default LoginView;
