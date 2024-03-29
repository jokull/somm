import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import { z } from 'zod';

import { graphql, type CountryCode$options } from '$houdini';
import { getDokobitSession } from '$lib/dokobit';
import { unseal } from '$lib/session';
import type { Actions } from './$types.js';

const dokobitCreateResponseSchema = z.object({
	status: z.enum(['ok']),
	session_token: z.string(),
	url: z.string(),
	expires_in: z.number() // Number of seconds
});

// On POST request to start the dokobit verification process and redirect to it
export const actions: Actions = {
	default: async ({ url, fetch }) => {
		// const returnUrl = new URL('/checkout', 'https://members.hundrad.is/');
		const returnUrl = new URL('/checkout', url);
		const data = await fetch(`${env.DOKOBIT_URL}/create?access_token=${env.DOKOBIT_TOKEN}`, {
			method: 'POST',
			headers: { 'content-type': 'application/json' },
			body: JSON.stringify({ return_url: returnUrl.toString() })
		}).then(async (response) => {
			if (response.status !== 200) {
				throw new Error(response.statusText);
			}
			return dokobitCreateResponseSchema.parse(await response.json());
		});
		throw redirect(302, (data as { url: string }).url);
	}
};

// On GET requests process the dokobit based on the ?session_token, if presented
export async function load(event) {
	const { cookies, url } = event;
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
		const { data } = await UpdateOrderMetadata.mutate(
			{
				cartId: session.cartId,
				buyerIdentidy: {
					phone: dokobitSession.phone,
					countryCode: dokobitSession.country_code.toLocaleUpperCase() as CountryCode$options
				},
				attributes: [
					{ key: 'kennitala', value: dokobitSession.code },
					{ key: 'name', value: `${dokobitSession.name} ${dokobitSession.surname}` }
				]
			},
			{ event: event }
		);
		if (data?.cartBuyerIdentityUpdate?.cart?.checkoutUrl) {
			checkoutUrl = data.cartBuyerIdentityUpdate.cart.checkoutUrl;
			throw redirect(302, checkoutUrl);
		} else {
			throw Error('Could not checkout');
		}
	}

	return { checkoutUrl };
}
