webpackJsonp([0x77f032c33cca],{1278:function(e,t){e.exports={data:{post:{id:"/app/content/posts/2015-03-12--docker-makes-everything-better/index.md absPath of file >>> MarkdownRemark",html:'<h1 id="docker-can-do-everything"><a href="#docker-can-do-everything" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Docker Can Do Everything!*</h1>\n<p>\n  <span\n    class="gatsby-resp-image-wrapper"\n    style="position: relative; display: block; ; max-width: 645px; margin-left: auto; margin-right: auto;"\n  >\n    <span\n      class="gatsby-resp-image-background-image"\n      style="padding-bottom: 72.265625%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAOABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIDBP/EABUBAQEAAAAAAAAAAAAAAAAAAAID/9oADAMBAAIQAxAAAAHI7zm7EAL/xAAaEAEAAgMBAAAAAAAAAAAAAAABAhEAEiEx/9oACAEBAAEFAtnLKPB6S6zp/8QAFhEAAwAAAAAAAAAAAAAAAAAAEBIh/9oACAEDAQE/AVo//8QAFxEBAAMAAAAAAAAAAAAAAAAAAAEREv/aAAgBAgEBPwHSpf/EABgQAAIDAAAAAAAAAAAAAAAAAAARASAh/9oACAEBAAY/AnJjr//EABsQAAMBAQADAAAAAAAAAAAAAAABESExUXGR/9oACAEBAAE/IU9ZZgqujHyViKehuYu+B7VF8P/aAAwDAQACAAMAAAAQBz//xAAXEQADAQAAAAAAAAAAAAAAAAAAAREh/9oACAEDAQE/EKVPTD//xAAXEQEBAQEAAAAAAAAAAAAAAAARAQAh/9oACAECAQE/EIpYBk6b/8QAGxAAAwEAAwEAAAAAAAAAAAAAAAERITFBYXH/2gAIAQEAAT8QwkyknAqxoq7JTtUs8FYehGeLi/YicU8H/9k=\'); background-size: cover; display: block;"\n    >\n      <img\n        class="gatsby-resp-image-image"\n        style="width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px transparent;"\n        alt="credit: guillaume-bolduc-259596-unsplash.jpg"\n        title=""\n        src="/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-ef7b7.jpg"\n        srcset="/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-c3db7.jpg 161w,\n/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-e67ed.jpg 323w,\n/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-ef7b7.jpg 645w,\n/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-04582.jpg 968w,\n/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-a5fcc.jpg 1280w"\n        sizes="(max-width: 645px) 100vw, 645px"\n      />\n    </span>\n  </span>\n  </p>\n<p>Improve your process for:</p>\n<ol>\n<li>Testing Dev Tools &#x26; Servers WITH VIRTUALLY ZERO risk of messing up dependencies on your PC</li>\n<li>Testing your software</li>\n<li>Makes you write more idempotent, modular code… (I’ll write how to actually realize this in a follow up)</li>\n</ol>\n<p>There may seem like a huge volume of new stuff to learn, <strong>don’t let that stop you</strong> from getting started.</p>\n<h4 id="notes"><a href="#notes" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>Notes</h4>\n<ul>\n<li>\n<p>If you see a <code class="language-text">docker run</code> command with either options <code class="language-text">-d</code> or <code class="language-text">-it</code>:</p>\n<ul>\n<li><code class="language-text">-it</code> or <code class="language-text">-i -t</code> will run the configured command interactively</li>\n<li><code class="language-text">-d</code> will start the docker container as a ‘daemon’ aka background service.</li>\n</ul>\n</li>\n</ul>\n<hr>\n<h1 id="examples"><a href="#examples" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>EXAMPLES</h1>\n<h2 id="nginx"><a href="#nginx" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>nginx</h2>\n<div class="gatsby-highlight" data-language="bash">\n      <pre class="language-bash"><code class="language-bash">\t<span class="token comment"># Note: using host-based, shared folders</span>\n\t<span class="token comment">#(shared folders are not possible with the VOLUME Dockerfile cmd)</span>\n\t<span class="token function">sudo</span> docker run --name web01 -d -p 8181:80 \\\n\t\t-v <span class="token variable"><span class="token variable">$(</span>NGINX_DIR<span class="token variable">)</span></span>/etc:/etc/nginx \\\n\t\t-v <span class="token variable"><span class="token variable">$(</span>NGINX_DIR<span class="token variable">)</span></span>/log:/var/log/nginx \\\n\t\t-v <span class="token variable"><span class="token variable">$(</span>NGINX_DIR<span class="token variable">)</span></span>/www:/var/www/html \\\n\t\tnginx:latest\n\n\t<span class="token comment"># Local data, isolated within instance</span>\n\t<span class="token function">sudo</span> docker run --name web01 -d -p 8181:80 nginx:latest\n\n\t<span class="token comment"># nodejs</span>\n\t<span class="token function">sudo</span> docker run --name nodejs01 -d -p 3300:3300 -p 4433:4433 nodejs:latest</code></pre>\n      </div>\n<blockquote>\n<p>Credits: <a href="https://dockerfile.github.io/#/nginx">https://dockerfile.github.io/#/nginx</a>\nDocker will make your life easier throughout the <em>entire</em> SDLC.</p>\n</blockquote>\n<blockquote>\n<ul>\n<li>Pretty close</li>\n</ul>\n</blockquote>',htmlAst:{type:"root",children:[{type:"element",tagName:"h1",properties:{id:"docker-can-do-everything"},children:[{type:"element",tagName:"a",properties:{href:"#docker-can-do-everything",ariaHidden:!0,className:["anchor"]},children:[{type:"element",tagName:"svg",properties:{ariaHidden:"true",height:16,version:"1.1",viewBox:"0 0 16 16",width:16},children:[{type:"element",tagName:"path",properties:{fillRule:"evenodd",d:"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"},children:[]}]}]},{type:"text",value:"Docker Can Do Everything!*"}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"\n  "},{type:"element",tagName:"span",properties:{className:["gatsby-resp-image-wrapper"],style:"position: relative; display: block; ; max-width: 645px; margin-left: auto; margin-right: auto;"},children:[{type:"text",value:"\n    "},{type:"element",tagName:"span",properties:{className:["gatsby-resp-image-background-image"],style:"padding-bottom: 72.265625%; position: relative; bottom: 0; left: 0; background-image: url('data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAOABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAIDBP/EABUBAQEAAAAAAAAAAAAAAAAAAAID/9oADAMBAAIQAxAAAAHI7zm7EAL/xAAaEAEAAgMBAAAAAAAAAAAAAAABAhEAEiEx/9oACAEBAAEFAtnLKPB6S6zp/8QAFhEAAwAAAAAAAAAAAAAAAAAAEBIh/9oACAEDAQE/AVo//8QAFxEBAAMAAAAAAAAAAAAAAAAAAAEREv/aAAgBAgEBPwHSpf/EABgQAAIDAAAAAAAAAAAAAAAAAAARASAh/9oACAEBAAY/AnJjr//EABsQAAMBAQADAAAAAAAAAAAAAAABESExUXGR/9oACAEBAAE/IU9ZZgqujHyViKehuYu+B7VF8P/aAAwDAQACAAMAAAAQBz//xAAXEQADAQAAAAAAAAAAAAAAAAAAAREh/9oACAEDAQE/EKVPTD//xAAXEQEBAQEAAAAAAAAAAAAAAAARAQAh/9oACAECAQE/EIpYBk6b/8QAGxAAAwEAAwEAAAAAAAAAAAAAAAERITFBYXH/2gAIAQEAAT8QwkyknAqxoq7JTtUs8FYehGeLi/YicU8H/9k='); background-size: cover; display: block;"},children:[{type:"text",value:"\n      "},{type:"element",tagName:"img",properties:{className:["gatsby-resp-image-image"],style:"width: 100%; height: 100%; margin: 0; vertical-align: middle; position: absolute; top: 0; left: 0; box-shadow: inset 0px 0px 0px 400px transparent;",alt:"credit: guillaume-bolduc-259596-unsplash.jpg",title:"",src:"/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-ef7b7.jpg",srcSet:["/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-c3db7.jpg 161w","/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-e67ed.jpg 323w","/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-ef7b7.jpg 645w","/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-04582.jpg 968w","/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-a5fcc.jpg 1280w"],sizes:["(max-width:","645px)","100vw,","645px"]},children:[]},{type:"text",value:"\n    "}]},{type:"text",value:"\n  "}]},{type:"text",value:"\n  "}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Improve your process for:"}]},{type:"text",value:"\n"},{type:"element",tagName:"ol",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"text",value:"Testing Dev Tools & Servers WITH VIRTUALLY ZERO risk of messing up dependencies on your PC"}]},{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"text",value:"Testing your software"}]},{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"text",value:"Makes you write more idempotent, modular code… (I’ll write how to actually realize this in a follow up)"}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"There may seem like a huge volume of new stuff to learn, "},{type:"element",tagName:"strong",properties:{},children:[{type:"text",value:"don’t let that stop you"}]},{type:"text",value:" from getting started."}]},{type:"text",value:"\n"},{type:"element",tagName:"h4",properties:{id:"notes"},children:[{type:"element",tagName:"a",properties:{href:"#notes",ariaHidden:!0,className:["anchor"]},children:[{type:"element",tagName:"svg",properties:{ariaHidden:"true",height:16,version:"1.1",viewBox:"0 0 16 16",width:16},children:[{type:"element",tagName:"path",properties:{fillRule:"evenodd",d:"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"},children:[]}]}]},{type:"text",value:"Notes"}]},{type:"text",value:"\n"},{type:"element",tagName:"ul",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"If you see a "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"docker run"}]},{type:"text",value:" command with either options "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"-d"}]},{type:"text",value:" or "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"-it"}]},{type:"text",value:":"}]},{type:"text",value:"\n"},{type:"element",tagName:"ul",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"-it"}]},{type:"text",value:" or "},{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"-i -t"}]},{type:"text",value:" will run the configured command interactively"}]},{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"element",tagName:"code",properties:{className:["language-text"]},children:[{type:"text",value:"-d"}]},{type:"text",value:" will start the docker container as a ‘daemon’ aka background service."}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"},{type:"element",tagName:"hr",properties:{},children:[]},{type:"text",value:"\n"},{type:"element",tagName:"h1",properties:{id:"examples"},children:[{type:"element",tagName:"a",properties:{href:"#examples",ariaHidden:!0,className:["anchor"]},children:[{type:"element",tagName:"svg",properties:{ariaHidden:"true",height:16,version:"1.1",viewBox:"0 0 16 16",width:16},children:[{type:"element",tagName:"path",properties:{fillRule:"evenodd",d:"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"},children:[]}]}]},{type:"text",value:"EXAMPLES"}]},{type:"text",value:"\n"},{type:"element",tagName:"h2",properties:{id:"nginx"},children:[{type:"element",tagName:"a",properties:{href:"#nginx",ariaHidden:!0,className:["anchor"]},children:[{type:"element",tagName:"svg",properties:{ariaHidden:"true",height:16,version:"1.1",viewBox:"0 0 16 16",width:16},children:[{type:"element",tagName:"path",properties:{fillRule:"evenodd",d:"M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"},children:[]}]}]},{type:"text",value:"nginx"}]},{type:"text",value:"\n"},{type:"element",tagName:"div",properties:{className:["gatsby-highlight"],dataLanguage:"bash"},children:[{type:"text",value:"\n      "},{type:"element",tagName:"pre",properties:{className:["language-bash"]},children:[{type:"element",tagName:"code",properties:{className:["language-bash"]},children:[{type:"text",value:"\t"},{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"# Note: using host-based, shared folders"}]},{type:"text",value:"\n\t"},{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"#(shared folders are not possible with the VOLUME Dockerfile cmd)"}]},{type:"text",value:"\n\t"},{type:"element",tagName:"span",properties:{className:["token","function"]},children:[{type:"text",value:"sudo"}]},{type:"text",value:" docker run --name web01 -d -p 8181:80 \\\n\t\t-v "},{type:"element",tagName:"span",properties:{className:["token","variable"]},children:[{type:"element",tagName:"span",properties:{className:["token","variable"]},children:[{type:"text",value:"$("}]},{type:"text",value:"NGINX_DIR"},{type:"element",tagName:"span",properties:{className:["token","variable"]},children:[{type:"text",value:")"}]}]},{type:"text",value:"/etc:/etc/nginx \\\n\t\t-v "},{type:"element",tagName:"span",properties:{className:["token","variable"]},children:[{type:"element",tagName:"span",properties:{className:["token","variable"]},children:[{type:"text",value:"$("}]},{type:"text",value:"NGINX_DIR"},{type:"element",tagName:"span",properties:{className:["token","variable"]},children:[{type:"text",value:")"}]}]},{type:"text",value:"/log:/var/log/nginx \\\n\t\t-v "},{type:"element",tagName:"span",properties:{className:["token","variable"]},children:[{type:"element",tagName:"span",properties:{className:["token","variable"]},children:[{type:"text",value:"$("}]},{type:"text",value:"NGINX_DIR"},{type:"element",tagName:"span",properties:{className:["token","variable"]},children:[{type:"text",value:")"}]}]},{type:"text",value:"/www:/var/www/html \\\n\t\tnginx:latest\n\n\t"},{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"# Local data, isolated within instance"}]},{type:"text",value:"\n\t"},{type:"element",tagName:"span",properties:{className:["token","function"]},children:[{type:"text",value:"sudo"}]},{type:"text",value:" docker run --name web01 -d -p 8181:80 nginx:latest\n\n\t"},{type:"element",tagName:"span",properties:{className:["token","comment"]},children:[{type:"text",value:"# nodejs"}]},{type:"text",value:"\n\t"},{type:"element",tagName:"span",properties:{className:["token","function"]},children:[{type:"text",value:"sudo"}]},{type:"text",value:" docker run --name nodejs01 -d -p 3300:3300 -p 4433:4433 nodejs:latest"}]}]},{type:"text",value:"\n      "}]},{type:"text",value:"\n"},{type:"element",tagName:"blockquote",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"p",properties:{},children:[{type:"text",value:"Credits: "},{type:"element",tagName:"a",properties:{href:"https://dockerfile.github.io/#/nginx"},children:[{type:"text",value:"https://dockerfile.github.io/#/nginx"}]},{type:"text",value:"\nDocker will make your life easier throughout the "},{type:"element",tagName:"em",properties:{},children:[{type:"text",value:"entire"}]},{type:"text",value:" SDLC."}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"},{type:"element",tagName:"blockquote",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"ul",properties:{},children:[{type:"text",value:"\n"},{type:"element",tagName:"li",properties:{},children:[{type:"text",value:"Pretty close"}]},{type:"text",value:"\n"}]},{type:"text",value:"\n"}]}],data:{quirksMode:!1}},wordCount:{paragraphs:15,sentences:17,words:134},fields:{slug:"/docker-makes-everything-better/",prefix:"2015-03-12"},frontmatter:{title:"Docker === Love",subTitle:"Docker can do :allthethings:!",category:"docker",relativePath:"/content/posts/2015-03-12--docker-makes-everything-better/index.md",tags:["docker","devops","patterns"],date:"2015-02-26T00:00:00.000Z",modified:"2015-09-23T00:00:00.000Z",cover:{childImageSharp:{resolutions:{width:220,height:220,src:"/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-bc901.jpg",srcSet:"/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-bc901.jpg 1x,\n/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-39e82.jpg 1.5x,\n/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-a8256.jpg 2x,\n/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-ef5e1.jpg 3x",srcWebp:"/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-ec1cf.webp",srcSetWebp:"/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-ec1cf.webp 1x,\n/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-c5012.webp 1.5x,\n/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-6ab8f.webp 2x,\n/static/guillaume-bolduc-259596-unsplash-4548b3b844b5cf30f2b771ac85b39918-f9a43.webp 3x"}}}}},author:{id:"/app/content/parts/author.md absPath of file >>> MarkdownRemark",html:'<p>Dan Levy is an accomplished programmer, teacher, speaker, cat dad and writer.\n<br /><br /></p>\n<p>Dan’s Open Source documentation and related writing is relied on by countless developers who use the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch">Mozilla Developer Network</a> site daily.\n<br /><br /></p>\n<p>His contributions span dozens of well-known projects, including <a href="https://github.com/nodejs/nodejs.org">NodeJS</a>, <a href="https://github.com/moby/moby">Docker</a>, <a href="https://github.com/ReactTraining/react-router/">React Router</a>, <a href="https://github.com/gatsbyjs/gatsby">GatsbyJS</a>, <a href="https://github.com/Angular/Angular">Angular</a>, <a href="https://github.com/petkaantonov/bluebird">Bluebird</a>, <a href="https://github.com/lodash/lodash">Lodash</a>, <a href="https://github.com/rancher/rancher">Rancher</a>, <a href="https://github.com/minio/minio">Minio</a>, <a href="https://github.com/lord/slate">Slate</a>, <a href="https://github.com/ReactiveX/IxJS">IxJS</a>, and <a href="https://github.com/functional-promises/functional-promises">Functional Promises</a>.\n<br /><br /></p>\n<p>Feel free to <a href="https://calendly.com/danlevy/">grab a spot on Dan’s calendar</a>, or reach out via <a href="https://twitter.com/justsml/">Twitter DMs</a> or <a href="/contact/">the contact form</a>.</p>'},footnote:{id:"/app/content/parts/footnote.md absPath of file >>> MarkdownRemark",html:'<p>Unless otherwise noted, copyright ©2014-2021 Dan Levy.</p>\n<ul>\n<li>Photos by <a href="https://unsplash.com">unsplash.com</a></li>\n</ul>'},site:{siteMetadata:{facebook:{appId:""}}},allTags:{group:[{fieldValue:"ai",totalCount:1},{fieldValue:"amazon-web-services",totalCount:1},{fieldValue:"angularjs",totalCount:2},{fieldValue:"api-keys",totalCount:2},{fieldValue:"architecture",totalCount:1},{fieldValue:"artificial intelligence",totalCount:1},{fieldValue:"async",totalCount:5},{fieldValue:"async-await",totalCount:1},{fieldValue:"await",totalCount:1},{fieldValue:"axios",totalCount:1},{fieldValue:"azure",totalCount:1},{fieldValue:"benchmarks",totalCount:1},{fieldValue:"boot2docker",totalCount:1},{fieldValue:"challenge",totalCount:1},{fieldValue:"cloud",totalCount:1},{fieldValue:"collaborative-culture",totalCount:2},{fieldValue:"composition",totalCount:4},{fieldValue:"culture",totalCount:2},{fieldValue:"date",totalCount:1},{fieldValue:"date class",totalCount:1},{fieldValue:"debugging",totalCount:1},{fieldValue:"design",totalCount:1},{fieldValue:"development",totalCount:2},{fieldValue:"devops",totalCount:5},{fieldValue:"digital-ocean",totalCount:1},{fieldValue:"docker",totalCount:4},{fieldValue:"dos",totalCount:1},{fieldValue:"dotenv",totalCount:1},{fieldValue:"elasticsearch",totalCount:1},{fieldValue:"errors",totalCount:2},{fieldValue:"examples",totalCount:1},{fieldValue:"fails",totalCount:1},{fieldValue:"fetch",totalCount:1},{fieldValue:"functional river",totalCount:1},{fieldValue:"go",totalCount:1},{fieldValue:"google-cloud-engine",totalCount:1},{fieldValue:"gotchas",totalCount:1},{fieldValue:"growth",totalCount:2},{fieldValue:"guides",totalCount:1},{fieldValue:"haskell",totalCount:1},{fieldValue:"io",totalCount:1},{fieldValue:"javascript",totalCount:11},{fieldValue:"json-web-tokens",totalCount:1},{fieldValue:"languages",totalCount:1},{fieldValue:"lua",totalCount:1},{fieldValue:"models",totalCount:1},{fieldValue:"mongodb",totalCount:2},{fieldValue:"mysql",totalCount:1},{fieldValue:"naming",totalCount:1},{fieldValue:"nodejs",totalCount:3},{fieldValue:"opinion",totalCount:1},{fieldValue:"organization",totalCount:2},{fieldValue:"ovh.net",totalCount:1},{fieldValue:"packet.net",totalCount:1},{fieldValue:"patterns",totalCount:7},{fieldValue:"performance",totalCount:4},{fieldValue:"personal-development",totalCount:2},{fieldValue:"postgres",totalCount:1},{fieldValue:"programming",totalCount:10},{fieldValue:"promises",totalCount:8},{fieldValue:"python",totalCount:2},{fieldValue:"quiz",totalCount:2},{fieldValue:"regex",totalCount:1},{fieldValue:"remote-exploit",totalCount:1},{fieldValue:"resources",totalCount:1},{fieldValue:"rust",totalCount:1},{fieldValue:"scala",totalCount:1},{fieldValue:"scaling",totalCount:1},{fieldValue:"secrets",totalCount:2},{fieldValue:"security",totalCount:4},{fieldValue:"self-driving cars",totalCount:1},{fieldValue:"server",totalCount:1},{fieldValue:"servers",totalCount:2},{fieldValue:"setup",totalCount:1},{fieldValue:"shell script",totalCount:1},{fieldValue:"smalltalk",totalCount:1},{fieldValue:"source code",totalCount:2},{fieldValue:"ssd",totalCount:1},{fieldValue:"teams",totalCount:2},{fieldValue:"tokens",totalCount:2},{fieldValue:"tuning",totalCount:1},{fieldValue:"visualizing",totalCount:1}]}},pathContext:{slug:"/docker-makes-everything-better/"}}}});
//# sourceMappingURL=path---docker-makes-everything-better-8c75e035a755e3bd6c3f.js.map