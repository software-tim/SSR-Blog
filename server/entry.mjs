import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_BGHy5kC5.mjs';
import { manifest } from './manifest_DAkx5m4Y.mjs';

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/articles/search.astro.mjs');
const _page4 = () => import('./pages/articles/tag/_---tag_.astro.mjs');
const _page5 = () => import('./pages/articles/_slug_.astro.mjs');
const _page6 = () => import('./pages/articles.astro.mjs');
const _page7 = () => import('./pages/categories/_category_.astro.mjs');
const _page8 = () => import('./pages/categories.astro.mjs');
const _page9 = () => import('./pages/indexold.astro.mjs');
const _page10 = () => import('./pages/popular.astro.mjs');
const _page11 = () => import('./pages/tags/_tag_.astro.mjs');
const _page12 = () => import('./pages/tags.astro.mjs');
const _page13 = () => import('./pages/index.astro.mjs');

const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/articles/search.astro", _page3],
    ["src/pages/articles/tag/[...tag].astro", _page4],
    ["src/pages/articles/[slug].astro", _page5],
    ["src/pages/articles/index.astro", _page6],
    ["src/pages/categories/[category].astro", _page7],
    ["src/pages/categories/index.astro", _page8],
    ["src/pages/indexOld.astro", _page9],
    ["src/pages/popular.astro", _page10],
    ["src/pages/tags/[tag].astro", _page11],
    ["src/pages/tags/index.astro", _page12],
    ["src/pages/index.astro", _page13]
]);
const serverIslandMap = new Map();
const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "./client/",
    "server": "./server/",
    "host": "0.0.0.0",
    "port": 8080,
    "assets": "_astro"
};
const _exports = createExports(_manifest, _args);
const handler = _exports['handler'];
const startServer = _exports['startServer'];
const options = _exports['options'];
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { handler, options, pageMap, startServer };
