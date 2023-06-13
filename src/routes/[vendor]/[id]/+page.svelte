<script lang="ts">
	import type { PageData } from './$houdini';
	import type { PageParentData } from './$types';
	import Product from './Product.svelte';
	export let data: PageData & PageParentData;
	$: ({ Product: ProductStore } = data);
	let { vendor, cart } = data;
</script>

<svelte:head>
	<title>{$ProductStore.data?.product?.title} - {vendor?.name} - Somm</title>
	<meta
		name="description"
		content={`${$ProductStore?.data?.product?.title} frá ${
			$ProductStore?.data?.product?.framleidandi?.value ?? $ProductStore?.data?.product?.vendor
		}`}
	/>
</svelte:head>

<div>
	{#if cart && $ProductStore.data?.product}
		<Product serverCart={cart} product={$ProductStore.data.product} />
	{/if}
</div>
