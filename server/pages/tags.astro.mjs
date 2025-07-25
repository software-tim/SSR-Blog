/* empty css                                 */
import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_7CY3JyJ_.mjs';
import { g as getCollection } from '../chunks/_astro_content_DhWa9HZ5.mjs';
export { renderers } from '../renderers.mjs';

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  console.log("Rendering tags index page");
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
  const tagCounts = {};
  try {
    for (let i = 0; i < allArticles.length; i++) {
      try {
        const article = allArticles[i];
        const tags = getSafeTags(article);
        for (let j = 0; j < tags.length; j++) {
          try {
            const tag = tags[j];
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          } catch (error) {
            console.error(`Error processing tag at index ${j}:`, error);
          }
        }
      } catch (error) {
        console.error(`Error processing article at index ${i}:`, error);
      }
    }
  } catch (error) {
    console.error("Error processing articles for tags:", error);
  }
  let sortedTags = [];
  try {
    const tagEntries = Object.entries(tagCounts);
    sortedTags = tagEntries.map(([tag, count]) => ({ tag, count }));
    sortedTags.sort((a, b) => b.count - a.count);
    console.log(`Found ${sortedTags.length} unique tags`);
  } catch (error) {
    console.error("Error sorting tags:", error);
  }
  try {
    for (let i = 0; i < sortedTags.length; i++) {
      try {
        const item = sortedTags[i];
        console.log(`Tag "${item.tag}" appears ${item.count} times`);
      } catch (error) {
        console.error(`Error logging tag at index ${i}:`, error);
      }
    }
  } catch (error) {
    console.error("Error debugging tags:", error);
  }
  function getTagSizeClass(count, maxCount2) {
    try {
      if (maxCount2 <= 0) return "text-base";
      const ratio = count / maxCount2;
      if (ratio > 0.8) return "text-2xl font-bold";
      if (ratio > 0.6) return "text-xl font-semibold";
      if (ratio > 0.4) return "text-lg font-medium";
      if (ratio > 0.2) return "text-base";
      return "text-sm";
    } catch (error) {
      console.error("Error determining tag size class:", error);
      return "text-base";
    }
  }
  let maxCount = 1;
  try {
    if (sortedTags.length > 0) {
      const counts = sortedTags.map((t) => t.count);
      maxCount = Math.max(...counts);
    }
  } catch (error) {
    console.error("Error calculating max count:", error);
  }
  const breadcrumbItems = [
    { label: "Tags", href: "/tags" }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Article Tags", "description": "Browse all article tags", "breadcrumbItems": breadcrumbItems }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-4xl font-bold mb-8">Tags</h1> ${sortedTags.length > 0 ? renderTemplate`<div class="bg-white p-8 rounded-lg shadow-sm"> <div class="flex flex-wrap gap-3"> ${sortedTags.map((item) => {
    try {
      const tag = item.tag || "";
      const count = item.count || 0;
      const sizeClass = getTagSizeClass(count, maxCount);
      return renderTemplate`<a${addAttribute(`/tags/${tag}`, "href")}${addAttribute(`${sizeClass} bg-gray-100 hover:bg-indigo-100 px-4 py-2 rounded-full transition-colors`, "class")}> ${tag} <span class="text-gray-500">(${count})</span> </a>`;
    } catch (error) {
      console.error("Error rendering tag item:", error);
      return null;
    }
  })} </div> </div>` : renderTemplate`<div class="bg-gray-50 p-8 rounded-lg text-center"> <p class="text-gray-600">No tags found. Add tags to your articles to see them here.</p> </div>`}` })}`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/tags/index.astro", void 0);

const $$file = "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/tags/index.astro";
const $$url = "/tags";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
