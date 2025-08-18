<script>
	import { submenu } from "./navStore.js";
	import ChevronDown from "@assets/icons/chevron-down.svg?raw";
	import ChevronRight from "@assets/icons/chevron-right.svg?raw";
	import PanelLeft from "@assets/icons/panel-left.svg?raw";
	import { onMount } from "svelte";

	export let url = "/";
	export let title;
	export let icon;
	export let current = false;
	export let id; // id of submenu container

	let expanded = Boolean(current);
	let interacted = false;
	let mounted;
	let submenuRef;

	onMount(() => {
		mounted = true;

		document.documentElement.addEventListener("submenutoggle", (event) => {
			if (event.detail.id === id && event.detail.newState === "open") {
				open();
			} else {
				close();
			}
		});

		const isBetweenMinAndMaxBreakpoint = submenu.get().containerQuery;
		expanded = !isBetweenMinAndMaxBreakpoint.matches; // set aria-expanded
		if (isBetweenMinAndMaxBreakpoint.matches) {
			expanded = false;
			submenuRef.dispatchEvent(
				new CustomEvent("submenutoggle", {
					bubbles: true,
					detail: {
						id,
						newState: "closed",
					},
				}),
			);
		} else if (current) {
			expanded = true;
			submenuRef.dispatchEvent(
				new CustomEvent("submenutoggle", {
					bubbles: true,
					detail: {
						id,
						newState: "open",
					},
				}),
			);
		}
		isBetweenMinAndMaxBreakpoint.addEventListener("change", (event) => {
			if (event.matches) {
				submenuRef.dispatchEvent(
					new CustomEvent("submenutoggle", {
						bubbles: true,
						detail: {
							id,
							newState: "closed",
							oldState: expanded ? "open" : "closed",
						},
					}),
				);
				expanded = false;
			} else if (current) {
				submenuRef.dispatchEvent(
					new CustomEvent("submenutoggle", {
						bubbles: true,
						detail: {
							id,
							newState: "open",
							oldState: expanded ? "open" : "closed",
						},
					}),
				);
			}
		});
	});

	function toggle(event) {
		if (expanded) {
			event.target.dispatchEvent(
				new CustomEvent("submenutoggle", {
					bubbles: true,
					detail: {
						id,
						newState: "closed",
						oldState: "open",
					},
				}),
			);
		} else {
			event.target.dispatchEvent(
				new CustomEvent("submenutoggle", {
					bubbles: true,
					detail: {
						id,
						newState: "open",
						oldState: "closed",
					},
				}),
			);
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

<!-- replace link with button when javascript loads -->
{#if mounted}
	<button
		class="nav-item__link underline-on-hover"
		class:interacted
		class:expanded
		aria-controls={id}
		aria-current={current ? "page" : "false"}
		aria-expanded={expanded.toString()}
		type="button"
		on:click={toggle}
	>
		<div class="icon">
			{@html icon}
		</div>
		<span>{title}</span>
		<div class="chevron icon @md/body:hidden">
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
<!-- submenu container -->
<div {id} class="nav-submenu" bind:this={submenuRef}>
	<!-- close button -->
	<div class="closer-container hidden @md/body:block">
		<button
			aria-controls={id}
			class="button icon-label-button is-full justify-start"
			data-size="s"
			data-type="ghost"
			type="button"
			on:click={(event) => {
				event.target.dispatchEvent(
					new CustomEvent("submenutoggle", {
						bubbles: true,
						detail: {
							id,
							newState: "closed",
							oldState: "open",
						},
					}),
				);
			}}
		>
			<div class="icon">
				{@html PanelLeft}
			</div>
			<span>Hide menu</span>
		</button>
	</div>
	<slot />
</div>

<style>
	.chevron {
		color: var(--color-text-regular);
		margin-inline: auto calc(-1 * var(--space-3xs));
	}

	.closer-container {
		background-color: var(--color-surface-1);
		border-bottom-left-radius: var(--border-radius);
		border-bottom-right-radius: var(--border-radius);
		inset-block-end: 0;
		margin-block: calc(-1 * var(--main-region-padding)) var(--space-2xs);
		padding-block-start: var(--main-region-padding);
		position: sticky;
		top: calc(-1 * var(--main-region-padding));
		z-index: 2;
	}
</style>
