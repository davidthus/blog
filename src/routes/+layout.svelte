<script>
	import Links from '$lib/components/links.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import WhitespaceFiller from '$lib/components/whitespaceFiller.svelte';
	import '../app.css';
</script>

<main
	class="bg-[url('/wolfBackground.jpg')] bg-no-repeat bg-cover bg-right-top min-w-screen min-h-screen flex justify-between items-center flex-row-reverse relative"
>
	<WhitespaceFiller />
	<Navbar />
	<Links />
	<slot />
</main>
