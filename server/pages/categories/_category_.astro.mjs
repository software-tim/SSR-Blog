/* empty css                                    */
import { c as createComponent, b as createAstro, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../../chunks/astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import { $ as $$MainLayout } from '../../chunks/MainLayout_7CY3JyJ_.mjs';
import { $ as $$ArticleCard } from '../../chunks/ArticleCard_D2wv1XZh.mjs';
import { g as getCollection } from '../../chunks/_astro_content_XqKnqmRa.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro();
const $$category = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$category;
  try {
    console.log(`Processing category page with params:`, Astro2.params);
  } catch (error) {
  }
  let currentCategory = "General";
  try {
    if (Astro2.params.category) {
      try {
        currentCategory = decodeURIComponent(Astro2.params.category);
      } catch (error) {
        try {
          console.error("Error decoding category parameter:", error);
        } catch (e) {
        }
        currentCategory = Astro2.params.category;
      }
    }
  } catch (error) {
    try {
      console.error("Error getting category parameter:", error);
    } catch (e) {
    }
  }
  try {
    console.log(`Current category parameter: "${currentCategory}"`);
  } catch (error) {
  }
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
      try {
        console.error("Error getting article category:", error);
      } catch (e) {
      }
      return "General";
    }
  }
  let allArticles = [];
  try {
    allArticles = await getCollection("blog");
    try {
      console.log(`Found ${allArticles.length} total articles`);
    } catch (e) {
    }
  } catch (error) {
    try {
      console.error("Error getting blog collection:", error);
    } catch (e) {
    }
  }
  let categoryArticles = [];
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
          continue;
        }
        if (category === currentCategory) {
          categoryArticles.push(article);
        }
      } catch (error) {
        try {
          console.error(`Error processing article at index ${i} for filtering:`, error);
        } catch (e) {
        }
      }
    }
    try {
      console.log(`Found ${categoryArticles.length} articles in category "${currentCategory}"`);
    } catch (e) {
    }
  } catch (error) {
    try {
      console.error("Error filtering articles by category:", error);
    } catch (e) {
    }
  }
  let sortedArticles = [];
  try {
    sortedArticles = Array.isArray(categoryArticles) ? [...categoryArticles] : [];
    if (sortedArticles.length > 1) {
      try {
        sortedArticles.sort((a, b) => {
          try {
            if (!a || typeof a !== "object" || !b || typeof b !== "object") return 0;
            const articleA = a;
            const articleB = b;
            let dateA = 0;
            try {
              if (articleA.data && typeof articleA.data === "object" && articleA.data.pubDate instanceof Date) {
                dateA = articleA.data.pubDate.valueOf();
              } else if (articleA.data && typeof articleA.data === "object" && typeof articleA.data.pubDate === "string") {
                dateA = new Date(articleA.data.pubDate).valueOf();
              }
            } catch (error) {
              try {
                console.error("Error getting date A:", error);
              } catch (e) {
              }
            }
            let dateB = 0;
            try {
              if (articleB.data && typeof articleB.data === "object" && articleB.data.pubDate instanceof Date) {
                dateB = articleB.data.pubDate.valueOf();
              } else if (articleB.data && typeof articleB.data === "object" && typeof articleB.data.pubDate === "string") {
                dateB = new Date(articleB.data.pubDate).valueOf();
              }
            } catch (error) {
              try {
                console.error("Error getting date B:", error);
              } catch (e) {
              }
            }
            if (isNaN(dateA)) dateA = 0;
            if (isNaN(dateB)) dateB = 0;
            return dateB - dateA;
          } catch (error) {
            try {
              console.error("Error comparing article dates:", error);
            } catch (e) {
            }
            return 0;
          }
        });
      } catch (error) {
        try {
          console.error("Error sorting articles:", error);
        } catch (e) {
        }
        sortedArticles = categoryArticles;
      }
    }
  } catch (error) {
    try {
      console.error("Error preparing sorted articles:", error);
    } catch (e) {
    }
    sortedArticles = categoryArticles;
  }
  try {
    for (let i = 0; i < sortedArticles.length; i++) {
      try {
        const article = sortedArticles[i];
        if (!article || typeof article !== "object") continue;
        const articleObj = article;
        const title = articleObj?.data?.title || "Unknown Title";
        try {
          console.log(`Article ${i + 1}: ${title}`);
        } catch (e) {
        }
      } catch (error) {
        try {
          console.error(`Error logging article ${i}:`, error);
        } catch (e) {
        }
      }
    }
  } catch (error) {
    try {
      console.error("Error debugging articles:", error);
    } catch (e) {
    }
  }
  let encodedCategory = "unknown";
  try {
    encodedCategory = encodeURIComponent(currentCategory);
  } catch (error) {
    try {
      console.error(`Error encoding category for breadcrumb:`, error);
    } catch (e) {
    }
  }
  const breadcrumbItems = [
    { label: "Categories", href: "/categories" },
    { label: currentCategory || "Category", href: `/categories/${encodedCategory}` }
  ];
  return renderTemplate`${renderComponent($$result, "MainLayout", $$MainLayout, { "title": `${currentCategory} Articles`, "description": `Browse all articles in the ${currentCategory} category`, "breadcrumbItems": breadcrumbItems }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<header class="mb-8"> <h1 class="text-4xl font-bold">${currentCategory}</h1> <p class="text-gray-600 mt-2"> ${sortedArticles.length} article${sortedArticles.length !== 1 ? "s" : ""} </p> </header> ${sortedArticles.length > 0 ? renderTemplate`<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"> ${sortedArticles.map((article) => {
    try {
      return renderTemplate`${renderComponent($$result2, "ArticleCard", $$ArticleCard, { "article": article })}`;
    } catch (error) {
      return null;
    }
  })} </div>` : renderTemplate`<div class="bg-gray-50 p-8 rounded-lg text-center"> <p class="text-gray-600">No articles found in this category. The category may have been renamed or removed.</p> <p class="mt-4"> <a href="/categories" class="text-indigo-600 hover:underline">
View all categories
</a> </p> </div>`}<div class="mt-8"> <a href="/categories" class="text-indigo-600 hover:underline">
← Back to all categories
</a> </div> ` })}`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/categories/[category].astro", void 0);

const $$file = "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/pages/categories/[category].astro";
const $$url = "/categories/[category]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$category,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
