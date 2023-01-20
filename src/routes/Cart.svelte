<script lang="ts">
	import { graphql, type Cart$result } from '$houdini';
	import CartLines from '$lib/CartLines.svelte';
	import CartButton from '$lib/CartButton.svelte';
	import Dialog from '$lib/Dialog.svelte';
	import { fly } from 'svelte/transition';
	import type { CartClientCartVariables } from './$houdini';

	export let serverCart: NonNullable<Cart$result['cart']>;

	export const _CartClientCartVariables: CartClientCartVariables = () => {
		return { cartId: serverCart.id };
	};

	const store = graphql(`
		query CartClientCart($cartId: ID!) {
			cart(id: $cartId) {
				...CartFields
			}
		}
	`);

	$: cart = $store.data?.cart ?? serverCart;

	let open = false;
	let dialog: HTMLDialogElement;
</script>

<div class="font-sans">
	<nav class="fixed right-4 top-3 z-20">
		<div class="sm:hidden">
			<!-- Mobile -->
			<CartButton
				onClick={() => {
					dialog.showModal();
				}}
				{open}
				totalQuantity={cart.totalQuantity}
			/>
			<Dialog bind:dialog on:close={() => (open = false)}>
				<div class="p-4"><CartLines {cart} {dialog} /></div>
			</Dialog>
		</div>
		<div class="hidden sm:block">
			<!-- Desktop -->
			<CartButton
				onClick={() => {
					open = !open;
				}}
				{open}
				totalQuantity={cart.totalQuantity}
			/>
			{#if open}
				<div
					transition:fly={{ y: -20, duration: 250 }}
					class="bg-gray-100 rounded-md flex flex-col gap-2 p-6 mt-2 w-[480px] absolute z-10 top-10 right-0"
				>
					<CartLines {cart} />
				</div>
			{/if}
		</div>
	</nav>
</div>
