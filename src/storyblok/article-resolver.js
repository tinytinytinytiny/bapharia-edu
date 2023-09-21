import { renderRichText } from '@storyblok/astro';
import { storyblokImage } from '@utils';

export default (component, blok) => {
	switch (component) {
		case 'figure':
			const img = storyblokImage(blok.content.filename);
			const sizes = '90vw';
			const attributes = `srcset="${img.generateSrcset()}" sizes="${sizes}" src="${img.optimizedUrl}" alt="${blok.content.alt}" width="${img.width}" height="${img.height}" decoding="async" loading="lazy"`;

			if (blok.caption) {
				return `<figure class="stack stack-space-2xs-rem">
					<img class="rounded" ${attributes}>
					<figcaption class="italic text-[1rem]">${blok.caption}</figcaption>
				</figure>`;
			}
			return `<img class="figure rounded" ${attributes}>`;
		case 'note':
			return `<aside class="note" data-style="${blok.title.toLowerCase()}">
				<p class="note-title">${blok.title}</p>
				<div class="note-body stack">${renderRichText(blok.content)}</div>
			</aside>`;
		case 'table':
			const randomId = crypto.randomUUID();
			return `<section class="table-container" aria-labelledby="${randomId}">
				<table data-layout="dense">
					<caption class="visually-hidden" id="${randomId}">${blok.caption}</caption>
					<thead>
						<tr>
							${blok.content.thead.map((th) => `<th>${th.value}</th>`).join('')}
						</tr>
					</thead>
					<tbody>
						${blok.content.tbody
					.map(
						(row) => `
							<tr>
								${row.body.map((cell) => `<td>${cell.value}</td>`).join('')}
							</tr>
						`
					)
					.join('')}
					</tbody>
				</table>
			</section>`;
		case 'youtube':
			return `<iframe class="youtube figure full-width rounded" width="1280" height="720" src="https://www.youtube.com/embed/${blok.video.split('=')[1]}" loading="lazy" title="${blok.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
		default:
			return `<p class="p-xs bg-surface-3 text-strong rounded font-bold">Component ${component} not found</p>`;
	}
};
