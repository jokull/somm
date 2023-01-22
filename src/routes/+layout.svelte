<script lang="ts">
	import '../app.postcss';
	import type { LayoutServerData } from './$types';

	import classNames from 'classnames';

	import Cart from './Cart.svelte';
	import Logo from './Logo.svelte';
	import SiggiImage from './SiggiImage.svelte';
	import WineTypeOption from './WineTypeOption.svelte';
	import Newsletter from './newsletter/Newsletter.svelte';

	export let data: LayoutServerData;
	$: ({ vendor, vendors, wineType, cart } = data);
	const wineTypes = [null, 'Rauðvín', 'Hvítvín', 'Rósavín', 'Freyðivín', 'Gulvín', 'Te'] as const;
</script>

<div class="mx-auto max-w-7xl relative">
	<div class="min-h-screen flex flex-col px-4 py-8">
		<div
			class="-mx-4 -mt-8 px-6 py-4 mb-12 sm:mb-4 text-center font-bold text-lg leading-tight bg-amber-100 text-amber-600 border-b border-amber-200"
		>
			Vefurinn er í gerjun <br />{' '}
			<span class="text-xs font-normal leading-tight">
				somm.is er enn á prufustigi - neðst niðri er póstlistaskráning fyrir þá sem vilja fylgjast
				með
			</span>
		</div>
		<div class="mb-8 lg:my-12 flex flex-row gap-4 items-center justify-between">
			<div><!-- /* spacer to center the next element* --></div>
			<a href="/">
				<div class="relative">
					<div class="">
						<Logo />
					</div>
					<img
						src="/bubble.png"
						width={112 / 2}
						height={98 / 2}
						alt="Wine is one my mind"
						class="absolute -left-12 -top-4 -z-10"
					/>
				</div>
			</a>
			<div>
				{#if cart}
					<Cart serverCart={cart} />
				{/if}
			</div>
		</div>
		<div class="grow">
			<div
				class="flex flex-col lg:justify-center gap-2 sm:gap-4 items-start lg:items-center mb-4 sm:mb-16 sm:mt-4"
			>
				<ul class="text-[blue] flex flex-wrap justify-center gap-x-2 md:gap-x-4 w-full lg:w-auto">
					{#each vendors as { name, slug }}
						<li
							id={slug}
							class={classNames('whitespace-nowrap', vendor && vendor.slug === slug && 'underline')}
						>
							<a href={`/${slug}`}>{name}</a>
						</li>
					{/each}
				</ul>
				<div class="flex flex-wrap justify-center w-full lg:w-auto gap-x-2 sm:gap-4">
					{#each wineTypes as option}
						<WineTypeOption
							href={option ? `?wineType=${option}` : vendor ? `/${vendor.slug}` : '/'}
							{option}
							current={wineType}
						/>
					{/each}
				</div>
			</div>
			<slot />
		</div>
		<footer class="flex justify-between items-end">
			<div class="mt-20">
				<div class="mb-8">
					<Newsletter />
				</div>
				<ul>
					<li>
						<a href="/skilmalar" class="truncate underline"> Skilmálar </a>
					</li>
					<li>
						<a href="/afhending" class="truncate underline"> Afhending </a>
					</li>
					<li>
						<a href="mailto:somm@somm.is" class="truncate underline"> Hafa samband </a>
					</li>
				</ul>
			</div>
			<div>
				<SiggiImage />
			</div>
		</footer>
	</div>
</div>
