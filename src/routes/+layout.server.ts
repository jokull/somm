import { getVendorFromSlug, vendors } from '$lib/utils';
import type { LayoutServerLoad } from './$types';

import { CartStore, graphql, type Cart$result } from '$houdini';
import { seal, unseal } from '$lib/session';

export const load: LayoutServerLoad = async ({ params, url, cookies, ...eventProps }) => {
	const session = await unseal(cookies);

	let cart: Cart$result['cart'] = null;

	const CreateCart = graphql(`
		mutation createCart($input: CartInput) {
			cartCreate(input: $input) {
				cart {
					...CartFields
				}
			}
		}
	`);

	if (session.cartId) {
		const Cart = new CartStore();
		const { data } = await Cart.fetch({
			variables: { cartId: session.cartId },
			event: { params, url, cookies, ...eventProps }
		});
		cart = data?.cart ?? null;
	} else {
		const { data } = await CreateCart.mutate({});
		if (data?.cartCreate?.cart) {
			await seal(cookies, { cartId: data.cartCreate.cart.id });
			cart = data.cartCreate.cart;
		}
	}

	return {
		vendor: getVendorFromSlug(params.vendor ?? ''),
		vendors: Object.values(vendors),
		wineType: url.searchParams.get('wineType'),
		session: session,
		cart
	};
};
