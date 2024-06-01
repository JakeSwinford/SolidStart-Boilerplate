import { Button } from "@/components/ui/button";
import { action, redirect, useSubmission } from "@solidjs/router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TextField,
  TextFieldLabel,
  TextFieldRoot,
} from "@/components/ui/textfield";
import { Show } from "solid-js";
import { signup } from "@/lib";

export default function Signup() {
  const submission = useSubmission(signup);
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <div class="max-6-xs my-24">
        <Card class="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle class="text-xl">Sign Up</CardTitle>
            <CardDescription>
              Enter your information to create an account
            </CardDescription>
          </CardHeader>
          <CardContent>
          <form method="post" action={signup}>
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
                  <TextFieldLabel>Password</TextFieldLabel>
                  <TextField id="password" name="password" type="password" />
                </TextFieldRoot>
              </div>
              <Button type="submit" class="w-full">
                Create an account
              </Button>
            </div>
            <Show when={submission.result}>{(result) => <p>{result().message}</p>}</Show>
            </form>
            <div class="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a href="/login" class="underline">
                Sign in
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
