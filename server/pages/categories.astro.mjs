/* empty css                                 */
import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../chunks/MainLayout_7CY3JyJ_.mjs';
import { g as getCollection } from '../chunks/_astro_content_BmLp3MtX.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  function getArticleCategory(article) {
    try {
      if (!article || typeof article !== "object") return "General";
      const articleObj = article;
      if (articleObj.data && typeof articleObj.data === "object" && "category" in articleObj.data && articleObj.data.category !== null && typeof articleObj.data.category === "string" && articleObj.data.category.trim() !== "") {
        return articleObj.data.category;
      }
      if (articleObj.data && typeof articleObj.data === "object" && "tags" in articleObj.data && articleObj.data.tags !== null && Array.isArray(articleObj.data.tags) && articleObj.data.tags.length > 0) {
        for (let i = 0; i < articleObj.data.tags.length; i++) {
          const tag = articleObj.data.tags[i];
          if (tag !== null && tag !== void 0 && typeof tag === "string" && tag.trim() !== "") {
            return tag;
          }
        }
      }
      if (articleObj.data && typeof articleObj.data === "object" && "title" in articleObj.data && articleObj.data.title !== null && typeof articleObj.data.title === "string" && articleObj.data.title.trim() !== "") {
        const title = articleObj.data.title.toLowerCase();
        const keywords = [
          ["javascript", "JavaScript"],
          ["css", "CSS"],
          ["html", "HTML"],
          ["astro", "Astro"],
          ["react", "React"],
          ["vue", "Vue"],
          ["svelte", "Svelte"],
          ["tutorial", "Tutorials"],
          ["guide", "Guides"],
          ["review", "Reviews"]
          // Add more keyword mappings as needed
        ];
        for (let i = 0; i < keywords.length; i++) {
          const [keyword, category] = keywords[i];
          if (title.includes(keyword)) {
            return category;
          }
        }
      }
      return "General";
    } catch (error) {
      return "General";
    }
  }
  let allArticles = [];
  try {
    allArticles = await getCollection("blog");
    try {
    } catch (e) {
    }
  } catch (error) {
    try {
      console.error("Error getting blog collection:", error);
    } catch (e) {
    }
  }
  const categoryData = {};
  try {
    for (let i = 0; i < allArticles.length; i++) {
      try {
        const article = allArticles[i];
        let category;
        try {
          category = getArticleCategory(article);
        } catch (error) {
          try {
            console.error(`Error getting category for article at index ${i}:`, error);
          } catch (e) {
          }
          category = "General";
        }
        if (typeof categoryData[category] === "undefined") {
          categoryData[category] = {
            count: 0,
            articles: []
          };
        }
        try {
          categoryData[category].count += 1;
        } catch (error) {
          try {
            console.error(`Error incrementing count for category ${category}:`, error);
          } catch (e) {
          }
          categoryData[category].count = (categoryData[category].count || 0) + 1;
        }
        try {
          categoryData[category].articles.push(article);
        } catch (error) {
          try {
            console.error(`Error adding article to category ${category}:`, error);
          } catch (e) {
          }
          if (!Array.isArray(categoryData[category].articles)) {
            categoryData[category].articles = [];
          }
          categoryData[category].articles.push(article);
        }
      } catch (error) {
        try {
          console.error(`Error processing article at index ${i}:`, error);
        } catch (e) {
        }
      }
    }
  } catch (error) {
    try {
      console.error("Error processing articles for categories:", error);
    } catch (e) {
    }
  }
  let categories = [];
  try {
    const categoryNames = Object.keys(categoryData);
    categories = categoryNames.map((name) => {
      try {
        const data = categoryData[name] || { count: 0, articles: [] };
        const count = typeof data.count === "number" ? data.count : 0;
        return {
          name,
          count
        };
      } catch (error) {
        try {
          console.error(`Error mapping category ${name}:`, error);
        } catch (e) {
        }
        return {
          name,
          count: 0
        };
      }
    });
    try {
      categories.sort((a, b) => {
        try {
          const nameA = typeof a.name === "string" ? a.name : "";
          const nameB = typeof b.name === "string" ? b.name : "";
          return nameA.localeCompare(nameB);
        } catch (error) {
          try {
            console.error("Error comparing category names:", error);
          } catch (e) {
          }
          return 0;
        }
      });
    } catch (error) {
      try {
        console.error("Error sorting categories:", error);
      } catch (e) {
      }
    }
    try {
    } catch (e) {
    }
  } catch (error) {
    try {
      console.error("Error creating categories array:", error);
    } catch (e) {
    }
  }
  const breadcrumbItems = [
    { label: "Categories", href: "/categories" }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": "Article Categories", "description": "Browse all article categories", "breadcrumbItems": breadcrumbItems }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<h1 class="text-4xl font-bold mb-8">Categories</h1> ${categories.length > 0 ? renderTemplate`<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"> ${categories.map((category) => {
    try {
      const name = typeof category.name === "string" ? category.name : "Unknown";
      const count = typeof category.count === "number" ? category.count : 0;
      let encodedName = "unknown";
      try {
        encodedName = encodeURIComponent(name);
      } catch (error) {
        try {
          console.error(`Error encoding category name ${name}:`, error);
        } catch (e) {
        }
      }
      return renderTemplate`<a${addAttribute(`/categories/${encodedName}`, "href")} class="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"> <h2 class="text-xl font-semibold text-indigo-600">${name}</h2> <p class="text-gray-600 mt-2"> ${count} article${count !== 1 ? "s" : ""} </p> </a>`;
    } catch (error) {
      try {
        console.error("Error rendering category:", error);
      } catch (e) {
      }
      return null;
    }
  })} </div>` : renderTemplate`<div class="bg-gray-50 p-8 rounded-lg text-center"> <p class="text-gray-600">No categories found. Add categories to your articles to see them here.</p> </div>`}<div class="mt-12 bg-indigo-50 p-6 rounded-lg"> <h2 class="text-xl font-semibold mb-3">About Categories</h2> <p class="text-gray-700">
Categories are automatically determined from your articles. To explicitly set a category, 
      add a <code class="bg-indigo-100 px-2 py-1 rounded">category</code> property 
      to your article frontmatter. If no category is specified, we'll use the article's first tag instead.
</p> </div> ` })}`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/categories/index.astro", void 0);

const $$file = "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/categories/index.astro";
const $$url = "/categories";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
