<script lang="ts">
	import { graphql, type Cart$result } from '$houdini';
	import classNames from 'classnames';
	import CartLineItemQuantity from './CartLineItemQuantity.svelte';
	import CartLineTitle from './CartLineTitle.svelte';
	import TrashIcon from './TrashIcon.svelte';

	export let cart: NonNullable<Cart$result['cart']>;
	export let dialog: HTMLDialogElement | undefined = undefined;

	const removeCartItem = graphql(`
		mutation RemoveCartItem($cartId: ID!, $lineItemId: ID!) {
			cartLinesRemove(cartId: $cartId, lineIds: [$lineItemId]) {
				cart {
					...CartFields
				}
			}
		}
	`);

	function remove(lineItemId: string) {
		removeCartItem.mutate({
			cartId: cart.id,
			lineItemId
		});
	}

	$: bottles = cart.lines.edges.flatMap(({ node }) =>
		node.merchandise.image
			? Array.from({ length: node.quantity }).map(() => node.merchandise.image!)
			: []
	);

	const maxBottleLength = 8 * 2;
</script>

<h2 class="text-xl mb-2 font-medium">Karfa</h2>

<div class="grid grid-cols-8 gap-1 items-center max-w-md mb-8">
	{#each bottles.slice(0, maxBottleLength - 1) as bottle}
		<img
			src={bottle.url}
			width={bottle.width ?? undefined}
			height={bottle.height ?? undefined}
			class="object-cover h-20 aspect-[2/3] rounded shadow"
			loading="lazy"
			alt="Product"
		/>
	{/each}
	{#if bottles.length > maxBottleLength - 1}
		<div class="h-20 rounded flex items-center justify-center text-lg font-serif font-bold">
			+ {bottles.length - (maxBottleLength - 1)}
		</div>
	{/if}
</div>

{#if cart.lines.edges.length > 0}
	{#each cart.lines.edges as line}
		<div class="flex gap-2">
			<div class="truncate min-w-0 w-full">
				{#key line.node.id}
					<CartLineTitle {line} />
				{/key}
			</div>
			<CartLineItemQuantity {cart} {line} />
			<div class="whitespace-nowrap tabular-nums slashed-zero w-[105px] text-right">
				{parseInt(line.node.cost.totalAmount.amount).toLocaleString('de-DE', {
					maximumFractionDigits: 0
				})}{' '}
				kr
			</div>
			<div class="whitespace-nowrap">
				<button
					class={classNames(removeCartItem && 'opacity-20', 'hover:text-[blue]')}
					on:click={() => remove(line.node.id)}
				>
					<TrashIcon />
				</button>
			</div>
		</div>
	{/each}

	<div class="border-t mt-2 pt-3 flex justify-between font-medium">
		<div>Samtals</div>
		<div class="shrink-0 w-[105px] text-right">
			{parseInt(cart.cost.totalAmount.amount).toLocaleString('de-DE', {
				maximumFractionDigits: 0
			})}{' '}
			kr
		</div>
	</div>
	<div class="mt-4">
		<form method="POST" action="/checkout" class="flex gap-4">
			{#if dialog}
				<button
					class="grow-[1] rounded-md py-3 px-4 bg-neutral-200"
					on:click|preventDefault={() => {
						dialog?.close();
					}}>Loka</button
				>
			{/if}
			{#if bottles.length < 2}
				<button
					disabled
					class="grow-[2] text-lg flex items-center justify-center gap-2 py-3 px-4 rounded-md text-black/20 bg-neutral-200"
					>Lágmark 2 flöskur per pöntun</button
				>
			{:else}
				<button
					class="grow-[2] font-medium shadow-xl text-lg flex items-center justify-center gap-2 py-3 px-4 rounded-md text-white bg-neutral-900"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width={1.5}
						stroke="currentColor"
						class="w-5 h-5"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
						/>
					</svg>
					<div>Halda áfram í Auðkenni</div>
				</button>
			{/if}
		</form>
	</div>
	<div class="mt-4 text-sm text-neutral-600 text-center">
		Með því að smella á Auðkenni samþykkir þú <a class="font-bold underline" href="/skilmalar"
			>skilmála</a
		> Somm.is
	</div>
	<div class="mt-2 text-xs text-neutral-400 text-center">
		Ekki má selja eða afhenda þeim áfengi sem eru yngri en 20 ára
	</div>
{:else}
	<div>Tóm karfa</div>
{/if}
