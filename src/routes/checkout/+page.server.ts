import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';

import { CountryCode, graphql } from '$houdini';
import { getDokobitSession } from '$lib/dokobit';
import { unseal } from '$lib/session';
import type { Actions, PageServerLoad } from './$types';

// On POST request to start the dokobit verification process and redirect to it
export const actions: Actions = {
	default: async ({ url, fetch }) => {
		const data = await fetch(`${env.DOKOBIT_URL}/create?access_token=${env.DOKOBIT_TOKEN}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ return_url: new URL('/checkout', url).toString() })
		}).then((response) => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
			return response.json() as unknown;
		});
		throw redirect(301, (data as { url: string }).url);
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

	if (dokobitSessionToken && session.cartId) {
		const dokobitSession = await getDokobitSession(dokobitSessionToken);
		const { cartBuyerIdentityUpdate } = await UpdateOrderMetadata.mutate({
			cartId: session.cartId,
			buyerIdentidy: {
				phone: dokobitSession.phone,
				countryCode: dokobitSession.country_code.toLocaleUpperCase() as CountryCode
			},
			attributes: [
				{ key: 'kennitala', value: dokobitSession.code },
				{ key: 'name', value: `${dokobitSession.name} ${dokobitSession.surname}` }
			]
		});
		if (cartBuyerIdentityUpdate?.cart?.checkoutUrl) {
			throw redirect(301, cartBuyerIdentityUpdate?.cart?.checkoutUrl);
		} else {
			throw Error('Could not checkout');
		}
	}

	return {};
};
