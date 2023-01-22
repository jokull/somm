import { env } from '$env/dynamic/private';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request, fetch }) => {
		const data = await request.formData();
		const email = data.get('email');

		if (!email) {
			return fail(400, { email, missing: true });
		}

		await fetch('https://api.hubapi.com/communication-preferences/v3/subscribe', {
			method: 'POST',
			headers: {
				accept: 'application/json',
				'content-type': 'application/json',
				authorization: `Bearer ${env.HUBSPOT_API_TOKEN}`
			},
			body: JSON.stringify({
				emailAddress: email,
				subscriptionId: env.HUBSPOT_SUBSCRIPTION_ID,
				legalBasis: 'LEGITIMATE_INTEREST_PQL',
				legalBasisExplanation: 'User explicitly signed up via somm.is website'
			})
		});

		return { success: true };
	}
};
