<script>
	import screens from "@data/design-tokens/screen-sizes.json";
	import ChevronDown from "@assets/icons/chevron-down.svg?raw";
	import ChevronRight  from "@assets/icons/chevron-right.svg?raw";
	import { onMount } from "svelte";

	export let url = "/";
	export let title;
	export let icon;
	export let current = false;
	export let controls;

	let expanded = Boolean(current);
	let interacted = false;
	let mounted;
	let button;
	let closeEvent;
	let openEvent;
	
	onMount(() => {
		mounted = true;

		closeEvent = new CustomEvent("submenutoggle", {
			detail: { id: controls, open: false },
			bubbles: true,
			cancelable: false,
		});

		openEvent = new CustomEvent("submenutoggle", {
			detail: { id: controls, open: true },
			bubbles: true,
			cancelable: false,
		});

		document.documentElement.addEventListener("submenutoggle", (event) => {
			if (event.detail.id === controls && event.detail.open) {
				open();
			} else {
				close();
			}
		});

		const maxBreakPoint = `${
			Number(screens["2xl"].split("rem")[0]) - 0.01
		}rem`;
		const minBreakPoint = window.matchMedia(
			`(min-width: ${screens.md}) and (max-width: ${maxBreakPoint})`
		);
		expanded = !minBreakPoint.matches;
		minBreakPoint.addEventListener("change", (event) => {
			if (event.matches) {
				expanded = false;
				document.documentElement.dispatchEvent(closeEvent);
			} else if (current) {
				expanded = true;
				document.documentElement.dispatchEvent(openEvent);
			}
		});
	});

	function toggle() {
		if (expanded) {
			button.dispatchEvent(closeEvent);
		} else {
			button.dispatchEvent(openEvent);
		}
	}

	function close() {
		interacted = true;
		expanded = false;
	}

	function open() {
		interacted = true;
		expanded = true;
	}
</script>

{#if mounted}
	<button
		class="nav-item__link underline-on-hover"
		class:interacted
		class:expanded
		aria-controls={controls}
		aria-current={current ? "page" : "false"}
		aria-expanded={expanded.toString()}
		type="button"
		on:click={toggle}
		bind:this={button}
	>
		<div class="icon">
			{@html icon}
		</div>
		<span>{title}</span>
		<div class="chevron icon md:hidden">
			{#if expanded}
				{#await ChevronDown then svg}
					{@html svg}
				{/await}
			{:else}
				{#await ChevronRight then svg}
					{@html svg}
				{/await}
			{/if}
		</div>
	</button>
{:else}
	<a
		class="nav-item__link underline-on-hover"
		class:expanded
		href={url}
		aria-current={current ? "page" : "false"}
	>
		<div class="icon">
			{@html icon}
		</div>
		<span>{title}</span>
	</a>
{/if}
<slot />

<style>
	.chevron {
		--icon-size: var(--space-m);
		color: var(--color-text-regular);
		margin-inline: auto calc(-1 * var(--space-3xs));
	}
</style>
