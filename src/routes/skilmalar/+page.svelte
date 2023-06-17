<script lang="ts">
	import type { PageData } from './$houdini';
	export let data: PageData;
	$: TermsStore = data.Terms;
</script>

<svelte:head>
	<title>Skilmálar - Somm</title>
</svelte:head>

<div
	class="[&_p]:mb-4 [&_h1]:mb-4 [&_.s8]:font-bold [&_.s4]:text-lg [&_.s4]:font-medium [&_h1]:text-2xl [&_h1]:font-bold max-w-lg"
>
	{@html $TermsStore?.data?.shop.termsOfService?.body ?? ''}
	{@html $TermsStore?.data?.shop.privacyPolicy?.body ?? ''}
</div>
