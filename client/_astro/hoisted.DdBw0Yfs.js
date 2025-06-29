import"./hoisted.BWmaoENG.js";class y{searchInput;searchForm;searchButton;searchIcon;loadingSpinner;clearButton;searchType;suggestionsDropdown;suggestionsContent;searchResults;resultsContent;debounceTimer=null;currentQuery="";searchHistory=[];constructor(){this.searchInput=this.getElement("query"),this.searchForm=this.getElement("search-form"),this.searchButton=this.getElement("search-button"),this.searchIcon=this.getElement("search-icon"),this.loadingSpinner=this.getElement("loading-spinner"),this.clearButton=this.getElement("clear-search"),this.searchType=this.getElement("search-type"),this.suggestionsDropdown=this.getElement("suggestions-dropdown"),this.suggestionsContent=this.getElement("suggestions-content"),this.searchResults=this.getElement("search-results"),this.resultsContent=this.getElement("results-content"),this.searchHistory=this.loadSearchHistory(),this.init()}getElement(e){const t=document.getElementById(e);if(!t)throw new Error(`Element with id '${e}' not found`);return t}init(){this.searchInput.addEventListener("input",e=>{const t=e.target;this.handleInputChange(t.value)}),this.searchForm.addEventListener("submit",e=>{e.preventDefault(),this.performSearch(this.searchInput.value,!0)}),this.clearButton.addEventListener("click",()=>{this.clearSearch()}),this.searchType.addEventListener("change",()=>{this.currentQuery&&this.performSearch(this.currentQuery)}),document.addEventListener("click",e=>{e.target.closest("#search-container")||(this.hideSuggestions(),this.hideResults())}),this.searchInput.addEventListener("focus",()=>{!this.searchInput.value&&this.searchHistory.length>0&&this.showSearchHistory()})}handleInputChange(e){if(this.currentQuery=e,e)this.clearButton.classList.remove("hidden");else{this.clearButton.classList.add("hidden"),this.hideResults(),this.hideSuggestions();return}this.debounceTimer&&clearTimeout(this.debounceTimer),this.debounceTimer=window.setTimeout(()=>{e.length>=2&&(this.getSuggestions(e),this.performSearch(e))},300)}async performSearch(e,t=!1){if(e.trim()){this.showLoading();try{const s=new URLSearchParams({q:e,limit:"5",enhance:"true",type:this.searchType.value}),i=await fetch(`/api/search?${s}`);if(!i.ok)throw new Error(`Search failed: ${i.statusText}`);const r=await i.json();this.displayResults(r),t&&this.addToSearchHistory(e)}catch(s){console.error("Search error:",s),this.showError("Search failed. Please try again.")}finally{this.hideLoading()}}}async getSuggestions(e){try{const t=await fetch(`/api/suggestions?q=${encodeURIComponent(e)}`);if(t.ok){const s=await t.json();this.showSuggestions(s.suggestions||[])}}catch(t){console.error("Suggestions error:",t)}}displayResults(e){const{results:t,query:s,searchType:i,enhanced:r}=e;if(t.length===0)this.resultsContent.innerHTML=`
        <div class="text-center py-4 text-gray-500">
          <p>No results found for "${s}"</p>
          <p class="text-sm">Try different keywords or check your spelling.</p>
        </div>
      `;else{const a=r?'<span class="inline-flex items-center px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">✨ AI Enhanced</span>':"";this.resultsContent.innerHTML=`
        <div class="mb-3 pb-2 border-b border-gray-200">
          <div class="flex items-center justify-between">
            <h3 class="font-semibold text-gray-900">Search Results (${t.length})</h3>
            <div class="flex items-center space-x-2">
              <span class="text-xs text-gray-500">${i}</span>
              ${a}
            </div>
          </div>
        </div>
        <div class="space-y-3">
          ${t.map(n=>this.renderSearchResult(n,s)).join("")}
        </div>
      `}this.showResults(),this.hideSuggestions()}renderSearchResult(e,t){const{title:s,description:i,excerpt:r,snippet:a,tags:n,date:o,readingTime:c,url:l,llmRelevanceScore:d,relevanceReason:u}=e,g=new Date(o).toLocaleDateString("en-US",{year:"numeric",month:"short",day:"numeric"}),m=d?`<div class="mt-2 p-2 bg-blue-50 rounded text-xs">
        <span class="font-medium text-blue-800">🤖 AI Insight:</span>
        <span class="text-blue-700">${u}</span>
      </div>`:"";return`
      <article class="border-b border-gray-100 pb-3 last:border-b-0">
        <div class="flex items-start justify-between">
          <h4 class="font-medium text-indigo-600 hover:text-indigo-800">
            <a href="${l}" class="block">${this.highlightQuery(s,t)}</a>
          </h4>
          <div class="text-xs text-gray-500 ml-2 flex-shrink-0">
            ${g} • ${c} min read
          </div>
        </div>
        
        <p class="text-sm text-gray-600 mt-1">
          ${this.highlightQuery(a||r||i,t)}
        </p>
        
        ${n.length>0?`
          <div class="mt-2 flex flex-wrap gap-1">
            ${n.slice(0,3).map(p=>`<span class="inline-flex items-center px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded">${p}</span>`).join("")}
          </div>
        `:""}
        
        ${m}
      </article>
    `}showSuggestions(e){if(e.length===0&&this.searchHistory.length===0){this.hideSuggestions();return}let t="";e.length>0&&(t+=`
        <div class="border-b border-gray-100 pb-2 mb-2">
          <h4 class="text-xs font-medium text-gray-500 mb-2">SUGGESTIONS</h4>
          ${e.map(s=>`
            <button class="suggestion-item block w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded" data-suggestion="${s}">
              🔍 ${s}
            </button>
          `).join("")}
        </div>
      `),this.suggestionsContent.innerHTML=t,this.suggestionsContent.querySelectorAll(".suggestion-item").forEach(s=>{s.addEventListener("click",()=>{const r=s.dataset.suggestion;r&&(this.searchInput.value=r,this.performSearch(r,!0),this.hideSuggestions())})}),this.suggestionsDropdown.classList.remove("hidden")}showSearchHistory(){if(this.searchHistory.length===0)return;const e=`
      <div>
        <h4 class="text-xs font-medium text-gray-500 mb-2">RECENT SEARCHES</h4>
        ${this.searchHistory.map(t=>`
          <button class="history-item block w-full text-left px-2 py-1 text-sm hover:bg-gray-50 rounded" data-query="${t}">
            📖 ${t}
          </button>
        `).join("")}
      </div>
    `;this.suggestionsContent.innerHTML=e,this.suggestionsContent.querySelectorAll(".history-item").forEach(t=>{t.addEventListener("click",()=>{const i=t.dataset.query;i&&(this.searchInput.value=i,this.performSearch(i),this.hideSuggestions())})}),this.suggestionsDropdown.classList.remove("hidden")}highlightQuery(e,t){if(!t)return e;const s=new RegExp(`(${t})`,"gi");return e.replace(s,'<mark class="bg-yellow-200">$1</mark>')}showLoading(){this.searchIcon.classList.add("hidden"),this.loadingSpinner.classList.remove("hidden"),this.searchButton.disabled=!0}hideLoading(){this.searchIcon.classList.remove("hidden"),this.loadingSpinner.classList.add("hidden"),this.searchButton.disabled=!1}showResults(){this.searchResults.classList.remove("hidden")}hideResults(){this.searchResults.classList.add("hidden")}hideSuggestions(){this.suggestionsDropdown.classList.add("hidden")}showError(e){this.resultsContent.innerHTML=`
      <div class="text-center py-4 text-red-500">
        <p>${e}</p>
      </div>
    `,this.showResults()}clearSearch(){this.searchInput.value="",this.currentQuery="",this.clearButton.classList.add("hidden"),this.hideResults(),this.hideSuggestions(),this.searchInput.focus()}addToSearchHistory(e){this.searchHistory=[e,...this.searchHistory.filter(t=>t!==e)].slice(0,10),localStorage.setItem("blog-search-history",JSON.stringify(this.searchHistory))}loadSearchHistory(){try{const e=localStorage.getItem("blog-search-history");return e?JSON.parse(e):[]}catch{return[]}}}document.addEventListener("DOMContentLoaded",()=>{try{new y}catch(h){console.error("Failed to initialize search:",h)}});
