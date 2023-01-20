<script lang="ts">
	export let dialog: HTMLDialogElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close
	on:click={(event) => {
		if (event.target === dialog) {
			dialog.close();
		}
	}}
	class="bg-white p-0 rounded-lg shadow-xl backdrop:bg-black/20 backdrop-blur-md"
>
	<slot />
</dialog>
