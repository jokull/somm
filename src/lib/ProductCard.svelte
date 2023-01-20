<script lang="ts">
	import classNames from 'classnames';
	import type { Product } from '$lib/types';
	export let cart: NonNullable<Cart$result['cart']>;
	import { getVendorFromName } from './utils';
	import WineTypeDot from './WineTypeDot.svelte';
	import VariantToCart from './VariantToCart.svelte';
	import type { Cart$result } from '$houdini';

	export let product: Product['node'];
	$: id = product.id.split('/').at(-1) ?? '';
	$: variants = product.variants.edges.map(({ node }) => node);
	$: variant = variants.find((variant) => variant.availableForSale) ?? variants[0];
	$: vendor = getVendorFromName(product.vendor);
</script>

<div>
	<a href={`/${vendor.slug}/${id}`} class="relative block">
		{#if variant.image}
			<div class="overflow-hidden rounded-md shadow-xl">
				<img
					src={variant.image.url}
					width={variant.image.width ?? undefined}
					height={variant.image.height ?? undefined}
					class="object-cover aspect-[3/4]"
					loading="lazy"
					alt="Product"
				/>
			</div>
		{/if}
		<div
			class={classNames(
				'py-2 px-3 flex justify-between items-center',
				'absolute inset-x-0 bottom-0',
				'text-black/70 font-light text-xs' // Typography
			)}
		>
			<div>
				{#if product.abv && Number(product.abv.value) === 0.0}
					<div class="whitespace-nowrap">
						{Number(product.abv.value).toLocaleString('de-DE', {
							minimumFractionDigits: 1,
							maximumFractionDigits: 1
						})}
						%
					</div>
				{/if}
			</div>
			<div class="flex items-center gap-2 text-xs">
				<span class="-mt-1">
					{#if product.wineType?.value}
						<WineTypeDot wineType={product.wineType.value} />
					{/if}
				</span>
				<span>
					{#if product.magn?.value}
						{`${Number(product.magn.value).toLocaleString('de-DE', {
							maximumFractionDigits: 3
						})}L`}
					{/if}
				</span>
			</div>
		</div>
	</a>
	<div class="mt-4 flex flex-col gap-1 md:gap-1.5">
		<div class="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-3">
			<a href={`/${vendor.slug}/${id}`} class="truncate grow-[2] min-w-0 max-w-full sm:max-w-none">
				{product.title}
			</a>
			<div class="text-neutral-500 text-right truncate text-xs md:text-base grow-[1]">
				{product.framleidandi?.value ?? ''}
			</div>
		</div>
		<VariantToCart {product} {cart} />
	</div>
</div>
