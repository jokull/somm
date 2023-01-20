<script lang="ts">
	import type { Cart$result } from '$houdini';
	import type { Product } from '$lib/types';
	import AddToCart from './AddToCart.svelte';
	export let cart: NonNullable<Cart$result['cart']>;

	export let product: Product['node'];
	const variants = product.variants.edges.map(({ node }) => node) ?? [];
	const location: string[] = [];

	if (product.region?.value) {
		location.push(product.region.value);
	}
	if (product.country?.value) {
		location.push(product.country.value);
	}

	let selected = variants.find((variant) => variant.availableForSale) ?? variants[0];
	const price = parseInt(selected.priceV2.amount);
</script>

<div class="flex items-center justify-between text-neutral-500">
	<label class="text-sm flex items-center gap-1">
		<span class="sr-only">Ár </span>
		{#if variants.length > 1}
			<select
				id="location"
				name="location"
				class="block text-sm border-0 border-gray-300 py-1 pl-0 pr-8 -mr-3 focus:border-[blue] focus:ring-0"
				bind:value={selected}
			>
				{#each variants as variant}
					<option value={variant} disabled={!variant.availableForSale}>
						{variant.title}
					</option>
				{/each}
			</select>
		{:else}
			<div class="py-1 text-sm">{selected.title === 'Default Title' ? '' : selected.title}</div>
		{/if}
	</label>
	<div class="hidden md:block text-sm truncate">
		{location.join(', ')}
	</div>
	<div class="md:hidden text-sm truncate">
		{product.region?.value}
	</div>
</div>
<div class="flex items-center justify-between">
	<AddToCart variant={selected} {cart} />
	<p>
		{new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(price)}
		kr
	</p>
</div>
