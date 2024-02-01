import type { Config } from 'drizzle-kit';

export default {
  schema: 'src/lib/schema.ts',
  out: 'migrations',
  driver: 'd1',
  dbCredentials: {
    wranglerConfigPath: '/home/tou/dev/svelte-lucia-cf-d1/wrangler.toml',
    dbName: 'sveltedb'
  }
} satisfies Config;
