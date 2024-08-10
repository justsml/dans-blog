import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';
import { fixSlugPrefix } from '../shared/pathHelpers';

export async function GET(context) {
	const posts = await getCollection('posts');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			pubDate: new Date(post.data.date).toUTCString(),
			description: post.data.subTitle,
			category: post.data.category,
			cover: post.data?.cover?.src,
			link: `/${fixSlugPrefix(post.slug)}/`,
		})),
	});
}
