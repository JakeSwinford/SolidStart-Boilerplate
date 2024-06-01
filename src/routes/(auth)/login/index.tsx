import { A, useSubmission, type RouteSectionProps } from "@solidjs/router";
import { Show } from "solid-js";
import {
  TextField,
  TextFieldLabel,
  TextFieldRoot,
} from "@/components/ui/textfield";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { login } from "~/lib";

export default function Login() {
  const submission = useSubmission(login);
  return (
    <main>
      <Card class="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle class="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form method="post" action={login}>
            <div class="grid gap-4">
              <div class="grid gap-2">
                <TextFieldRoot>
                  <TextFieldLabel>Email</TextFieldLabel>
                  <TextField
                    id="username"
                    name="username"
                    placeholder="m@example.com"
                    required
                  />
                </TextFieldRoot>
              </div>

              <div class="grid gap-2">
                <TextFieldRoot>
                  <div class="flex items-center">
                    <TextFieldLabel>Password</TextFieldLabel>
                    <a href="#" class="ml-auto inline-block text-sm underline">
                      Forgot your password?
                    </a>
                  </div>
                  <TextField name="password" id="password" type="password" required />
                </TextFieldRoot>
              </div>

              <Button type="submit" class="w-full">
                Login
              </Button>
            </div>
            <Show when={submission.result}>
              {(result) => <p>{result().message}</p>}
            </Show>
          </form>
          <div class="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" class="underline">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
