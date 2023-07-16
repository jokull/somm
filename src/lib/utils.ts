import type { Products$result } from '$houdini';
import * as R from 'remeda';

type Products = NonNullable<Products$result['collection']>['products'];

export const vendors = {
	kaffihusvesturbaejar: {
		name: 'Kaffi Vest',
		shopifyVendor: 'Vesturbær - Kaffihús ehf.',
		slug: 'kaffihusvesturbaejar',
		instagram: 'kaffihusvesturbaejar'
	},
	raeturogvin: {
		name: 'Rætur & Vín',
		shopifyVendor: 'Rætur & Vín ehf.',
		slug: 'raeturogvin',
		instagram: 'raeturogvin'
	},
	berjamor: {
		name: 'Berjamór',
		shopifyVendor: 'Berjamór ehf.',
		slug: 'berjamor',
		instagram: 'berjamor_vin'
	},
	baunir: {
		name: 'Baunir & Ber',
		shopifyVendor: 'Baunir & Ber ehf.',
		slug: 'baunir',
		instagram: 'baunirogber'
	},
	// vinstukan: {
	// 	name: 'Vínstúkan',
	// 	shopifyVendor: 'Vínstúkan Tíu Sopar',
	// 	slug: 'vinstukan',
	// 	instagram: 'vinstukan'
	// },
	akkurat: {
		name: 'Akkúrat',
		shopifyVendor: 'Akkúrat',
		slug: 'akkurat',
		instagram: 'akkurat'
	},
	vinbondinn: {
		name: 'Vínbóndinn',
		shopifyVendor: 'Vínbóndinn ehf.',
		slug: 'vinbondinn',
		instagram: 'vinbondinn'
	},
	'le-caviste': {
		name: 'Le Caviste',
		shopifyVendor: 'Le Caviste',
		slug: 'le-caviste',
		instagram: 'apero.rvk'
	}
} as const;

export function getVendorFromName(vendor: string) {
	return Object.values(vendors).find((value) => value.shopifyVendor === vendor) ?? vendors.baunir;
}

export function getVendorFromSlug(slug: string) {
	return Object.values(vendors).find((value) => value.slug === slug);
}

export function getProductsByVendor(products: Products) {
	const vendorProducts = R.pipe(
		products.edges,
		R.groupBy((x) => x.node.vendor)
	);
	const vendors = Object.keys(vendorProducts).map(getVendorFromName);

	return {
		vendors,
		vendorProducts: Object.entries(vendorProducts).flatMap(([vendorSlug, products]) => {
			const vendor = vendors.find(({ name }) => name === vendorSlug);
			if (vendor) {
				return [{ vendor, products }];
			} else {
				return [];
			}
		})
	};
}

export function getWineTypes(products: Products) {
	return Object.keys(
		R.pipe(
			products.edges,
			R.groupBy((x) => x.node.wineType?.value ?? '')
		)
	);
}

export function useWineType(products: Products, searchParams: URLSearchParams) {
	const wineType = searchParams.get('wineType');
	return {
		wineType,
		wineTypes: getWineTypes(products),
		products: products.edges.flatMap((product) => {
			if (wineType) {
				return product.node.wineType?.value === wineType ? [product] : [];
			} else {
				return [product];
			}
		})
	};
}
