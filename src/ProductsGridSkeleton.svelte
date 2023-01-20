<script lang="ts">
	import classNames from 'classnames';
</script>

<div
	class={classNames(
		'grid gap-x-4 gap-y-5 md:gap-x-6 md:gap-y-8 mb-12 pb-12 md:mb-28 md:pb-28 last-of-type:border-none last-of-type:pb-0',
		'grid-cols-[repeat(auto-fill,minmax(min(10rem,100%),1fr))]',
		'md:grid-cols-[repeat(auto-fill,minmax(min(12rem,100%),1fr))]',
		'lg:grid-cols-[repeat(auto-fill,minmax(min(14rem,100%),1fr))]',
		'xl:grid-cols-[repeat(auto-fill,minmax(min(18rem,100%),1fr))]'
	)}
>
	{#each [...Array(8).keys()] as key}
		<div class="flex flex-col gap-2">
			<div class="aspect-[3/4] bg-neutral-100 rounded" />
			<div class="h-6 w-full bg-neutral-100 rounded" />
			<div class="h-6 w-full bg-neutral-100 rounded" />
		</div>
	{/each}
</div>
