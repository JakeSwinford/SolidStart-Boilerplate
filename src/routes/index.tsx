import { createAsync, type RouteDefinition } from "@solidjs/router";
import {logout, getAuthenticatedUser } from "~/lib";

export default function Home() {
	const user = createAsync(() => getAuthenticatedUser());  return (
    <main class="w-full p-4 space-y-2">
			<h1>Hi, {user()?.username}</h1>
			<p>Your user ID is {user()?.id}.</p>
			<form method="post" action={logout}>
				<button>Sign out</button>
			</form>
    </main>
  );
}