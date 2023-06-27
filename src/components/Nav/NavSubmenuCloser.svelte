<script>
	import { submenu } from "./navStore.js";
	import Icon from "@assets/icons/panel-left.svg?raw";

	export let controls;

	function close() {
		submenu.set({ open: false, id: controls });
	}
</script>

<div class="closer-container hidden md:block">
	<button
		aria-controls={controls}
		class="button icon-label-button is-full"
		data-size="s"
		data-type="ghost"
		type="button"
		on:click={close}
	>
		<div class="icon">
			{@html Icon}
		</div>
		<span>Collapse menu</span>
	</button>
</div>

<style>
	.closer-container {
		background-color: var(--color-surface-1);
		inset-block-end: 0;
		padding-block: var(--space-xs) var(--space-s);
		position: sticky;
		z-index: 1;
	}
</style>
