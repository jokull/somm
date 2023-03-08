import { env } from '$env/dynamic/public';
import { HoudiniClient } from '$houdini';

// For Query & Mutation
// async function fetchQuery({ fetch, text = '', variables = {} }: RequestHandlerArgs) {
// 	const result = await fetch('https://somm-is.myshopify.com/api/2022-07/graphql', {
// 		method: 'POST',
// 		headers: {
// 			'Content-Type': 'application/json',
// 			Accept: 'application/json',
// 			'X-Shopify-Storefront-Access-Token': env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
// 		},
// 		body: JSON.stringify({
// 			query: text,
// 			variables
// 		})
// 	});

// 	return await result.json();
// }

// // For subscription (client only)
// let socketClient: SubscriptionHandler | null = null;
// if (browser) {
// 	socketClient = createWSClient({
// 		url: 'ws://localhost:4000/graphql'
// 	}) satisfies SubscriptionHandler;
// }

// Export the Houdini client
export default new HoudiniClient({
	url: 'https://somm-is.myshopify.com/api/2022-07/graphql',
	fetchParams({ text, variables }) {
		return {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				'X-Shopify-Storefront-Access-Token': env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
			},
			body: JSON.stringify({ query: text, variables: variables ?? {} })
		};
	}
});
