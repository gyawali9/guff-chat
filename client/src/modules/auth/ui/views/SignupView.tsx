import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon, Loader2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { getSignupSchema } from "../../schemas";
import type { SignUpType } from "../../types";
import { useAppDispatch, useAppSelector } from "@/hooks/react-redux";
import { registerUserThunk } from "@/store/slice/user/user.thunk";
import FormInput from "@/components/ui/form/FormInput";

const SignupView = () => {
  const [signUpStep, setSignUpStep] = useState<1 | 2>(1);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { buttonLoading } = useAppSelector((state) => state.user);

  const schema = useMemo(() => getSignupSchema(signUpStep), [signUpStep]);

  const form = useForm<SignUpType>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      userName: "",
      password: "",
      confirmPassword: "",
      gender: "M",
      bio: "",
    },
  });

  const onSubmit = async (value: SignUpType) => {
    if (signUpStep === 1) {
      const isStep1Valid = await form.trigger([
        "fullName",
        "userName",
        "password",
        "confirmPassword",
        "gender",
      ]);
      if (isStep1Valid) {
        setSignUpStep(2);
      }
      return;
    }
    const res = await dispatch(registerUserThunk(value));
    if (res?.meta?.requestStatus === "fulfilled") {
      navigate("/login");
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
                  <h1 className="text-2xl font-bold">Let&apos;s get started</h1>
                  <p className="text-muted-foreground text-balance">
                    Create your account
                  </p>
                </div>

                {signUpStep === 1 ? (
                  <>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormInput
                              type="text"
                              label="Full Name"
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="eg@fullName"
                              error={fieldState.error?.message}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="userName"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormInput
                              type="text"
                              label="User Name"
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="eg@fullName"
                              error={fieldState.error?.message}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormInput
                              type="password"
                              label="Password"
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="********"
                              error={fieldState.error?.message}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormInput
                              type="password"
                              label="Confirm Password"
                              value={field.value}
                              onChange={field.onChange}
                              placeholder="********"
                              error={fieldState.error?.message}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid gap-3">
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field, fieldState }) => (
                          <FormItem>
                            <FormInput
                              type="radio"
                              label="Gender"
                              value={field.value}
                              onChange={field.onChange}
                              options={[
                                { label: "Male", value: "M" },
                                { label: "Female", value: "F" },
                              ]}
                              error={fieldState.error?.message}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="bio"
                      render={({ field, fieldState }) => (
                        <FormItem>
                          <FormInput
                            type="textarea"
                            label="Bio"
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            placeholder="Tell us something about yourself..."
                            error={fieldState.error?.message}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setSignUpStep(1)}
                      className="flex items-center gap-1 w-fit px-0"
                    >
                      <ArrowLeftIcon className="h-4 w-4" /> Back
                    </Button>
                  </>
                )}

                {/* {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !item-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )} */}
                {/* <Button disabled={pending} type="submit" className="w-full">
                  Sign up
                </Button> */}
                <Button
                  className="cursor-pointer w-full"
                  disabled={buttonLoading}
                  type="submit"
                >
                  {buttonLoading && <Loader2Icon className="animate-spin" />}
                  {signUpStep === 1 ? "Next" : "Sign Up"}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:items-center after:border-t"></div>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="underline underline-offset-4 cursor-pointer"
                  >
                    Login
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

export default SignupView;
