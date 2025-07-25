/* empty css                                    */
import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_7CY3JyJ_.mjs';
import { g as getCollection } from '../../chunks/_astro_content_DhWa9HZ5.mjs';
import { A as ARTICLES_PER_PAGE, $ as $$SearchForm, a as $$Pagination } from '../../chunks/constants_C5FkH0Mh.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const currentPage = +Astro2.url.searchParams.get("page") || 1;
  const allBlogArticles = (await getCollection("blog")).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const totalPages = Math.ceil(allBlogArticles.length / ARTICLES_PER_PAGE);
  allBlogArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-2xl pb-3">Search Articles</h1> ${renderComponent($$result2, "SearchForm", $$SearchForm, {})} <br>  ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "disablePrevious": currentPage === 1, "disableNext": currentPage === totalPages })}  ` })}`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/articles/search.astro", void 0);

const $$file = "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/articles/search.astro";
const $$url = "/articles/search";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Search,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
