<script>
	import screens from "@data/design-tokens/screen-sizes.json";
	import { onMount } from "svelte";

	export let url = "/";
	export let title;
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
		<div class="nav-item__icon-container">
			<slot name="icon" />
		</div>
		<span>{title}</span>
	</button>
{:else}
	<a
		class="nav-item__link underline-on-hover"
		class:expanded
		href={url}
		aria-current={current ? "page" : "false"}
	>
		<div class="nav-item__icon-container">
			<slot name="icon" />
		</div>
		<span>{title}</span>
	</a>
{/if}
<slot />
