<script lang="ts">
	import Product from './Product.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	let { Product: ProductData } = data;
	$: ({ Product: ProductData } = data);
</script>

<div>
	{#if $ProductData.data?.product}
		<Product product={$ProductData.data.product} />
	{/if}
</div>
