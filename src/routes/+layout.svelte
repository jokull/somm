<script lang="ts">
	import '../app.postcss';

	import classNames from 'classnames';

	import Cart from './Cart.svelte';
	import Logo from './Logo.svelte';
	import SiggiImage from './SiggiImage.svelte';
	import WineTypeOption from './WineTypeOption.svelte';
	import Newsletter from './newsletter/Newsletter.svelte';

	export let data;
	$: ({ vendor, vendors, wineType, cart, routeId } = data);
	$: wineTypes = [null, 'Rauðvín', 'Hvítvín', 'Rósavín', 'Freyðivín', 'Gulvín', 'Te'] as const;
	$: isProductGridPage = routeId === '/' || routeId === '/[vendor]' || routeId === '/[vendor]/[id]';
	$: wineTypeUrlBase = ((routeId === '/[vendor]/[id]' ? '/[vendor]' : routeId) ?? '').replace(
		'[vendor]',
		data.vendor?.slug ?? ''
	);
</script>

<div class="mx-auto max-w-7xl relative">
	<div class="min-h-screen flex flex-col px-4 py-8">
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
				{#if isProductGridPage}
					<div class="flex flex-wrap justify-center w-full lg:w-auto gap-x-2 sm:gap-4">
						{#each wineTypes as option}
							<WineTypeOption
								href={option ? `${wineTypeUrlBase}?wineType=${option}` : wineTypeUrlBase}
								{option}
								current={wineType}
							/>
						{/each}
					</div>
				{/if}
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
					<li class="mt-4">
						<div class="flex gap-2">
							<svg
								width="32"
								height="32"
								viewBox="0 0 512 512"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M325.228 131.82H186.781V380.612H325.228V131.82Z" fill="#FF5F00" />
								<path
									d="M195.571 256.225C195.549 232.264 200.978 208.613 211.448 187.061C221.919 165.509 237.155 146.622 256.003 131.829C232.662 113.482 204.629 102.072 175.11 98.9037C145.591 95.7353 115.776 100.936 89.0725 113.912C62.3692 126.887 39.8553 147.114 24.1041 172.28C8.35298 197.446 0 226.536 0 256.225C0 285.914 8.35298 315.004 24.1041 340.17C39.8553 365.336 62.3692 385.562 89.0725 398.538C115.776 411.513 145.591 416.714 175.11 413.546C204.629 410.378 232.662 398.968 256.003 380.621C237.155 365.828 221.919 346.941 211.449 325.389C200.979 303.837 195.549 280.185 195.571 256.225Z"
									fill="#EB001B"
								/>
								<path
									d="M512 256.225C512.001 285.913 503.649 315.003 487.899 340.169C472.149 365.335 449.636 385.562 422.933 398.538C396.23 411.513 366.415 416.714 336.896 413.546C307.378 410.378 279.346 398.968 256.005 380.621C274.837 365.813 290.061 346.922 300.529 325.374C310.998 303.825 316.437 280.181 316.437 256.225C316.437 232.268 310.998 208.624 300.529 187.076C290.061 165.527 274.837 146.637 256.005 131.828C279.346 113.482 307.378 102.072 336.896 98.9036C366.415 95.7353 396.23 100.936 422.933 113.912C449.636 126.888 472.149 147.114 487.899 172.28C503.649 197.447 512.001 226.536 512 256.225Z"
									fill="#F79E1B"
								/>
								<path
									d="M496.905 354.265V349.171H498.959V348.134H493.729V349.171H495.783V354.265H496.905ZM507.06 354.265V348.124H505.457L503.613 352.348L501.768 348.124H500.164V354.265H501.296V349.632L503.026 353.626H504.199L505.929 349.622V354.265H507.06Z"
									fill="#F79E1B"
								/>
							</svg>
							<svg
								width="32"
								height="32"
								viewBox="0 0 512 512"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M253.509 175.921L219.303 335.84H177.929L212.138 175.921H253.509ZM427.568 279.182L449.343 219.13L461.874 279.182H427.568ZM473.744 335.84H512L478.578 175.921H443.29C435.337 175.921 428.632 180.532 425.665 187.643L363.587 335.84H407.037L415.662 311.957H468.734L473.744 335.84ZM365.742 283.632C365.921 241.426 307.397 239.088 307.789 220.23C307.915 214.5 313.382 208.397 325.331 206.836C331.255 206.073 347.603 205.454 366.134 213.993L373.381 180.068C363.429 176.467 350.62 173 334.683 173C293.783 173 265.012 194.725 264.782 225.859C264.519 248.883 285.334 261.72 300.984 269.388C317.119 277.226 322.525 282.251 322.446 289.254C322.335 299.983 309.58 304.734 297.704 304.914C276.892 305.238 264.828 299.289 255.214 294.807L247.704 329.866C257.387 334.297 275.227 338.153 293.7 338.351C337.183 338.351 365.612 316.881 365.742 283.632ZM194.391 175.921L127.357 335.84H83.6302L50.64 208.213C48.6401 200.365 46.8957 197.48 40.8134 194.164C30.8645 188.761 14.4413 183.708 0 180.564L0.978353 175.921H71.3758C80.3427 175.921 88.4104 181.888 90.4642 192.218L107.891 284.765L150.927 175.921H194.391Z"
									fill="#1434CB"
								/>
							</svg>
						</div>
					</li>
				</ul>
			</div>
			<div>
				<SiggiImage />
			</div>
		</footer>
	</div>
</div>
