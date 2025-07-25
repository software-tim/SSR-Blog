export async function GET({ url }) {
  const searchParams = url.searchParams;
  try {
    const response = await fetch(`http://localhost:8081/api/search?${searchParams}`);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Search failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}