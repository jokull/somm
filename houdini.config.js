/** @type {import('houdini').ConfigFile} */
const config = {
	apiUrl: 'https://somm-is.myshopify.com/api/2022-07/graphql.json',
	schemaPollHeaders: (env) => ({
		'Content-Type': 'application/json',
		'X-Shopify-Storefront-Access-Token': env.PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
	}),
	defaultFragmentMasking: 'disable',
	scalars: {
		Decimal: {
			type: 'string',
			unmarshal(val) {
				return parseFloat(val);
			},
			marshal(decimal) {
				return decimal.toString();
			}
		},
		URL: {
			type: 'string',
			unmarshal(val) {
				return val;
			},
			marshal(url) {
				return url.toString();
			}
		}
	},
	plugins: {
		'houdini-svelte': {
			client: './src/client.ts'
		}
	}
};

export default config;
