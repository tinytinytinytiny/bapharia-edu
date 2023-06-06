<script>
	import screens from "@assets/design-tokens/screen-sizes.json";
	import { onMount } from "svelte";

	export let url = "/";
	export let title;
	export let current = false;
	export let controls;

	let expanded = Boolean(current);
	let interacted = false;
	let mounted;

	onMount(() => {
		mounted = true;

		const matchesMd = window.matchMedia(
			`(min-width: ${screens.md}) and (max-width: ${screens.lg})`
		);
		expanded = !matchesMd.matches;
		matchesMd.addEventListener("change", (event) => {
			if (event.matches) {
				if (!interacted) {
					expanded = false;
				}
			} else if (current && !interacted) {
				expanded = true;
			}
		});
	});

	function toggle() {
		interacted = true;
		expanded = !expanded;
		setContentOffset(expanded);
	}

	function setContentOffset(bool) {
		if (bool) {
			document.documentElement.classList.add("submenu-expanded");
		} else {
			document.documentElement.classList.remove("submenu-expanded");
		}
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
