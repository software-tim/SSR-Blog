/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_7CY3JyJ_.mjs';
import '@astrojs/internal-helpers/path';
import { $ as $$Image } from '../chunks/_astro_assets_Dkq2ymTh.mjs';
export { renderers } from '../renderers.mjs';

const error = new Proxy({"src":"/_astro/error-404.Ox42KQdE.png","width":512,"height":512,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/public/images/error-404.png";
							}
							
							return target[name];
						}
					});

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "404 - Page Not Found" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col items-center justify-items-center gap-7"> ${renderComponent($$result2, "Image", $$Image, { "src": error, "alt": "404", "width": "250", "height": "250", "class": "mt-10" })} <h1 class="text-5xl">Page Not Found</h1> <p class="text-2xl mb-10">
Sorry, we couldn't find the page you were looking for.
</p> <a href="/" class="inline-block bg-gray-100 p-2 mb-6 hover:bg-indigo-500 hover:text-white">Go Back Home</a> </div> ` })}`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/404.astro", void 0);

const $$file = "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$404,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
