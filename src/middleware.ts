import { createMiddleware } from "@solidjs/start/middleware";
import { appendResponseHeader, getCookie, getRequestHeader } from "vinxi/http";
import { Session, User, verifyRequestOrigin } from "lucia";
import { lucia } from "./lib/auth";

export default createMiddleware({
  onRequest: async (event) => {
    if (event.request.method !== "GET") {
      const originHeader = getRequestHeader("Origin") ?? null;
      // NOTE: You may need to use `X-Forwarded-Host` instead
      const hostHeader = getRequestHeader("Host") ?? null;
      if (
        !originHeader ||
        !hostHeader ||
        !verifyRequestOrigin(originHeader, [hostHeader])
      ) {
        event.nativeEvent.node.res.writeHead(403).end();
        return;
      }
    }

    const sessionId = getCookie(lucia.sessionCookieName) ?? null;
    if (!sessionId) {
        event.locals.session = null;
        event.locals.user = null;
      return;
    }

    const { session, user } = await lucia.validateSession(sessionId);
    if (session && session.fresh) {
        appendResponseHeader("Set-Cookie", lucia.createSessionCookie(session.id).serialize());
    }
    if (!session) {
        appendResponseHeader("Set-Cookie", lucia.createBlankSessionCookie().serialize());
    }
	event.locals.session = session;
	event.locals.user = user;
  },
});

declare module "@solidjs/start/server" {
	interface RequestEventLocals {
		user: User | null;
		session: Session | null;
	}
}