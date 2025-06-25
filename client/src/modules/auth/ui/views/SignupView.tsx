import { useMemo, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { OctagonAlertIcon, ArrowLeftIcon } from "lucide-react";

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
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { getSignupSchema } from "../../schemas";

// const step1Schema = z
//   .object({
//     fullName: z.string().min(1, { message: "Name is required" }),
//     userName: z.string().min(1, { message: "Username is required" }),
//     password: z.string().min(1, { message: "Password is required" }),
//     confirmPassword: z.string().min(1, { message: "Password is required" }),
//     gender: z.enum(["M", "F"], { message: "Gender is required" }),
//     bio: z.string().min(1, { message: "Bio is required" }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Password doesn't match",
//     path: ["confirmPassword"],
//   })
//   .refine((data) => {
//     if (data.step === 2) {
//       return !!data.bio?.trim();
//     }
//     return true;
//   }, {
//     message: "Bio is required",
//     path: ["bio"],
//   });

//   const fullSchema = step1Schema.extend({
//   bio: z.string().min(1, { message: "Bio is required" }),
// });

const SignupView = () => {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);
  const [signUpStep, setSignUpStep] = useState<1 | 2>(1);

  const navigate = useNavigate();

  const schema = useMemo(() => getSignupSchema(signUpStep), [signUpStep]);

  const form = useForm<z.infer<ReturnType<typeof getSignupSchema>>>({
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

  console.log(form.formState.errors, "whatareerrors");
  const onSubmit = async (values: z.infer<typeof schema>) => {
    console.log(values, "whatisvalues");
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

    try {
      setPending(true);
      console.log("Sending values to API:", values);
      // await api.signup(values);
      // navigate("/login");
    } catch (err: any) {
      const error = err;
      const errorMessage =
        error.response?.data?.message || "Signup failed. Try again.";
      setError(errorMessage);
    } finally {
      setPending(false);
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
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="eg: John Doe"
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
                        name="userName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>User Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="eg: John Doe"
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
                                placeholder="eg: *****"
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
                        name="confirmPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                              <Input
                                type="password"
                                placeholder="eg: *****"
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
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gender</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex space-x-4"
                              >
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="M" id="male" />
                                  <Label htmlFor="male">Male</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="F" id="female" />
                                  <Label htmlFor="female">Female</Label>
                                </div>
                              </RadioGroup>
                            </FormControl>
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
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bio</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Tell us something about yourself..."
                              {...field}
                            />
                          </FormControl>
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

                {!!error && (
                  <Alert className="bg-destructive/10 border-none">
                    <OctagonAlertIcon className="h-4 w-4 !item-destructive" />
                    <AlertTitle>{error}</AlertTitle>
                  </Alert>
                )}
                {/* <Button disabled={pending} type="submit" className="w-full">
                  Sign up
                </Button> */}
                <Button
                  className="cursor-pointer w-full"
                  disabled={pending}
                  type="submit"
                >
                  {signUpStep === 1 ? "Next" : "Sign Up"}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:items-center after:border-t"></div>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="underline underline-offset-4"
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
