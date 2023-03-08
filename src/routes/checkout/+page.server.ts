import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

import { graphql, type CountryCode$options } from '$houdini';
import { getDokobitSession } from '$lib/dokobit';
import { unseal } from '$lib/session';
import type { Actions, PageServerLoad } from './$types';

// On POST request to start the dokobit verification process and redirect to it
export const actions: Actions = {
	default: async ({ url, fetch }) => {
		const returnUrl = new URL('/checkout', url);
		const data = await fetch(`${env.DOKOBIT_URL}/create?access_token=${env.DOKOBIT_TOKEN}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ return_url: returnUrl.toString() })
		}).then((response) => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
			return response.json() as unknown;
		});
		throw redirect(302, (data as { url: string }).url);
	}
};

// On GET requests process the dokobit based on the ?session_token, if presented
export const load: PageServerLoad = async ({ cookies, url }) => {
	const dokobitSessionToken = url.searchParams.get('session_token');
	const session = await unseal(cookies);

	const UpdateOrderMetadata = graphql(`
		mutation cartAttributesUpdate(
			$cartId: ID!
			$buyerIdentidy: CartBuyerIdentityInput!
			$attributes: [AttributeInput!]!
		) {
			cartAttributesUpdate(attributes: $attributes, cartId: $cartId) {
				__typename
			}
			cartBuyerIdentityUpdate(cartId: $cartId, buyerIdentity: $buyerIdentidy) {
				__typename
				cart {
					checkoutUrl
				}
			}
		}
	`);

	let checkoutUrl = '';

	if (dokobitSessionToken && session.cartId) {
		const dokobitSession = await getDokobitSession(dokobitSessionToken);
		const { data } = await UpdateOrderMetadata.mutate({
			cartId: session.cartId,
			buyerIdentidy: {
				phone: dokobitSession.phone,
				countryCode: dokobitSession.country_code.toLocaleUpperCase() as CountryCode$options
			},
			attributes: [
				{ key: 'kennitala', value: dokobitSession.code },
				{ key: 'name', value: `${dokobitSession.name} ${dokobitSession.surname}` }
			]
		});
		if (data?.cartBuyerIdentityUpdate?.cart?.checkoutUrl) {
			checkoutUrl = data.cartBuyerIdentityUpdate.cart.checkoutUrl;
			throw redirect(302, checkoutUrl);
		} else {
			throw Error('Could not checkout');
		}
	}

	return { checkoutUrl };
};
