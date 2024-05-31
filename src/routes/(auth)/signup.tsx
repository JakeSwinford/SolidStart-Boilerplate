import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TextField, TextFieldLabel, TextFieldRoot } from "@/components/ui/textfield";
import { A } from "@solidjs/router";
import Counter from "~/components/Counter";

export default function Signup() {
  return (
    <main class="text-center mx-auto text-gray-700 p-4">
      <h1 class="max-6-xs text-6xl text-sky-700 font-thin uppercase my-16">Sign Up</h1>
      
      <Tabs defaultValue="account" class="w-[400px]">
      <TabsList class="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you're done.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <TextFieldRoot class="space-y-1">
              <TextFieldLabel>Name</TextFieldLabel>
              <TextField />
            </TextFieldRoot>
            <TextFieldRoot class="space-y-1">
              <TextFieldLabel>Username</TextFieldLabel>
              <TextField />
            </TextFieldRoot>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent class="space-y-2">
            <TextFieldRoot class="space-y-1">
              <TextFieldLabel>Current password</TextFieldLabel>
              <TextField />
            </TextFieldRoot>
            <TextFieldRoot class="space-y-1">
              <TextFieldLabel>New password</TextFieldLabel>
              <TextField />
            </TextFieldRoot>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
    </main>
  );
}