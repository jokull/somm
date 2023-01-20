<script lang="ts">
	import classNames from 'classnames';

	export let open: boolean;
	export let totalQuantity: number;
	export let onClick: () => void;
</script>

<button
	on:click|preventDefault={() => {
		onClick();
	}}
	class="bg-neutral-900 text-white rounded-md py-2 px-3 flex items-center justify-center text-sm font-medium gap-2"
>
	Karfa
	{#if totalQuantity > 0}
		<span>{totalQuantity}</span>
	{/if}

	<svg
		xmlns="http://www.w3.org/2000/svg"
		fill="none"
		viewBox="0 0 24 24"
		stroke-width={2}
		stroke="currentColor"
		class={classNames('w-4 h-4 transition-transform', open ? 'rotate-180' : '')}
	>
		<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
	</svg>
</button>
