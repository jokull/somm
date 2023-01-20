<script lang="ts">
	import type { Cart$result } from '$houdini';
	import { getVendorFromName } from './utils';

	export let line: NonNullable<Cart$result['cart']>['lines']['edges'][0];
	const product = line.node.merchandise.product;
	const id = product.id.split('/').at(-1) ?? '';
	const vendor = getVendorFromName(product.vendor);
</script>

<a href={`/${vendor.slug}/${id}`} class="hover:underline">
	{product.title} / {line.node.merchandise.title}
</a>
