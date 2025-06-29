/* empty css                                 */
import { c as createComponent, b as createAstro, e as renderHead, f as renderSlot, a as renderTemplate, r as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                                    */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { children } = Astro2.props;
  return renderTemplate`<html lang="en" data-astro-cid-sckkx6r4> <head><meta charset="UTF-8"><title>Fancy Layout Test</title>${renderHead()}</head> <body data-astro-cid-sckkx6r4> <header data-astro-cid-sckkx6r4> <h1 data-astro-cid-sckkx6r4>🚀 Fancy Astro Layout</h1> </header> <main data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main> <footer data-astro-cid-sckkx6r4>
&copy; ${(/* @__PURE__ */ new Date()).getFullYear()} My Astro Site
</footer> </body></html>`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/layouts/Layout.astro", void 0);

const $$IndexOld = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<h2>Hello world</h2> <p>This is a test of a fancier layout.</p> ` })}`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/indexOld.astro", void 0);

const $$file = "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/indexOld.astro";
const $$url = "/indexOld";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$IndexOld,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
