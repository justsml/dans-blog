webpackJsonp([0xfa2ab46f13d4],{1274:function(a,n){a.exports={data:{post:{id:"/Users/danlevy/code/oss/dans-blog/content/posts/2015-10-05--higher-order-programming/index.md absPath of file >>> MarkdownRemark",html:'<h1 id="exploring-array--and-set-based-pipeline-techniques"><a href="#exploring-array--and-set-based-pipeline-techniques" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Exploring Array- and Set-based Pipeline Techniques</h1>\n<p>\n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 645px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 66.640625%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAANABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIDAf/EABYBAQEBAAAAAAAAAAAAAAAAAAMBAv/aAAwDAQACEAMQAAABQxyShAuP/8QAGhAAAgMBAQAAAAAAAAAAAAAAAQIAAxESIf/aAAgBAQABBQK8lhS3MNx1fZg7avT/AP/EABYRAQEBAAAAAAAAAAAAAAAAAAEAEf/aAAgBAwEBPwFLG//EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAgBAgEBPwGVr//EABsQAAIBBQAAAAAAAAAAAAAAAAABQRARIWGR/9oACAEBAAY/Atl5J7XDaP/EABsQAAICAwEAAAAAAAAAAAAAAAERADEhQXFR/9oACAEBAAE/IWC6ITVNlcZZhxHIMYglh2oFgTyf/9oADAMBAAIAAwAAABAr7//EABYRAQEBAAAAAAAAAAAAAAAAAAEQIf/aAAgBAwEBPxAAxh//xAAXEQADAQAAAAAAAAAAAAAAAAAAESEB/9oACAECAQE/ENK6Of/EABwQAQEAAgMBAQAAAAAAAAAAAAERACFRcaFBkf/aAAgBAQABPxAeVDQPmOWtBWIcSZRgC0JJ5m1EhNjf7incGmhOu8S8LGnuf//Z\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image lazyload"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px transparent;"\n        alt="credit: susan-holt-simpson-799094-unsplash.jpg"\n        title=""\n        data-src="/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-ef7b7.jpg"\n        data-srcset="/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-c3db7.jpg 161w,\n/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-e67ed.jpg 323w,\n/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-ef7b7.jpg 645w,\n/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-04582.jpg 968w,\n/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-a5fcc.jpg 1280w"\n        sizes="(max-width: 645px) 100vw, 645px"\n      />\n    </span>\n  </span>\n  </p>\n<h2 id="an-anti-pattern"><a href="#an-anti-pattern" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>An Anti-Pattern?</h2>\n<p>This is an exploration of advantages gained when you <strong>code everything as an array.</strong> (Using Jedi concepts from SmallTalk)</p>\n<p>Here’s some guiding principles:</p>\n<ol>\n<li>\n<p>All input is array-like. Even if an array of 1.</p>\n</li>\n<li>\n<p>Higher level functions should generally accept AND return arrays. (Except for callback methods for loops: map/reduce/each/filter)</p>\n</li>\n<li>\n<p>99 out of 100 devs code suffers from what I call <code class="language-text">acute schema surplusage</code> syndrome.</p>\n</li>\n<li>\n<p>Beware bloated <code class="language-text">class-backed models</code> - with all the predictable trappings: fragile <code class="language-text">instance state</code> w/ so many levers and knobs to mess with, DB transactions, sql locks, async/mutexing (that always works first time), using idiomatic <code class="language-text">property getter/setters</code>, and your <code class="language-text">public/private/final/etc</code> usage is solid, right?</p>\n</li>\n<li>\n<p>So let me take a common problem and <em>shoehorn</em> <del>~add</del>~ some set-based musings.</p>\n</li>\n<li>\n<p>A hypothetical Blog Site has lots of Articles, and has even more Posts (Comments).</p>\n</li>\n<li>\n<p>Let’s add a <code class="language-text">delete</code> method (below) - but with support for both singular OR arrays.</p>\n</li>\n</ol>\n<div class="gatsby-highlight" data-language="java">\n      <pre class="language-java"><code class="language-java"><span class="token keyword">package</span> net<span class="token punctuation">.</span>danlevy<span class="token punctuation">.</span>why<span class="token punctuation">.</span>java___why<span class="token punctuation">.</span>you<span class="token punctuation">.</span>got<span class="token punctuation">.</span>all<span class="token punctuation">.</span>the<span class="token punctuation">.</span>dots____it<span class="token punctuation">.</span>must<span class="token punctuation">.</span>be<span class="token punctuation">.</span>all<span class="token punctuation">.</span>the<span class="token punctuation">.</span>factories<span class="token punctuation">;</span>\n\n<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Post</span> <span class="token punctuation">{</span>\n  <span class="token keyword">public</span> String   title<span class="token punctuation">;</span>\n  <span class="token keyword">public</span> Date     created<span class="token punctuation">;</span>\n  <span class="token keyword">public</span> String   message<span class="token punctuation">;</span>\n\n  <span class="token keyword">public</span> <span class="token function">Post</span><span class="token punctuation">(</span>String title<span class="token punctuation">,</span> String message<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>title    <span class="token operator">=</span> title<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>message  <span class="token operator">=</span> message<span class="token punctuation">;</span>\n    <span class="token keyword">this</span><span class="token punctuation">.</span>created  <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">public</span> Date <span class="token function">isArchived</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>created <span class="token operator">&lt;</span> <span class="token keyword">new</span> <span class="token class-name">Date</span><span class="token punctuation">(</span><span class="token number">2015</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token comment">// Post.delete` can be called w/ a singular Post or an array of Post[]</span>\n  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">delete</span><span class="token punctuation">(</span>Post post<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    List<span class="token generics function"><span class="token punctuation">&lt;</span>Post<span class="token punctuation">></span></span> posts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">List</span><span class="token generics function"><span class="token punctuation">&lt;</span>Post<span class="token punctuation">></span></span><span class="token punctuation">(</span>post<span class="token punctuation">)</span><span class="token punctuation">;</span>\n    <span class="token keyword">return</span> <span class="token function">delete</span><span class="token punctuation">(</span>posts<span class="token punctuation">)</span>\n  <span class="token punctuation">}</span>\n\n  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">int</span> <span class="token function">delete</span><span class="token punctuation">(</span>List<span class="token generics function"><span class="token punctuation">&lt;</span>Post<span class="token punctuation">></span></span> posts<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">return</span> posts<span class="token punctuation">.</span><span class="token function">map</span><span class="token punctuation">(</span>Dao<span class="token punctuation">.</span>remove<span class="token punctuation">)</span><span class="token punctuation">;</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span></code></pre>\n      </div>\n<blockquote>\n<p>Forgive me if my Java is a little rusty.</p>\n</blockquote>\n<!-- ![schema refactor][schema_refactor] -->',wordCount:{paragraphs:15,sentences:18,words:180},fields:{slug:"/higher-order-programming/",prefix:"2015-10-05"},frontmatter:{title:"Higher Order Programming",subTitle:null,category:"programming",relativePath:"/content/posts/2015-10-05--higher-order-programming/index.md",tags:["programming","patterns","models","source code","organization"],date:"2015-09-22T00:00:00.000Z",modified:"2017-05-13T00:00:00.000Z",cover:{childImageSharp:{resolutions:{width:220,height:220,src:"/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-bc901.jpg",srcSet:"/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-bc901.jpg 1x,\n/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-39e82.jpg 1.5x,\n/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-a8256.jpg 2x,\n/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-ef5e1.jpg 3x",srcWebp:"/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-ec1cf.webp",srcSetWebp:"/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-ec1cf.webp 1x,\n/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-c5012.webp 1.5x,\n/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-6ab8f.webp 2x,\n/static/susan-holt-simpson-799094-unsplash-f4dfca9c3f7bae04f3c691dacf5ecfeb-f9a43.webp 3x"}}}}},author:{id:"/Users/danlevy/code/oss/dans-blog/content/parts/author.md absPath of file >>> MarkdownRemark",html:'<p>Dan Levy is an accomplished programmer, teacher, speaker, cat dad and writer.\n<br /><br /></p>\n<p>Dan’s Open Source documentation and related writing is relied on by countless developers who use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">Mozilla Developer Network</a> site daily.\n<br /><br /></p>\n<p>His contributions span dozens of well-known projects, including <a href="https://github.com/nodejs/nodejs.org">NodeJS</a>, <a href="https://github.com/moby/moby">Docker</a>, <a href="https://github.com/ReactTraining/react-router/">React Router</a>, <a href="https://github.com/gatsbyjs/gatsby">GatsbyJS</a>, <a href="https://github.com/Angular/Angular">Angular</a>, <a href="https://github.com/petkaantonov/bluebird">Bluebird</a>, <a href="https://github.com/lodash/lodash">Lodash</a>, <a href="https://github.com/rancher/rancher">Rancher</a>, <a href="https://github.com/minio/minio">Minio</a>, <a href="https://github.com/lord/slate">Slate</a>, <a href="https://github.com/ReactiveX/IxJS">IxJS</a>, and <a href="https://github.com/functional-promises/functional-promises">Functional Promises</a>.\n<br /><br /></p>\n<p>Feel free to <a href="https://calendly.com/danlevy/">grab a spot on Dan’s calendar</a>, or reach out via <a href="https://twitter.com/justsml/">Twitter DMs</a> or <a href="/contact/">the contact form</a>.</p>'},footnote:{id:"/Users/danlevy/code/oss/dans-blog/content/parts/footnote.md absPath of file >>> MarkdownRemark",html:'<p>Unless otherwise noted, copyright ©2014-2021 Dan Levy.</p>\n<ul>\n<li>Photos by <a href="https://unsplash.com">unsplash.com</a></li>\n</ul>'},site:{siteMetadata:{facebook:{appId:""}}},allTags:{group:[{fieldValue:"ai",totalCount:1},{fieldValue:"amazon-web-services",totalCount:1},{fieldValue:"angularjs",totalCount:2},{fieldValue:"api-keys",totalCount:2},{fieldValue:"architecture",totalCount:1},{fieldValue:"artificial intelligence",totalCount:1},{fieldValue:"async",totalCount:5},{fieldValue:"async-await",totalCount:1},{fieldValue:"await",totalCount:1},{fieldValue:"azure",totalCount:1},{fieldValue:"benchmarks",totalCount:1},{fieldValue:"boot2docker",totalCount:1},{fieldValue:"challenge",totalCount:1},{fieldValue:"cloud",totalCount:1},{fieldValue:"collaborative-culture",totalCount:1},{fieldValue:"composition",totalCount:4},{fieldValue:"culture",totalCount:1},{fieldValue:"date",totalCount:1},{fieldValue:"date class",totalCount:1},{fieldValue:"debugging",totalCount:1},{fieldValue:"design",totalCount:1},{fieldValue:"development",totalCount:2},{fieldValue:"devops",totalCount:5},{fieldValue:"digital-ocean",totalCount:1},{fieldValue:"docker",totalCount:4},{fieldValue:"dos",totalCount:1},{fieldValue:"dotenv",totalCount:1},{fieldValue:"elasticsearch",totalCount:1},{fieldValue:"errors",totalCount:2},{fieldValue:"fails",totalCount:1},{fieldValue:"functional river",totalCount:1},{fieldValue:"go",totalCount:1},{fieldValue:"google-cloud-engine",totalCount:1},{fieldValue:"gotchas",totalCount:1},{fieldValue:"growth",totalCount:1},{fieldValue:"guides",totalCount:1},{fieldValue:"haskell",totalCount:1},{fieldValue:"io",totalCount:1},{fieldValue:"javascript",totalCount:11},{fieldValue:"json-web-tokens",totalCount:1},{fieldValue:"languages",totalCount:1},{fieldValue:"lua",totalCount:1},{fieldValue:"models",totalCount:1},{fieldValue:"mongodb",totalCount:2},{fieldValue:"mysql",totalCount:1},{fieldValue:"naming",totalCount:1},{fieldValue:"nodejs",totalCount:3},{fieldValue:"opinion",totalCount:1},{fieldValue:"organization",totalCount:2},{fieldValue:"ovh.net",totalCount:1},{fieldValue:"packet.net",totalCount:1},{fieldValue:"patterns",totalCount:7},{fieldValue:"performance",totalCount:4},{fieldValue:"personal-development",totalCount:1},{fieldValue:"postgres",totalCount:1},{fieldValue:"programming",totalCount:10},{fieldValue:"promises",totalCount:8},{fieldValue:"python",totalCount:2},{fieldValue:"quiz",totalCount:2},{fieldValue:"regex",totalCount:1},{fieldValue:"remote-exploit",totalCount:1},{fieldValue:"resources",totalCount:1},{fieldValue:"rust",totalCount:1},{fieldValue:"scala",totalCount:1},{fieldValue:"scaling",totalCount:1},{fieldValue:"secrets",totalCount:2},{fieldValue:"security",totalCount:4},{fieldValue:"self-driving cars",totalCount:1},{fieldValue:"server",totalCount:1},{fieldValue:"servers",totalCount:2},{fieldValue:"setup",totalCount:1},{fieldValue:"shell script",totalCount:1},{fieldValue:"smalltalk",totalCount:1},{fieldValue:"source code",totalCount:3},{fieldValue:"ssd",totalCount:1},{fieldValue:"teams",totalCount:1},{fieldValue:"tokens",totalCount:2},{fieldValue:"tuning",totalCount:1},{fieldValue:"visualizing",totalCount:1}]}},pathContext:{slug:"/higher-order-programming/"}}}});
//# sourceMappingURL=path---higher-order-programming-c3f54dc055a800196a5c.js.map