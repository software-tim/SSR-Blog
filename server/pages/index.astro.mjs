/* empty css                                 */
import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderTemplate, r as renderComponent } from '../chunks/astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_7CY3JyJ_.mjs';
import { $ as $$SearchForm } from '../chunks/SearchForm_k14RDF15.mjs';
import { f as formatDate, $ as $$ArticleCard } from '../chunks/ArticleCard_D2wv1XZh.mjs';
import 'clsx';
import { A as ARTICLES_PER_PAGE, H as HOMEPAGE_ARTICLE_LIMIT, $ as $$Pagination } from '../chunks/constants_D7bnrj3_.mjs';
import { g as getCollection } from '../chunks/_astro_content_BG-zdqh1.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro$1 = createAstro();
const $$MostRecentArticle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MostRecentArticle;
  const { article } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="relative inline-block w-full cursor-pointer rounded-2xl shadow-lg"> <!-- Make the entire card clickable by properly structuring the <a> tag --> <a${addAttribute("/articles/" + article.slug, "href")} class="block"> <img${addAttribute("/images/" + article.data.image, "src")}${addAttribute(article.data.title, "alt")} class="w-full h-auto rounded-2xl"> <div class="absolute inset-0 flex flex-col items-center justify-center bg-indigo-900/80 hover:bg-indigo-900/75 transition duration-300 ease-in-out text-white text-center rounded-2xl"> <div> <h2 class="text-2xl font-semibold sm:text-3xl"> ${article.data.title} </h2> <p class="text-xl mt-4">${formatDate(article.data.pubDate)}</p> <!-- Tags with rounded border --> <div class="flex mt-4 justify-center"> ${(article.data.tags || []).map((tag) => renderTemplate`<!-- Make each tag clickable with its own link -->
            <a${addAttribute(`/articles/tag/${tag}`, "href")} class="px-2 py-1 border text-white rounded-full text-xs mr-2 hover:bg-white hover:text-black transition-colors" onclick="event.stopPropagation();"> ${tag} </a>`)} </div> </div> </div> </a> </div>`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/components/MostRecentArticle.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const currentPage = +Astro2.url.searchParams.get("page") || 1;
  const allBlogArticles = (await getCollection("blog")).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const mostRecentArticle = allBlogArticles[0];
  const totalPages = Math.ceil(allBlogArticles.length / ARTICLES_PER_PAGE);
  const otherArticles = allBlogArticles.slice(1);
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, {}, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="grid grid-cols-1 gap-5 lg:grid-cols-2"> ${renderComponent($$result2, "MostRecentArticle", $$MostRecentArticle, { "article": mostRecentArticle })} <div> <h1 class="text-4xl font-bold mt-4 mb-8 leading-tight xl:text-4xl">
Sharing ideas, stories, and insights about technology, AI, music & more ...
</h1> ${renderComponent($$result2, "SearchForm", $$SearchForm, {})} </div> <!--  <MostRecentArticle article={mostRecentArticle} />   --> </div>  <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"> ${otherArticles.slice(0, HOMEPAGE_ARTICLE_LIMIT).map((article) => renderTemplate`${renderComponent($$result2, "ArticleCard", $$ArticleCard, { "article": article })}
   <!-- -->`)} </div> ${renderComponent($$result2, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "disablePrevious": currentPage === 1, "disableNext": currentPage === totalPages })} ` })}`;
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
