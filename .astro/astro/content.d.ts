declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
			components: import('astro').MDXInstance<{}>['components'];
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"category": Record<string, {
  id: string;
  slug: string;
  body: string;
  collection: "category";
  data: InferEntrySchema<"category">;
  render(): Render[".md"];
}>;
"posts": {
"2015-02-24--security-notes-regex/index.mdx": {
	id: "2015-02-24--security-notes-regex/index.mdx";
  slug: "2015-02-24--security-notes-regex";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2015-02-26--amazing-resources/index.mdx": {
	id: "2015-02-26--amazing-resources/index.mdx";
  slug: "2015-02-26--amazing-resources";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2015-03-10--stop-the-angularjs-hate/index.md": {
	id: "2015-03-10--stop-the-angularjs-hate/index.md";
  slug: "2015-03-10--stop-the-angularjs-hate";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2015-03-12--docker-makes-everything-better/index.md": {
	id: "2015-03-12--docker-makes-everything-better/index.md";
  slug: "2015-03-12--docker-makes-everything-better";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2015-04-06--docker-server-setup-notes/index.mdx": {
	id: "2015-04-06--docker-server-setup-notes/index.mdx";
  slug: "2015-04-06--docker-server-setup-notes";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2015-06-06--docker-firewall-setup/index.md": {
	id: "2015-06-06--docker-firewall-setup/index.md";
  slug: "2015-06-06--docker-firewall-setup";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2015-06-06--javascript-scope-magic/index.md": {
	id: "2015-06-06--javascript-scope-magic/index.md";
  slug: "2015-06-06--javascript-scope-magic";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2015-06-11--docker-rocks/index.md": {
	id: "2015-06-11--docker-rocks/index.md";
  slug: "2015-06-11--docker-rocks";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2015-06-12--love-computer-languages/index.mdx": {
	id: "2015-06-12--love-computer-languages/index.mdx";
  slug: "2015-06-12--love-computer-languages";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2015-08-05--angularjs-v2-impending-schism/index.md": {
	id: "2015-08-05--angularjs-v2-impending-schism/index.md";
  slug: "2015-08-05--angularjs-v2-impending-schism";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2015-10-05--higher-order-programming/index.md": {
	id: "2015-10-05--higher-order-programming/index.md";
  slug: "2015-10-05--higher-order-programming";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2015-11-22--disable-transparent-hugepages/index.md": {
	id: "2015-11-22--disable-transparent-hugepages/index.md";
  slug: "2015-11-22--disable-transparent-hugepages";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2015-12-18--when-ai-fails-and-the-crashing-robot-cars/index.md": {
	id: "2015-12-18--when-ai-fails-and-the-crashing-robot-cars/index.md";
  slug: "2015-12-18--when-ai-fails-and-the-crashing-robot-cars";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2016-06-01--naming-things-real-good/index.md": {
	id: "2016-06-01--naming-things-real-good/index.md";
  slug: "2016-06-01--naming-things-real-good";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2017-04-15--compare-nvme-ssd-cloud-options/index.md": {
	id: "2017-04-15--compare-nvme-ssd-cloud-options/index.md";
  slug: "2017-04-15--compare-nvme-ssd-cloud-options";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2017-05-01--linux-system-benchmark-scripts/index.md": {
	id: "2017-05-01--linux-system-benchmark-scripts/index.md";
  slug: "2017-05-01--linux-system-benchmark-scripts";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2017-05-10--pitfalls-in-promise-docs/index.md": {
	id: "2017-05-10--pitfalls-in-promise-docs/index.md";
  slug: "2017-05-10--pitfalls-in-promise-docs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2018-08-01--intro-to-promises/index.md": {
	id: "2018-08-01--intro-to-promises/index.md";
  slug: "2018-08-01--intro-to-promises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2018-09-26--promise-gotchas/index.md": {
	id: "2018-09-26--promise-gotchas/index.md";
  slug: "2018-09-26--promise-gotchas";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2018-09-30--visualizing-promises/index.md": {
	id: "2018-09-30--visualizing-promises/index.md";
  slug: "2018-09-30--visualizing-promises";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2018-10-03--stop-trying-to-make-async-await-happen/index.md": {
	id: "2018-10-03--stop-trying-to-make-async-await-happen/index.md";
  slug: "2018-10-03--stop-trying-to-make-async-await-happen";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2018-10-06--are-promises-broken/index.md": {
	id: "2018-10-06--are-promises-broken/index.md";
  slug: "2018-10-06--are-promises-broken";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2018-10-27--protect-your-tokens/index.md": {
	id: "2018-10-27--protect-your-tokens/index.md";
  slug: "2018-10-27--protect-your-tokens";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2018-11-14--securely-using-environment-variables-in-nodejs/index.md": {
	id: "2018-11-14--securely-using-environment-variables-in-nodejs/index.md";
  slug: "2018-11-14--securely-using-environment-variables-in-nodejs";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2018-11-15--you-may-not-need-axios/index.mdx": {
	id: "2018-11-15--you-may-not-need-axios/index.mdx";
  slug: "2018-11-15--you-may-not-need-axios";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2019-11-26--javascript-promises-quiz/index.mdx": {
	id: "2019-11-26--javascript-promises-quiz/index.mdx";
  slug: "2019-11-26--javascript-promises-quiz";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/index.mdx": {
	id: "2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge/index.mdx";
  slug: "2020-01-02--js-quiz-14-date-time-questions-test-your-knowledge";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2021-03-03--creating-collaborative-culture/index.md": {
	id: "2021-03-03--creating-collaborative-culture/index.md";
  slug: "2021-03-03--creating-collaborative-culture";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2021-03-03--the-4-pillars-of-collaborative-culture/index.md": {
	id: "2021-03-03--the-4-pillars-of-collaborative-culture/index.md";
  slug: "2021-03-03--the-4-pillars-of-collaborative-culture";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2023-08-13--mastering-functional-pipelines-passing-state/index.md": {
	id: "2023-08-13--mastering-functional-pipelines-passing-state/index.md";
  slug: "2023-08-13--mastering-functional-pipelines-passing-state";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2023-08-18--should-you-use-named-or-default-exports/index.mdx": {
	id: "2023-08-18--should-you-use-named-or-default-exports/index.mdx";
  slug: "2023-08-18--should-you-use-named-or-default-exports";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2023-08-28--deathmatch-git-rebase-vs-merge/index.md": {
	id: "2023-08-28--deathmatch-git-rebase-vs-merge/index.md";
  slug: "2023-08-28--deathmatch-git-rebase-vs-merge";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2023-09-06--guerrilla-types-in-typescript/index.md": {
	id: "2023-09-06--guerrilla-types-in-typescript/index.md";
  slug: "2023-09-06--guerrilla-types-in-typescript";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".md"] };
"2024-01-16--contribute-to-open-source-the-easy-way/index.mdx": {
	id: "2024-01-16--contribute-to-open-source-the-easy-way/index.mdx";
  slug: "2024-01-16--contribute-to-open-source-the-easy-way";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-08-22--upgrade-from-gatsby-to-astro/index.mdx": {
	id: "2024-08-22--upgrade-from-gatsby-to-astro/index.mdx";
  slug: "2024-08-22--upgrade-from-gatsby-to-astro";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-08-29--handling-international-numbers-and-currency/index.mdx": {
	id: "2024-08-29--handling-international-numbers-and-currency/index.mdx";
  slug: "2024-08-29--handling-international-numbers-and-currency";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-09-01--breaking-unicorns/index.mdx": {
	id: "2024-09-01--breaking-unicorns/index.mdx";
  slug: "2024-09-01--breaking-unicorns";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-09-29--one-weird-trick-to-speed-up-feature-teams/index.mdx": {
	id: "2024-09-29--one-weird-trick-to-speed-up-feature-teams/index.mdx";
  slug: "2024-09-29--one-weird-trick-to-speed-up-feature-teams";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-10-23--honest-priorities/index.mdx": {
	id: "2024-10-23--honest-priorities/index.mdx";
  slug: "2024-10-23--honest-priorities";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-10-31--quiz-data-structures-algorithms/index.mdx": {
	id: "2024-10-31--quiz-data-structures-algorithms/index.mdx";
  slug: "2024-10-31--quiz-data-structures-algorithms";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-10-31--quiz-do-you-know-esnext/index.mdx": {
	id: "2024-10-31--quiz-do-you-know-esnext/index.mdx";
  slug: "2024-10-31--quiz-do-you-know-esnext";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-10-31--quiz-js-interfaces-symbols-and-enumerables/index.mdx": {
	id: "2024-10-31--quiz-js-interfaces-symbols-and-enumerables/index.mdx";
  slug: "2024-10-31--quiz-js-interfaces-symbols-and-enumerables";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-11-01--quiz-master-modern-html5/index.mdx": {
	id: "2024-11-01--quiz-master-modern-html5/index.mdx";
  slug: "2024-11-01--quiz-master-modern-html5";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-11-06--quiz-can-you-count-to-bigint/index.mdx": {
	id: "2024-11-06--quiz-can-you-count-to-bigint/index.mdx";
  slug: "2024-11-06--quiz-can-you-count-to-bigint";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-11-07--quiz-modern-css-2025/index.mdx": {
	id: "2024-11-07--quiz-modern-css-2025/index.mdx";
  slug: "2024-11-07--quiz-modern-css-2025";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-11-08--quiz-css-core-fundamentals/index.mdx": {
	id: "2024-11-08--quiz-css-core-fundamentals/index.mdx";
  slug: "2024-11-08--quiz-css-core-fundamentals";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-11-08--quiz-sql-query-fundamentals/index.mdx": {
	id: "2024-11-08--quiz-sql-query-fundamentals/index.mdx";
  slug: "2024-11-08--quiz-sql-query-fundamentals";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-11-12--quiz-destructuring-delights/index.mdx": {
	id: "2024-11-12--quiz-destructuring-delights/index.mdx";
  slug: "2024-11-12--quiz-destructuring-delights";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/index.mdx": {
	id: "2024-11-15--quiz-nodejs-files-streams-buffers-oh-my/index.mdx";
  slug: "2024-11-15--quiz-nodejs-files-streams-buffers-oh-my";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-11-15--quiz-regex-or-wreckage/index.mdx": {
	id: "2024-11-15--quiz-regex-or-wreckage/index.mdx";
  slug: "2024-11-15--quiz-regex-or-wreckage";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-11-20--quiz-bash-in-the-shell/index.mdx": {
	id: "2024-11-20--quiz-bash-in-the-shell/index.mdx";
  slug: "2024-11-20--quiz-bash-in-the-shell";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-11-27--quiz-postgres-sql-mastery-pt1/index.mdx": {
	id: "2024-11-27--quiz-postgres-sql-mastery-pt1/index.mdx";
  slug: "2024-11-27--quiz-postgres-sql-mastery-pt1";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-11-28--quiz-postgres-sql-mastery-pt2/index.mdx": {
	id: "2024-11-28--quiz-postgres-sql-mastery-pt2/index.mdx";
  slug: "2024-11-28--quiz-postgres-sql-mastery-pt2";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-12-05--replacing-my-job-with-gpt-and-llm/index.mdx": {
	id: "2024-12-05--replacing-my-job-with-gpt-and-llm/index.mdx";
  slug: "2024-12-05--replacing-my-job-with-gpt-and-llm";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
"2024-12-11--quiz-in-the-aws-cloud/index.mdx": {
	id: "2024-12-11--quiz-in-the-aws-cloud/index.mdx";
  slug: "2024-12-11--quiz-in-the-aws-cloud";
  body: string;
  collection: "posts";
  data: InferEntrySchema<"posts">
} & { render(): Render[".mdx"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}
