<script lang="ts">
	import { onMount } from 'svelte';

	let index = 0;
	onMount(() => {
		index = (odds.length * Math.random()) | 0;
	});
	const odds = ['cheese.png', 'boy.png', 'girl.png', 'horse.png'];
</script>

<div>
	<img
		src={`/${odds[index]}`}
		alt="Illustrations by Siggi Odds"
		width={534 / 2.5}
		height={408 / 2.5}
		class="object-contain"
	/>
</div>
