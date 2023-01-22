<script lang="ts">
	import ProductsGrid from '$lib/ProductsGrid.svelte';
	import ProductsGridSkeleton from '../ProductsGridSkeleton.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let { Products } = data;
	$: ({ Products, Cart } = data);
</script>

<svelte:head>
	<title>Somm - Sérvalin vín allstaðar að</title>
	<meta
		name="description"
		content="Vefverslun með sérvalin vín frá birgjum með góð tengsl við framleiðendur"
	/>
</svelte:head>

<div>
	{#if $Products.fetching || $Cart.fetching}
		<ProductsGridSkeleton />
	{:else if $Products.data?.collection?.products && $Cart.data?.cart}
		<ProductsGrid products={$Products.data.collection?.products} serverCart={$Cart.data.cart} />
	{/if}
</div>
