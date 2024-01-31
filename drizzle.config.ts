import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/lib/schema.ts',
  out: 'migrations',
  driver: 'libsql',
  breakpoints: true
} satisfies Config;
