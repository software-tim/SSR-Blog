console.log("Loading entry.mjs starting chunk1...");
import { r as renderers } from './chunks/internal_BsTt5pTQ.mjs'
console.log("Imported chunk1:", internalChunk);


console.log("Beginning Next chunk2...");
import { createExports, serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cz-38XJL.mjs';
console.log("Imported chunk2:", internalChunk);




import { manifest } from './manifest_BAayLGRQ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/index.astro", _page1]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "mode": "standalone",
    "client": "file:///C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/dist/client/",
    "server": "file:///C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/dist/server/",
    "host": false,
    import { r as renderers } from './chunks/internal_BsTt5pTQ.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_Cz-38XJL.mjs';
import { manifest } from './manifest_BAayLGRQ.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/node.js", _page0],
    ["src/pages/index.astro", _page1]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => {},
    middleware: () => {}
});
const _args = {
  mode: "standalone",
  client: new URL('./client/', import.meta.url).href,
  server: new URL('./server/', import.meta.url).href,
  host: false,
  port: parseInt(process.env.PORT) || 8080
  assets: "_astro"
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
