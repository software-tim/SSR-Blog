/* empty css                                    */
import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_7CY3JyJ_.mjs';
import { $ as $$ArticleCard } from '../../chunks/ArticleCard_D2wv1XZh.mjs';
import { g as getCollection } from '../../chunks/_astro_content_DWrwLKps.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tag;
  console.log(`Processing tag page with params:`, Astro2.params);
  const currentTag = Astro2.params.tag || "";
  console.log(`Current tag parameter: "${currentTag}"`);
  function getSafeTags(article) {
    try {
      if (!article || typeof article !== "object") return [];
      const articleObj = article;
      if (!articleObj.data || typeof articleObj.data !== "object") return [];
      if (!articleObj.data.tags) return [];
      if (!Array.isArray(articleObj.data.tags)) return [];
      return articleObj.data.tags.filter((tag) => {
        if (typeof tag !== "string") return false;
        return tag.trim() !== "";
      });
    } catch (error) {
      console.error("Error getting tags from article:", error);
      return [];
    }
  }
  let allArticles = [];
  try {
    allArticles = await getCollection("blog");
    console.log(`Found ${allArticles.length} total articles`);
  } catch (error) {
    console.error("Error getting blog collection:", error);
  }
  let taggedArticles = [];
  try {
    taggedArticles = allArticles.filter((article) => {
      try {
        const tags = getSafeTags(article);
        return tags.includes(currentTag);
      } catch (error) {
        console.error("Error checking article for tag match:", error);
        return false;
      }
    });
    console.log(`Found ${taggedArticles.length} articles with tag "${currentTag}"`);
  } catch (error) {
    console.error("Error filtering articles by tag:", error);
  }
  let sortedArticles = [];
  try {
    sortedArticles = [...taggedArticles];
    sortedArticles.sort((a, b) => {
      try {
        const articleA = a;
        const articleB = b;
        let dateA = 0;
        try {
          if (articleA && articleA.data && articleA.data.pubDate instanceof Date) {
            dateA = articleA.data.pubDate.valueOf();
          }
        } catch (error) {
          console.error("Error getting date A:", error);
        }
        let dateB = 0;
        try {
          if (articleB && articleB.data && articleB.data.pubDate instanceof Date) {
            dateB = articleB.data.pubDate.valueOf();
          }
        } catch (error) {
          console.error("Error getting date B:", error);
        }
        return dateB - dateA;
      } catch (error) {
        console.error("Error comparing dates:", error);
        return 0;
      }
    });
  } catch (error) {
    console.error("Error sorting articles:", error);
    sortedArticles = taggedArticles;
  }
  try {
    sortedArticles.forEach((article, index) => {
      try {
        const title = article?.data?.title || "Unknown Title";
        const tags = getSafeTags(article).join(", ") || "No tags";
        console.log(`Article ${index + 1}: ${title} (tags: ${tags})`);
      } catch (error) {
        console.error(`Error logging article ${index}:`, error);
      }
    });
  } catch (error) {
    console.error("Error debugging articles:", error);
  }
  const breadcrumbItems = [
    { label: "Tags", href: "/tags" },
    { label: currentTag || "", href: `/tags/${currentTag}` }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `Articles Tagged with "${currentTag}"`, "description": `Browse all articles tagged with "${currentTag}"`, "breadcrumbItems": breadcrumbItems }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="mb-8"> <h1 class="text-4xl font-bold">Tag: ${currentTag}</h1> <p class="text-gray-600 mt-2"> ${sortedArticles.length} article${sortedArticles.length !== 1 ? "s" : ""} </p> </header> ${sortedArticles.length > 0 ? renderTemplate`<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${sortedArticles.map((article) => renderTemplate`${renderComponent($$result2, "ArticleCard", $$ArticleCard, { "article": article })}`)} </div>` : renderTemplate`<div class="bg-gray-50 p-8 rounded-lg text-center"> <p class="text-gray-600">No articles found with tag "${currentTag}". The tag may have been renamed or removed.</p> <p class="mt-4"> <a href="/tags" class="text-indigo-600 hover:underline">
View all available tags
</a> </p> </div>`}<div class="mt-8"> <a href="/tags" class="text-indigo-600 hover:underline">
← Back to all tags
</a> </div> ` })}`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/tags/[tag].astro", void 0);

const $$file = "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/tags/[tag].astro";
const $$url = "/tags/[tag]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tag,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
