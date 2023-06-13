<script>
	import Icon from "@assets/icons/panel-left.svg?raw";

	export let controls;

	let button;

	function close() {
		const closeEvent = new CustomEvent("submenutoggle", {
			detail: {
				id: controls,
				open: false,
			},
			bubbles: true,
			cancelable: false,
		});

		button.dispatchEvent(closeEvent);
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
		bind:this={button}
	>
		<div class="icon">
			{@html Icon}
		</div>
		<span>Collapse menu</span>
	</button>
</div>

<style>
	.closer-container {
		background-color: var(--color-surface-2);
		inset-block-end: 0;
		padding-block: var(--space-xs) var(--space-s);
		position: sticky;
		z-index: 1;
	}
</style>
