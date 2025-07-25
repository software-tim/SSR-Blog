export { renderers } from '../../renderers.mjs';

async function GET({ url }) {
  const searchParams = url.searchParams;
  try {
    const response = await fetch(`http://localhost:8081/api/search?${searchParams}`);
    const data = await response.json();
    
    // Transform the results to ensure proper URLs and confidence scores
    const transformedData = {
      ...data,
      results: data.results ? data.results.map(article => ({
        ...article,
        // Fix: Build the correct URL from slug if not provided
        url: article.url || `/articles/${article.slug}`,
        // Fix: Map various possible confidence field names
        llmRelevanceScore: article.llmRelevanceScore || 
                          article.relevanceScore || 
                          article.confidence || 
                          article.score || 
                          article._score || 
                          0.5, // default fallback
        // Ensure other fields exist
        slug: article.slug || article.id || '',
        title: article.title || 'Untitled',
        description: article.description || article.excerpt || '',
        excerpt: article.excerpt || article.description || '',
        tags: article.tags || [],
        date: article.date || article.publishedAt || new Date().toISOString(),
        readingTime: article.readingTime || 5,
      })) : []
    };
    
    // Debug logging to help troubleshoot
    if (transformedData.results.length > 0) {
      console.log('Search API - First result:', {
        slug: transformedData.results[0].slug,
        url: transformedData.results[0].url,
        llmRelevanceScore: transformedData.results[0].llmRelevanceScore
      });
    }
    
    return new Response(JSON.stringify(transformedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Search API error:', error);
    return new Response(JSON.stringify({ 
      error: 'Search failed',
      results: [] 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
