import { c as createComponent, b as createAstro, m as maybeRenderHead, d as addAttribute, a as renderTemplate, e as renderHead, r as renderComponent, f as renderSlot } from './astro/server_BkWgqeXe.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro$2 = createAstro();
const $$Navigation = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Navigation;
  const currentPath = Astro2.url.pathname;
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Categories", path: "/categories" },
    { name: "Tags", path: "/tags" },
    { name: "About", path: "/about" }
  ];
  return renderTemplate`${maybeRenderHead()}<nav class="bg-gray-200 shadow-sm"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> <div class="flex justify-between h-22"> <!-- Logo/Brand --> <div class="flex-shrink-0 flex items-center"> <a href="/"> <!--<img src="/images/logo.png" alt="Sinclair-AI Logo" class="h-20 w-60 object-contain rounded-lg" />  --> <img src="/images/logo.png" alt="Sinclair-AI Logo" class="h-20 w-60 rounded-lg pt-[1px] pb-[1px]"> </a> </div> <!-- Desktop Navigation --> <div class="hidden sm:ml-6 sm:flex sm:space-x-8"> ${navItems.map((item) => renderTemplate`<a${addAttribute(item.path, "href")}${addAttribute(`${currentPath === item.path ? "border-indigo-500 text-gray-900" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} 
              inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`, "class")}${addAttribute(currentPath === item.path ? "page" : void 0, "aria-current")}> ${item.name} </a>`)} <!-- Search Button (Desktop) --> <div class="flex items-center"> <a href="/articles/search" class="text-gray-500 hover:text-gray-700 p-2 rounded-md" aria-label="Search"> <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path> </svg> </a> </div> </div> <!-- Mobile menu button --> <div class="flex items-center sm:hidden"> <button type="button" id="mobile-menu-button" class="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false"> <span class="sr-only">Open main menu</span> <!-- Icon when menu is closed --> <svg id="menu-closed-icon" class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> <!-- Icon when menu is open --> <svg id="menu-open-icon" class="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path> </svg> </button> </div> </div> </div> <!-- Mobile menu, show/hide based on menu state. --> <div class="sm:hidden hidden" id="mobile-menu"> <div class="pt-2 pb-3 space-y-1"> ${navItems.map((item) => {
    return renderTemplate`<a${addAttribute(item.path, "href")} class="menu-item"${addAttribute(currentPath === item.path ? "page" : void 0, "aria-current")}> ${item.name} </a>`;
  })} <!-- Search Link (Mobile) --> <a href="/articles/search" class="border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
Search
</a> </div> </div> </nav> `;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/components/Navigation.astro", void 0);

const $$Astro$1 = createAstro();
const $$Breadcrumb = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Breadcrumb;
  const { items } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav class="flex py-3 px-5 text-gray-700 rounded-lg bg-gray-50 mb-6" aria-label="Breadcrumb"> <ol class="inline-flex items-center space-x-1 md:space-x-3"> <li class="inline-flex items-center"> <a href="/" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-indigo-600"> <svg class="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"> <path d="m19.707 9.293-9-9-9 9 1.414 1.414L10 3.828l6.879 6.879 1.414-1.414Z"></path> <path d="M10 6.172 3.122 13.05 1.707 14.464l1.414 1.414 6.879-6.879 6.879 6.879 1.414-1.414-1.414-1.414L10 6.172Z"></path> </svg>
Home
</a> </li> ${items.map((item, index) => {
    const isLast = index === items.length - 1;
    const itemClass = isLast ? "ml-1 text-sm font-medium text-indigo-600" : "ml-1 text-sm font-medium text-gray-700 hover:text-indigo-600";
    return renderTemplate`<li> <div class="flex items-center"> <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10"> <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"></path> </svg> <a${addAttribute(item.href, "href")}${addAttribute(itemClass, "class")}> ${item.label} </a> </div> </li>`;
  })} </ol> </nav>`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/components/Breadcrumb.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const navSections = [
    {
      title: "Content",
      links: [
        { label: "Articles", href: "/articles" },
        { label: "Categories", href: "/categories" },
        { label: "Tags", href: "/tags" },
        { label: "Popular", href: "/popular" }
      ]
    },
    {
      title: "About",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" }
      ]
    },
    {
      title: "Follow",
      links: [
        { label: "Twitter", href: "https://twitter.com/yourblog" },
        { label: "GitHub", href: "https://github.com/yourblog" },
        { label: "RSS Feed", href: "/rss.xml" }
      ]
    }
  ];
  return renderTemplate`${maybeRenderHead()}<footer class="bg-white border-t border-gray-200 mt-20"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"> <div class="grid grid-cols-1 md:grid-cols-4 gap-8"> <!-- Brand and description --> <div class="col-span-1"> <a href="/"> <img src="/images/logo.png" alt="Sinclair-AI Logo" class="h-20 w-60 rounded-lg"> </a> <p class="mt-2 text-sm text-gray-500">
Sharing ideas, stories, and insights about technology, AI, music & more ...
</p> </div> <!-- Navigation sections --> ${navSections.map((section) => {
    return renderTemplate`<div> <h3 class="text-sm font-semibold text-gray-400 tracking-wider uppercase"> ${section.title} </h3> <ul class="mt-4 space-y-4"> ${section.links.map((link) => {
      return renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-base text-gray-500 hover:text-indigo-600"> ${link.label} </a> </li>`;
    })} </ul> </div>`;
  })} </div> <div class="mt-12 border-t border-gray-200 pt-8"> <p class="text-base text-gray-400 text-center">
&copy; ${currentYear} Sinclair-AI. All rights reserved.
</p> </div> </div> </footer>`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$MainLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MainLayout;
  const {
    title = "Sinclair-AI Blog",
    description = "A blog about technology, AI, and more",
    hideBreadcrumb = false,
    breadcrumbItems = []
  } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title}</title><meta name="description"${addAttribute(description, "content")}><link rel="icon" type="image" href="public/images/logo.png"><!-- Add Google Fonts or other resources here -->${renderHead()}</head> <body class="min-h-screen flex flex-col"> <!-- Skip to main content link for accessibility --> <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-50">
Skip to main content
</a> <header> ${renderComponent($$result, "Navigation", $$Navigation, {})} ${!hideBreadcrumb && breadcrumbItems.length > 0 && renderTemplate`<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4"> ${renderComponent($$result, "Breadcrumb", $$Breadcrumb, { "items": breadcrumbItems })} </div>`} </header> <main id="main-content" class="flex-grow"> <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"> ${renderSlot($$result, $$slots["default"])} </div> </main> ${renderComponent($$result, "Footer", $$Footer, {})} <!-- Back to top button --> <button id="back-to-top" class="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg transform translate-y-20 opacity-0 transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" aria-label="Back to top"> <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"></path> </svg> </button> </body></html>`;
}, "C:/Users/TimSi/VS_Code_Folder/SSR-Blog/project/src/layouts/MainLayout.astro", void 0);

export { $$MainLayout as $ };
