<script lang="ts">
	import ProductsGrid from '$lib/ProductsGrid.svelte';
	import ProductsGridSkeleton from '../../ProductsGridSkeleton.svelte';

	import type { PageData } from './$types';
	export let data: PageData;
	let { Products, Cart, vendor } = data;
	$: ({ Products, Cart } = data);
</script>

<svelte:head>
	<title>{vendor?.name} - Somm</title>
	<meta name="description" content={`Vín flutt inn af ${vendor?.name} til sölu á Somm`} />
</svelte:head>

<div>
	{#if $Products.fetching || $Cart.fetching}
		<ProductsGridSkeleton />
	{:else if $Products.data?.collection?.products && $Cart.data?.cart}
		<ProductsGrid products={$Products.data.collection?.products} serverCart={$Cart.data.cart} />
	{/if}
</div>
