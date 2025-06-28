import { c as createComponent, a as createAstro, r as renderHead, b as renderTemplate } from '../chunks/astro/server_BEmj2f1V.mjs';
import 'kleur/colors';
import 'clsx';
export { r as renderers } from '../chunks/internal_BsTt5pTQ.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><title>Test Page</title>${renderHead()}</head> <body> <h1>Hello from pure Astro SSR!</h1> <p>This should work with no JS.</p> </body></html>`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/index.astro", void 0);

const $$file = "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
