import { cache } from "@solidjs/router";
import { setCookie } from "vinxi/http";
import { action, redirect } from "@solidjs/router";
import { Argon2id } from "oslo/password";
import { getRequestEvent } from "solid-js/web";
import { lucia } from "~/lib/auth";
import { db } from "~/lib/db";
import { generateId } from "lucia";
import { PostgresError } from "postgres";

import type { DatabaseUser } from "~/lib/db";

export const POSTGRES_UNIQUE_VIOLATION = "23505";

export const getAuthenticatedUser = cache(async () => {
  "use server";
  const event = getRequestEvent()!;
  if (!event.locals.user) {
    throw redirect("/login");
  }
  return event.locals.user;
}, "users");

export const login = action(async (formData: FormData) => {
  "use server";
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return new Error("Invalid username");
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return new Error("Invalid password");
  }
  
  const existingUser = await db<DatabaseUser[]>`
		SELECT * FROM users WHERE username = ${username}
	`;
  if (!existingUser.length) {
    return new Error("Incorrect username or password");
  }

  const validPassword = await new Argon2id().verify(
    existingUser[0].password,
    password
  );
  if (!validPassword) {
    return new Error("Incorrect username or password");
  }

  const session = await lucia.createSession(existingUser[0].id, {});
  const cookie = lucia.createSessionCookie(session.id);
  
  setCookie(cookie.name, cookie.value, cookie.attributes);
  throw redirect("/");
});

export const signup = action(async (formData: FormData) => {
  "use server";
  const username = formData.get("username");
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    return new Error("Invalid username");
  }
  const password = formData.get("password");
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    return new Error("Invalid password");
  }
  const hashedPassword = await new Argon2id().hash(password);
  const userId = generateId(15);

  try {
    await db`
			INSERT INTO users (id, username, password)
			VALUES (${userId}, ${username}, ${hashedPassword})
		`;
    const session = await lucia.createSession(userId, {});
    const cookie = lucia.createSessionCookie(session.id);
    setCookie(cookie.name, cookie.value, cookie.attributes);
  } catch (e) {
    if (e instanceof PostgresError && e.code === POSTGRES_UNIQUE_VIOLATION) {
      // PostgreSQL unique violation error code
      return new Error("Username already used");
    }
    return new Error("An unknown error occurred");
  }
  throw redirect("/");
});

export const logout = action(async () => {
  "use server";
  const event = getRequestEvent()!;
  if (!event.locals.session) {
    return new Error("Unauthorized");
  }
  await lucia.invalidateSession(event.locals.session.id);

  const cookie = lucia.createBlankSessionCookie();

  setCookie(cookie.name, cookie.value, cookie.attributes);

  throw redirect("/login");
});
