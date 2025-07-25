/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_7CY3JyJ_.mjs';
import { $ as $$ArticleCard } from '../chunks/ArticleCard_D2wv1XZh.mjs';
import { g as getCollection } from '../chunks/_astro_content_DhWa9HZ5.mjs';
export { renderers } from '../renderers.mjs';

const $$Popular = createComponent(async ($$result, $$props, $$slots) => {
  let allArticles = [];
  try {
    allArticles = await getCollection("blog");
  } catch (error) {
    console.error("Error getting blog collection:", error);
  }
  function getArticleDate(article) {
    try {
      if (!article || typeof article !== "object") return 0;
      const articleObj = article;
      if (!articleObj.data || typeof articleObj.data !== "object") return 0;
      if (!(articleObj.data.pubDate instanceof Date)) return 0;
      return articleObj.data.pubDate.valueOf();
    } catch (error) {
      console.error("Error getting article date:", error);
      return 0;
    }
  }
  let popularArticles = [];
  try {
    popularArticles = [...allArticles];
    popularArticles.sort((a, b) => {
      try {
        const dateA = getArticleDate(a);
        const dateB = getArticleDate(b);
        return dateB - dateA;
      } catch (error) {
        console.error("Error comparing articles:", error);
        return 0;
      }
    });
    if (popularArticles.length > 9) {
      popularArticles = popularArticles.slice(0, 9);
    }
  } catch (error) {
    console.error("Error sorting articles for popular page:", error);
    popularArticles = [];
  }
  const breadcrumbItems = [
    { label: "Popular", href: "/popular" }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Popular Articles", "description": "Our most popular and trending articles", "breadcrumbItems": breadcrumbItems }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-4xl font-bold mb-8">Popular Articles</h1> ${popularArticles.length > 0 ? renderTemplate`<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${popularArticles.map((article) => renderTemplate`${renderComponent($$result2, "ArticleCard", $$ArticleCard, { "article": article })}`)} </div>` : renderTemplate`<div class="bg-gray-50 p-8 rounded-lg text-center"> <p class="text-gray-600">No articles found. Add some articles to see them here.</p> </div>`}<div class="mt-12 bg-indigo-50 p-6 rounded-lg"> <h2 class="text-xl font-semibold mb-3">How We Determine Popularity</h2> <p class="text-gray-700">
Currently, articles are sorted by publication date with newest articles shown first.
      In the future, this page will rank articles based on reader engagement, including
      views, comments, and social shares.
</p> </div> ` })}`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/popular.astro", void 0);

const $$file = "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/popular.astro";
const $$url = "/popular";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Popular,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
