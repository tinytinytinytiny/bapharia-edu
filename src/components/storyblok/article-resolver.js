import { renderRichText } from "@storyblok/astro";
import { storyblokImage } from "@utils";

export default (component, blok) => {
	switch (component) {
		case "figure": {
			const img = storyblokImage(blok.content.filename);
			const sizes = "90vw";
			const attributes = `srcset="${img.generateSrcset()}" sizes="${sizes}" src="${img.optimizedUrl}" alt="${blok.content.alt}" width="${img.width}" height="${img.height}" decoding="async" loading="lazy" crossorigin`;

			if (blok.caption) {
				return `<figure class="${blok.fullWidth ? "full-width justify-self-center" : ""}">
					<img class="rounded" ${attributes}>
					<figcaption class="text--1 mbs-2xs">${blok.caption}</figcaption>
				</figure>`;
			}
			return `<img class="figure rounded ${blok.fullWidth ? "full-width justify-self-center" : ""}" ${attributes}>`;
		}
		case "note": {
			const noteLabelId = crypto.randomUUID();
			const icons = {
				note: '<circle cx="12" cy="12" r="10"/><path d="M12 7h.01"/><path d="M10 11h2v5"/><path d="M10 16h4"/>',
				tip: '<path d="M10 22h4M5 9a7 7 0 0 1 14 0 6.972 6.972 0 0 1-3 5.734l-.542 2.566a2 2 0 0 1-1.977 1.7h-2.962a2 2 0 0 1-1.977-1.7L8 14.745A6.992 6.992 0 0 1 5 9z"/><path d="M8 15h8"/>',
				caution:
					'<path d="M12 9v5"/><path d="M12 17.5v.5"/><path d="M2.232 19.016L10.35 3.052c.713-1.403 2.59-1.403 3.302 0l8.117 15.964C22.45 20.36 21.544 22 20.116 22H3.883c-1.427 0-2.334-1.64-1.65-2.984z"/>',
			};
			return `<aside class="note" data-style="${blok.title.toLowerCase()}" aria-labelledby="${noteLabelId}" data-icon="top">
				<div class="note-body stack">
					<p class="h4" id="${noteLabelId}" aria-hidden="true">${blok.title}</p>
					${renderRichText(blok.content)}
				</div>
				<div class="note-icon">
					<div class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							${icons[blok.title.toLowerCase()] || icons.note}
						</svg>
					</div>
				</div>
			</aside>`;
		}
		case "table": {
			const tableCaptionId = crypto.randomUUID();
			return `<section class="table-container" aria-labelledby="${tableCaptionId}">
				<table data-layout="dense">
					<caption class="visually-hidden" id="${tableCaptionId}">${blok.caption}</caption>
					<thead>
						<tr>
							${blok.content.thead.map((th) => `<th>${th.value}</th>`).join("")}
						</tr>
					</thead>
					<tbody>
						${blok.content.tbody
							.map(
								(row) => `
							<tr>
								${row.body.map((cell) => `<td>${cell.value}</td>`).join("")}
							</tr>
						`,
							)
							.join("")}
					</tbody>
				</table>
			</section>`;
		}
		case "youtube": {
			return `<lite-youtube class="youtube figure full-width justify-self-center rounded" videoid="${blok.video.split("=")[1]}">
				<a href="https://youtube.com/watch?v=${blok.video.split("=")[1]}" class="lite-youtube-fallback" title="Play Video">
					Watch on YouTube: ${blok.title}
				</a>
			</lite-youtube>`;
		}
		default:
			return `<p class="p-xs bg-surface-3 text-strong rounded font-bold">Component ${component} not found</p>`;
	}
};
