import type { Products$result } from '$houdini';

export type Product = NonNullable<Products$result['collection']>['products']['edges'][0];
