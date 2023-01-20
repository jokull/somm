<script lang="ts">
	import classNames from 'classnames';
	export let wineType: string;
</script>

<span
	class={classNames(
		'w-2 h-2 block rounded-full',
		wineType === 'Rauðvín' && 'bg-fuchsia-900',
		wineType === 'Hvítvín' && 'bg-amber-200',
		wineType === 'Rósavín' && 'bg-fuchsia-500',
		wineType === 'Freyðivín' && 'bg-amber-100',
		wineType === 'Gulvín' && 'bg-amber-300',
		wineType === 'Te' && 'bg-pink-300'
	)}
/>
