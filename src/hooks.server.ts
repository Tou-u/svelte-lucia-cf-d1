import { dev } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { D1Database$ } from 'cfw-bindings-wrangler-bridge';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from '$lib/schema';
import { initializeLucia } from '$lib/server/auth';

const getDevD1 = async (dbName: string) => {
  return new D1Database$(dbName) as D1Database;
};

export const handle: Handle = async ({ event, resolve }) => {
  if (dev) {
    event.locals.db = await getDevD1('DB');
  } else {
    event.locals.db = <D1Database>event.platform?.env?.DB;
  }
  event.locals.DB = drizzle(event.locals.db, { schema });

  event.locals.lucia = initializeLucia(event.locals.db);

  const lucia = event.locals.lucia;
  const sessionId = event.cookies.get(lucia.sessionCookieName);

  if (!sessionId) {
    event.locals.user = null;
    event.locals.session = null;
    return resolve(event);
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    const sessionCookie = lucia.createSessionCookie(session.id);
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  }
  if (!session) {
    const sessionCookie = lucia.createBlankSessionCookie();
    event.cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
  }
  event.locals.user = user;
  event.locals.session = session;

  return resolve(event);
};
