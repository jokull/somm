<script lang="ts">
	import type { PageData } from './$houdini';
	export let data: PageData;
	$: TermsStore = data.Terms;
	let terms = $TermsStore?.data;
</script>

<svelte:head>
	<title>{terms?.shop.refundPolicy?.title ?? 'Afhending'} - Somm</title>
</svelte:head>

<div
	class="[&_p]:mb-4 [&_h1]:mb-4 [&_.s8]:font-bold [&_.s4]:text-lg [&_.s4]:font-medium [&_h1]:text-2xl [&_h1]:font-bold max-w-lg"
>
	{@html terms?.shop.refundPolicy?.body ?? ''}
</div>
