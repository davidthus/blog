<script lang="ts">
	import { docStore } from '$lib/firebase';
	import type { PageData } from './$types';

	export let data: PageData;

	const art = docStore<{ name: string; url: string }>(`/art/${data.artId}`);
</script>

<h1>{$art?.name}</h1>
<img src={$art?.url} alt={$art?.name} />
