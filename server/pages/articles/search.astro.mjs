/* empty css                                    */
import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute, F as Fragment } from '../../chunks/astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_7CY3JyJ_.mjs';
import { $ as $$ArticleCard } from '../../chunks/ArticleCard_D2wv1XZh.mjs';
import { g as getCollection } from '../../chunks/_astro_content_BGReW-tS.mjs';
import { A as ARTICLES_PER_PAGE, $ as $$Pagination } from '../../chunks/constants_D7bnrj3_.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$Search = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Search;
  const query = Astro2.url.searchParams.get("q")?.toLowerCase() || "";
  let allBlogArticles = [];
  try {
    allBlogArticles = await getCollection("blog");
  } catch (error) {
    console.error("Error fetching blog collection:", error);
  }
  let searchResults = [];
  try {
    if (query && allBlogArticles.length > 0) {
      searchResults = allBlogArticles.filter((article) => {
        try {
          const titleMatch = article.data?.title?.toLowerCase()?.includes(query) || false;
          const bodyMatch = typeof article.body === "string" && article.body.toLowerCase().includes(query);
          const tagMatch = Array.isArray(article.data?.tags) && article.data.tags.some(
            (tag) => tag?.toLowerCase()?.includes(query) || false
          );
          return titleMatch || bodyMatch || tagMatch;
        } catch (err) {
          console.error("Error filtering article:", err);
          return false;
        }
      });
    }
  } catch (error) {
    console.error("Error in search filtering:", error);
  }
  try {
    searchResults.sort((a, b) => {
      try {
        return b.data.pubDate.valueOf() - a.data.pubDate.valueOf();
      } catch (err) {
        return 0;
      }
    });
  } catch (error) {
    console.error("Error sorting results:", error);
  }
  let currentPage = 1;
  let totalPages = 1;
  let resultsForPage = [];
  try {
    currentPage = parseInt(Astro2.url.searchParams.get("page") || "1") || 1;
    if (isNaN(currentPage) || currentPage < 1) currentPage = 1;
    const totalResults = searchResults.length;
    totalPages = Math.max(1, Math.ceil(totalResults / ARTICLES_PER_PAGE));
    const startIndex = (currentPage - 1) * ARTICLES_PER_PAGE;
    const endIndex = startIndex + ARTICLES_PER_PAGE;
    resultsForPage = searchResults.slice(startIndex, endIndex);
  } catch (error) {
    console.error("Error in pagination:", error);
    currentPage = 1;
    totalPages = 1;
    resultsForPage = [];
  }
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Search Articles" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-4xl font-bold mb-6">Search Articles</h1> <div class="mb-6"> <form action="/articles/search" method="get" class="flex gap-2"> <input type="text" name="q" placeholder="Search articles..."${addAttribute(query, "value")} class="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"> <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
Search
</button> </form> </div> <div class="mt-8"> ${!query ? renderTemplate`<p class="text-center text-gray-600">
Enter a search term above to find articles.
</p>` : resultsForPage.length === 0 ? renderTemplate`<div class="bg-gray-100 p-5 rounded-lg"> <p class="text-center text-gray-700">No articles found matching "${query}"</p> </div>` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": async ($$result3) => renderTemplate` <p class="mb-5 text-gray-700">${searchResults.length} result${searchResults.length !== 1 ? "s" : ""} found for "${query}"</p> <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"> ${resultsForPage.map((article) => renderTemplate`${renderComponent($$result3, "ArticleCard", $$ArticleCard, { "article": article })}`)} </div> ${totalPages > 1 && renderTemplate`${renderComponent($$result3, "Pagination", $$Pagination, { "currentPage": currentPage, "totalPages": totalPages, "disablePrevious": currentPage === 1, "disableNext": currentPage === totalPages })}`}` })}`} </div> <div class="mt-6"> <a href="/articles" class="text-blue-600 hover:underline">
← Back to all articles
</a> </div> ` })}`;
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
