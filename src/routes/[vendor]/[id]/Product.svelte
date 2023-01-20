<script lang="ts">
	import type { Product$result } from '$houdini';
	import { getVendorFromName } from '$lib/utils';
	import VendorName from '$lib/VendorName.svelte';

	export let product: NonNullable<Product$result['product']>;
	const variants = product.variants.edges.map(({ node }) => node);
	product;
	const variant = variants.find((variant) => variant.availableForSale) ?? variants[0];

	let raektun: string[] = [];
	try {
		raektun = JSON.parse(product.raektun?.value ?? '[]') as string[];
	} catch (error) {}

	let thruga: string[] = [];
	try {
		thruga = JSON.parse(product.thruga?.value ?? '[]') as string[];
	} catch (error) {}

	const vendor = getVendorFromName(product.vendor);
</script>

<div class="flex flex-col sm:flex-row gap-4 sm:gap-8">
	{#if variant.image}
		<div class="sm:max-w-2xl">
			<img
				src={variant.image.url}
				width={variant.image.width ?? undefined}
				height={variant.image.height ?? undefined}
				class="object-cover aspect-[3/4] rounded shadow-xl"
				loading="lazy"
				alt="Product"
			/>
		</div>
	{/if}
	<div class="shrink-0">
		<div class="mb-4">
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
		<div class="max-w-xs flex flex-col gap-2 mt-4">
			<!-- <VariantToCart product={product} /> -->
		</div>
	</div>
</div>
