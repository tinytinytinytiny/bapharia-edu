<script>
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
		<div class="button__icon">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="36"
				height="36"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
				class="ai ai-PanelLeft"
				><rect x="2" y="3" width="20" height="18" rx="2" /><path
					d="M9 3v18"
				/></svg
			>
		</div>
		<span>Collapse menu</span>
	</button>
</div>

<style>
	.closer-container {
		background-color: var(--color-surface-2);
		inset-block-end: 0;
		padding-block: var(--space-xs);
		position: sticky;
	}
</style>
