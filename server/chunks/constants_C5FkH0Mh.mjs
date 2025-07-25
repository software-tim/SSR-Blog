import { c as createComponent, m as maybeRenderHead, a as renderTemplate, b as createAstro, d as addAttribute } from './astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                         */

const $$SearchForm = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`<!-- SearchForm.astro -->${maybeRenderHead()}<div id="search-container" class="relative" data-astro-cid-s6z2d6yt> <form id="search-form" class="flex items-center" action="/articles/search" data-astro-cid-s6z2d6yt> <label for="search-input" class="sr-only" data-astro-cid-s6z2d6yt>Search</label> <div class="relative w-full" data-astro-cid-s6z2d6yt> <input type="text" id="query" name="q" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 pr-10" placeholder="Search articles..." autocomplete="off" required data-astro-cid-s6z2d6yt> <!-- Clear button --> <button type="button" id="clear-search" class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 hidden" data-astro-cid-s6z2d6yt> <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-astro-cid-s6z2d6yt> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" data-astro-cid-s6z2d6yt></path> </svg> </button> </div> <!-- Search Type Selector --> <div class="ml-2 flex items-center space-x-1" data-astro-cid-s6z2d6yt> <select id="search-type" class="text-xs bg-gray-50 border border-gray-300 text-gray-700 rounded px-2 py-1" data-astro-cid-s6z2d6yt> <option value="semantic" data-astro-cid-s6z2d6yt>🧠 AI</option> <option value="fuzzy" data-astro-cid-s6z2d6yt>🔍 Fuzzy</option> <option value="exact" data-astro-cid-s6z2d6yt>📝 Exact</option> </select> </div> <button type="submit" id="search-button" class="p-2.5 ms-2 text-sm font-medium text-white bg-indigo-700 rounded-lg border border-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 relative" data-astro-cid-s6z2d6yt> <!-- Search Icon --> <svg id="search-icon" class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" data-astro-cid-s6z2d6yt> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" data-astro-cid-s6z2d6yt></path> </svg> <!-- Loading Spinner --> <svg id="loading-spinner" class="w-4 h-4 animate-spin hidden" viewBox="0 0 24 24" fill="none" data-astro-cid-s6z2d6yt> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" data-astro-cid-s6z2d6yt></circle> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" data-astro-cid-s6z2d6yt></path> </svg> <span class="sr-only" data-astro-cid-s6z2d6yt>Search</span> </button> </form> <!-- Search Suggestions Dropdown --> <div id="suggestions-dropdown" class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 hidden max-h-60 overflow-y-auto" data-astro-cid-s6z2d6yt> <div id="suggestions-content" class="p-2" data-astro-cid-s6z2d6yt></div> </div> <!-- Search Results Container --> <div id="search-results" class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-40 hidden max-h-96 overflow-y-auto" data-astro-cid-s6z2d6yt> <div id="results-content" class="p-4" data-astro-cid-s6z2d6yt></div> </div> </div>  `;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/components/SearchForm.astro", void 0);

const $$Astro = createAstro();
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { currentPage, totalPages, disablePrevious, disableNext } = Astro2.props;
  return renderTemplate`<!-- Pagination -->${maybeRenderHead()}<div class="flex justify-between mt-10"> <a${addAttribute("/articles?page=" + (currentPage - 1), "href")}${addAttribute(
    disablePrevious ? "inline-block bg-gray-100 px-3 py-2 text-gray-400 rounded-lg pointer-events-none" : "inline-block bg-indigo-100 px-3 py-2 hover:bg-indigo-600 hover:text-white rounded-lg",
    "class"
  )}>
Previous
</a> <a${addAttribute("/articles?page=" + (currentPage + 1), "href")}${addAttribute(
    disableNext ? "inline-block bg-gray-100 px-3 py-2 text-gray-400 rounded-lg pointer-events-none" : "inline-block bg-indigo-100 px-3 py-2 hover:bg-indigo-600 hover:text-white rounded-lg",
    "class"
  )}>
Next
</a> </div>`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/components/Pagination.astro", void 0);

const HOMEPAGE_ARTICLE_LIMIT = 6;
const ARTICLES_PER_PAGE = 6;

export { $$SearchForm as $, ARTICLES_PER_PAGE as A, HOMEPAGE_ARTICLE_LIMIT as H, $$Pagination as a };
