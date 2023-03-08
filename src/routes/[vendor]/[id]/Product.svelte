<script lang="ts">
	import { browser } from '$app/environment';
	import { CartStore, type Cart$result, type Product$result } from '$houdini';
	import AddToCart from '$lib/AddToCart.svelte';
	import { getVendorFromName } from '$lib/utils';
	import VendorName from '$lib/VendorName.svelte';
	import classNames from 'classnames';

	export let product: NonNullable<Product$result['product']>;
	export let serverCart: NonNullable<Cart$result['cart']>;

	$: store = new CartStore();
	$: browser && store.fetch({ variables: { cartId: serverCart.id } });
	$: cart = $store.data?.cart ?? serverCart;

	const variants = product.variants.edges.map(({ node }) => node) ?? [];
	let selectedVariant = variants.find((variant) => variant.availableForSale) ?? variants[0];

	let raektun: string[] = [];
	try {
		raektun = JSON.parse(product.raektun?.value ?? '[]') as string[];
	} catch (error) {
		raektun = [];
	}

	let thruga: string[] = [];
	try {
		thruga = JSON.parse(product.thruga?.value ?? '[]') as string[];
	} catch (error) {
		thruga = [];
	}

	const vendor = getVendorFromName(product.vendor);
</script>

<div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
	{#if selectedVariant.image}
		<div class="sm:max-w-2xl">
			<img
				src={selectedVariant.image.url}
				width={selectedVariant.image.width ?? undefined}
				height={selectedVariant.image.height ?? undefined}
				class="object-cover aspect-[3/4] rounded shadow-xl"
				loading="lazy"
				alt="Product"
			/>
		</div>
	{/if}
	<div class="shrink-0">
		<div class="mb-4 border-b pb-2">
			<VendorName {vendor} linkify />
		</div>
		<h1 class="text-2xl mb-4">
			<strong>{product.title}</strong>
		</h1>
		{#if product.description.trim()}
			<p>{product.description}</p>
		{/if}
		<table class="table w-full max-w-sm">
			<tbody>
				{#if product.wineType}
					<tr>
						<td class="pr-2 font-semibold">Tegund</td>
						<td>{product.wineType.value}</td>
					</tr>
				{/if}
				{#if product.framleidandi}
					<tr>
						<td class="pr-2 font-semibold">Framleiðandi</td>
						<td>{product.framleidandi.value}</td>
					</tr>
				{/if}
				{#if product.region}
					<tr>
						<td class="pr-2 font-semibold">Hérað</td>
						<td>{product.region.value}</td>
					</tr>
				{/if}
				{#if product.country}
					<tr>
						<td class="pr-2 font-semibold">Land</td>
						<td>{product.country.value}</td>
					</tr>
				{/if}
				{#if thruga.length > 0}
					<tr>
						<td class="pr-2 font-semibold">Þrúga</td>
						<td>{thruga.join(', ')}</td>
					</tr>
				{/if}
				{#if product.magn}
					<tr>
						<td class="pr-2 font-semibold">Magn</td>
						<td>
							{Number(product.magn.value).toLocaleString('de-DE', {
								maximumFractionDigits: 3
							})}
							L
						</td>
					</tr>
				{/if}
				{#if product.abv}
					<tr>
						<td class="pr-2 font-semibold">ABV</td>
						<td>
							{Number(product.abv.value).toLocaleString('de-DE', {
								minimumFractionDigits: 1,
								maximumFractionDigits: 1
							})}
							%
						</td>
					</tr>
				{/if}
				{#if raektun.length > 0}
					<tr>
						<td class="pr-2 font-semibold">Ræktun</td>
						<td>{raektun.join(', ')}</td>
					</tr>
				{/if}
			</tbody>
		</table>
		<div class="flex items-center justify-between gap-2 border-t pt-4 mt-4">
			<div class="flex gap-2">
				{#each variants as variant}
					<button
						class={classNames(
							variant.id === selectedVariant.id
								? 'border-neutral-900 bg-neutral-900 text-white'
								: 'border-neutral-200 hover:border-neutral-800',
							'rounded border px-2 pb-0 pt-1 relative'
						)}
						on:click={() => {
							selectedVariant = variant;
						}}
					>
						{variant.title}
						{#if cart.lines.edges.find(({ node }) => node.merchandise.id === variant.id)}
							<div
								class="absolute -top-1 -right-1 rounded-full bg-[blue] w-2 h-2 border border-1 border-white"
							/>
						{/if}
					</button>
				{/each}
			</div>
			<p class="grow text-right">
				{new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(
					parseInt(selectedVariant.priceV2.amount)
				)}
				kr
			</p>
			{#if cart}
				<AddToCart variant={selectedVariant} {cart} />
			{/if}
		</div>
	</div>
</div>
