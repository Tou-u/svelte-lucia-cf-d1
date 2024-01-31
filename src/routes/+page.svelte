<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<h1>Welcome to SvelteKit</h1>
<strong>{JSON.stringify(data, null, 2)}</strong>
<form method="post" use:enhance>
  <button>Sign out</button>
</form>
