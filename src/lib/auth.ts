import { Lucia } from "lucia";
import { PostgresJsAdapter } from "@lucia-auth/adapter-postgresql";
import { DatabaseUser, db } from "./db";
import { isDev } from "solid-js/web";

const adapter = new PostgresJsAdapter(db, {
  user: "users",
  session: "session",
});

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: !isDev
    },
  },
  getUserAttributes: (attributes) => {
    return {
        // attributes has the type of DatabaseUserAttributes
        username: attributes.username
    };
}

});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
		DatabaseUserAttributes: Omit<DatabaseUser, "id">;  }
}

