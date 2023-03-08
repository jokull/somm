<script lang="ts">
	import ProductsGrid from '$lib/ProductsGrid.svelte';
	import ProductsGridSkeleton from '../ProductsGridSkeleton.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let { Products, cart } = data;
	$: ({ Products } = data);
</script>

<svelte:head>
	<title>Somm - Sérvalin vín allstaðar að</title>
	<meta
		name="description"
		content="Vefverslun með sérvalin vín frá birgjum með góð tengsl við framleiðendur"
	/>
</svelte:head>

<div>
	{#if $Products.fetching || !cart}
		<ProductsGridSkeleton />
	{:else if $Products.data?.collection?.products && cart}
		<ProductsGrid products={$Products.data.collection?.products} serverCart={cart} />
	{/if}
</div>
