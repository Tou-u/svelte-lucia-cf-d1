import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { userTable } from '$lib/schema';
import { count } from 'drizzle-orm';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) return redirect(302, '/login');

  const users = await locals.DB.select({ value: count() }).from(userTable);
  return { user: locals.user, users };
};

export const actions: Actions = {
  default: async ({ locals, cookies }) => {
    if (!locals.session) {
      return fail(401);
    }
    const lucia = locals.lucia;
    await lucia.invalidateSession(locals.session.id);
    const sessionCookie = lucia.createBlankSessionCookie();
    cookies.set(sessionCookie.name, sessionCookie.value, {
      path: '.',
      ...sessionCookie.attributes
    });
    return redirect(302, '/login');
  }
};
