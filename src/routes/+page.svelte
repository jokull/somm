<script lang="ts">
	import { browser } from '$app/environment';
	import ProductsGrid from '$lib/ProductsGrid.svelte';
	import ProductsGridSkeleton from '../ProductsGridSkeleton.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	import { CartStore } from '$houdini';

	let { Products, cart: serverCart } = data;

	$: store = new CartStore();
	$: browser && store.fetch({ variables: { cartId: serverCart?.id ?? '' } });
	$: cart = $store.data?.cart ?? serverCart;

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
		<ProductsGrid products={$Products.data.collection?.products} {cart} />
	{/if}
</div>
