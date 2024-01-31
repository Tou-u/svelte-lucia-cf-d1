import type { Lucia } from 'lucia';

declare global {
  namespace App {
    interface Locals {
      db: D1Database;
      DB: import('drizzle-orm/d1').DrizzleD1Database<typeof import('$lib/schema')>;
      lucia: Lucia;
      user: import('lucia').User | null;
      session: import('lucia').Session | null;
    }
    interface Platform {
      env?: {
        DB: D1Database;
      };
    }
  }
}

export {};
