// src/lib/search-server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Fuse from 'fuse.js';
import OpenAI from 'openai';

class BlogSearchServer {
    constructor() {
        this.app = express();
        this.searchIndex = [];
        this.fuse = null;
        this.postsPath = path.join(process.cwd(), 'src/content/blog');
        
        // Initialize OpenAI with your PH4 endpoint
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here',
            baseURL: process.env.LLM_BASE_URL || 'https://api.openai.com/v1' // Changed to OpenAI default
        });

        this.setupMiddleware();
        this.setupRoutes();
    }

    setupMiddleware() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    setupRoutes() {
        // Enhanced search endpoint
        this.app.get('/api/search', async (req, res) => {
            try {
                const { 
                    q: query, 
                    limit = 5, 
                    enhance = 'true',
                    type = 'semantic' 
                } = req.query;

                if (!query) {
                    return res.status(400).json({ 
                        error: 'Query parameter required',
                        usage: '/api/search?q=your-search-term&limit=5&enhance=true&type=semantic'
                    });
                }

                // Ensure search index is loaded
                await this.ensureSearchIndex();

                let results = [];

                switch (type) {
                    case 'semantic':
                        results = await this.semanticSearch(query, parseInt(limit));
                        break;
                    case 'fuzzy':
                        results = await this.fuzzySearch(query, parseInt(limit));
                        break;
                    case 'exact':
                        results = await this.exactSearch(query, parseInt(limit));
                        break;
                    default:
                        results = await this.fuzzySearch(query, parseInt(limit));
                }

                // Enhance with LLM if requested and API key is available
                if (enhance === 'true' && results.length > 0 && process.env.OPENAI_API_KEY) {
                    try {
                        results = await this.enhanceSearchWithLLM(query, results);
                    } catch (llmError) {
                        console.log('LLM enhancement failed, returning basic results:', llmError.message);
                    }
                }

                res.json({
                    query,
                    searchType: type,
                    resultCount: results.length,
                    enhanced: enhance === 'true' && !!process.env.OPENAI_API_KEY,
                    results: results.slice(0, parseInt(limit))
                });

            } catch (error) {
                console.error('Search error:', error);
                res.status(500).json({ 
                    error: error.message,
                    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
                });
            }
        });

        // Get post summary using LLM
        this.app.get('/api/summary/:slug', async (req, res) => {
            try {
                const { slug } = req.params;
                const post = await this.getPostBySlug(slug);
                
                if (!post) {
                    return res.status(404).json({ error: 'Post not found' });
                }

                let summary = 'AI summary unavailable';
                if (process.env.OPENAI_API_KEY) {
                    try {
                        summary = await this.generatePostSummary(post);
                    } catch (llmError) {
                        console.log('LLM summary failed:', llmError.message);
                        summary = post.excerpt || 'Summary unavailable';
                    }
                }
                
                res.json({
                    slug,
                    title: post.title,
                    summary,
                    wordCount: post.wordCount,
                    readingTime: Math.ceil(post.wordCount / 200)
                });

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // Rebuild search index
        this.app.post('/api/rebuild-index', async (req, res) => {
            try {
                await this.buildSearchIndex();
                res.json({
                    message: 'Search index rebuilt successfully',
                    postsIndexed: this.searchIndex.length,
                    timestamp: new Date().toISOString()
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // Get search suggestions
        this.app.get('/api/suggestions', async (req, res) => {
            try {
                const { q: query } = req.query;
                await this.ensureSearchIndex();

                const suggestions = this.generateSuggestions(query);
                res.json({ suggestions });

            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });

        // Health check
        this.app.get('/api/health', (req, res) => {
            res.json({ 
                status: 'healthy',
                timestamp: new Date().toISOString(),
                indexSize: this.searchIndex.length,
                llmEnabled: !!process.env.OPENAI_API_KEY
            });
        });
    }

    async ensureSearchIndex() {
        if (this.searchIndex.length === 0) {
            await this.buildSearchIndex();
        }
    }

    async buildSearchIndex() {
        console.log('Building search index...');
        this.searchIndex = [];

        try {
            // Check if content directory exists, create sample content if not
            try {
                await fs.access(this.postsPath);
            } catch {
                console.log('Creating content/blog directory with sample post...');
                await fs.mkdir(this.postsPath, { recursive: true });
                await this.createSamplePost();
            }

            const files = await fs.readdir(this.postsPath);
            const mdFiles = files.filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

            if (mdFiles.length === 0) {
                console.log('No markdown files found, creating sample post...');
                await this.createSamplePost();
                const newFiles = await fs.readdir(this.postsPath);
                mdFiles.push(...newFiles.filter(file => file.endsWith('.md')));
            }

            for (const file of mdFiles) {
                const filePath = path.join(this.postsPath, file);
                const content = await fs.readFile(filePath, 'utf8');
                const { data: frontmatter, content: body } = matter(content);

                const slug = file.replace(/\.(md|mdx)$/, '');
                const wordCount = body.split(/\s+/).length;

                const post = {
                    slug: frontmatter.slug || slug,
                    title: frontmatter.title || slug,
                    description: frontmatter.description || '',
                    content: body,
                    excerpt: this.generateExcerpt(body, 200),
                    tags: frontmatter.tags || [],
                    author: frontmatter.author || 'Anonymous',
                    date: frontmatter.date || new Date().toISOString(),
                    category: frontmatter.category || 'General',
                    wordCount,
                    readingTime: Math.ceil(wordCount / 200),
                    url: `/articles/${frontmatter.slug || slug}`
                };

                this.searchIndex.push(post);
            }

            // Initialize Fuse.js for fuzzy search
            this.fuse = new Fuse(this.searchIndex, {
                keys: [
                    { name: 'title', weight: 0.3 },
                    { name: 'description', weight: 0.2 },
                    { name: 'content', weight: 0.4 },
                    { name: 'tags', weight: 0.1 }
                ],
                threshold: 0.4,
                includeScore: true,
                includeMatches: true
            });

            console.log(`Search index built with ${this.searchIndex.length} posts`);

        } catch (error) {
            console.error('Error building search index:', error);
            throw error;
        }
    }

    async createSamplePost() {
        const samplePost = `---
title: "Welcome to Your Blog"
description: "This is a sample blog post to get you started"
date: "2025-01-01"
tags: ["welcome", "getting-started"]
author: "Blog Admin"
category: "General"
---

# Welcome to Your Blog

This is a sample blog post created automatically. You can replace this with your own content.

## Getting Started

To create new blog posts, add markdown files to the \`src/content/blog\` directory.

## Search Features

This blog now includes powerful search capabilities:

- **Semantic Search**: Uses AI to understand the meaning of your queries
- **Fuzzy Search**: Finds results even with typos
- **Exact Search**: Finds exact matches

Try searching for terms like "welcome", "getting started", or "search" to see it in action!
`;

        await fs.writeFile(path.join(this.postsPath, 'welcome.md'), samplePost);
        console.log('Sample post created at src/content/blog/welcome.md');
    }

    async fuzzySearch(query, limit) {
        if (!this.fuse) {
            throw new Error('Search index not initialized');
        }

        const results = this.fuse.search(query, { limit });
        
        return results.map(result => ({
            ...result.item,
            score: 1 - result.score,
            matches: result.matches,
            snippet: this.generateSnippet(result.item.content, query)
        }));
    }

    async exactSearch(query, limit) {
        const queryLower = query.toLowerCase();
        const results = [];

        for (const post of this.searchIndex) {
            let score = 0;

            if (post.title.toLowerCase().includes(queryLower)) {
                score += 10;
            }

            const contentMatches = (post.content.toLowerCase().match(new RegExp(queryLower, 'g')) || []).length;
            score += contentMatches * 2;

            const tagMatches = post.tags.filter(tag => 
                tag.toLowerCase().includes(queryLower)
            ).length;
            score += tagMatches * 5;

            if (score > 0) {
                results.push({
                    ...post,
                    score,
                    snippet: this.generateSnippet(post.content, query)
                });
            }
        }

        return results
            .sort((a, b) => b.score - a.score)
            .slice(0, limit);
    }

    async semanticSearch(query, limit) {
        // If no API key, fall back to fuzzy search
        if (!process.env.OPENAI_API_KEY) {
            console.log('No OpenAI API key found, using fuzzy search instead of semantic');
            return await this.fuzzySearch(query, limit);
        }

        try {
            return await this.llmSemanticSearch(query, limit);
        } catch (error) {
            console.log('LLM semantic search failed, falling back to fuzzy search:', error.message);
            return await this.fuzzySearch(query, limit);
        }
    }

    async llmSemanticSearch(query, limit) {
        const candidates = await this.fuzzySearch(query, limit * 2);

        if (candidates.length === 0) {
            return [];
        }

        const prompt = `You are a blog search assistant. Analyze these blog posts and rank them by relevance to the user's search query. For each relevant post, explain specifically WHY it matches the search.

User's Search: "${query}"

Blog Posts:
${candidates.map((post, index) => `
${index + 1}. TITLE: "${post.title}"
   CONTENT: ${post.excerpt.substring(0, 200)}...
   TAGS: [${post.tags.join(', ')}]
`).join('\n')}

Return ONLY this JSON format:
{
  "rankings": [
    {
      "index": 1,
      "relevanceScore": 0.95,
      "reason": "This article about Samsung phones directly matches the search for 'phone' because it discusses mobile device performance, specifications, and features that phone shoppers would find valuable."
    }
  ]
}

IMPORTANT: 
- Only include posts with relevanceScore > 0.6
- Write specific, detailed reasons explaining the connection between the search query and the article content
- Don't use generic words like "explanation" - write actual explanations
- Focus on why someone searching for "${query}" would find this article helpful`;

        try {
            console.log('🔍 Calling semantic search LLM...');
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { 
                        role: 'system', 
                        content: 'You are an expert search analyst. Always provide specific, detailed explanations for why articles are relevant to search queries. Never use placeholder text like "explanation".' 
                    },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.1, // Lower temperature for more consistent responses
                max_tokens: 1500
            });

            let rawResponse = response.choices[0].message.content.trim();
            console.log('🔍 Semantic search raw response:', rawResponse);
            
            // Extract JSON from the response
            const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
            
            if (jsonMatch) {
                const llmResponse = JSON.parse(jsonMatch[0]);
                console.log('🔍 Parsed semantic rankings:', llmResponse);
                
                if (!llmResponse.rankings || !Array.isArray(llmResponse.rankings)) {
                    throw new Error('Invalid rankings format from LLM');
                }
                
                const rankedResults = llmResponse.rankings
                    .filter(r => r.relevanceScore > 0.6 && r.index && r.reason)
                    .map(r => {
                        const candidate = candidates[r.index - 1];
                        if (!candidate) {
                            console.warn(`🔍 Invalid index ${r.index} in semantic search results`);
                            return null;
                        }
                        
                        // Ensure we have a proper reason, not just "explanation"
                        let reason = r.reason || '';
                        if (reason === 'explanation' || reason.length < 10) {
                            reason = `This article about "${candidate.title}" contains relevant information for your search about "${query}".`;
                        }
                        
                        return {
                            ...candidate,
                            llmRelevanceScore: r.relevanceScore,
                            relevanceReason: reason
                        };
                    })
                    .filter(Boolean)
                    .sort((a, b) => b.llmRelevanceScore - a.llmRelevanceScore)
                    .slice(0, limit);

                console.log('🔍 Final semantic results:', rankedResults.map(r => ({ 
                    title: r.title, 
                    score: r.llmRelevanceScore, 
                    reason: r.relevanceReason?.substring(0, 100) + '...'
                })));

                return rankedResults;
            } else {
                throw new Error('No valid JSON found in LLM response');
            }

        } catch (error) {
            console.log('🔍 Semantic search LLM failed:', error.message);
            console.log('🔍 Falling back to fuzzy search with enhanced reasons');
            
            // Enhanced fallback with better reasons
            return candidates.slice(0, limit).map((candidate, index) => ({
                ...candidate,
                llmRelevanceScore: Math.max(0.7 - (index * 0.1), 0.5),
                relevanceReason: `This article "${candidate.title}" is relevant to your search for "${query}" because it covers related topics and contains matching keywords.`
            }));
        }
    }

    async enhanceSearchWithLLM(query, results) {
        console.log('🤖 Attempting to enhance search with LLM...');
        console.log('🤖 Query:', query);
        console.log('🤖 Results count:', results.length);
        
        const prompt = `Analyze this search query and results. Respond with ONLY a JSON object (no other text):

Query: "${query}"
Results: ${results.slice(0, 3).map(r => r.title).join(', ')}

{"analysis": "brief analysis of what the user is searching for", "relatedTopics": ["topic1", "topic2", "topic3"]}`;

        try {
            console.log('🤖 Calling OpenAI API for search enhancement...');
            
            const response = await this.openai.chat.completions.create({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a search analyst. Respond only with valid JSON.' },
                    { role: 'user', content: prompt }
                ],
                temperature: 0.5,
                max_tokens: 300
            });

            console.log('🤖 OpenAI response received');
            let rawResponse = response.choices[0].message.content;
            console.log('🤖 Raw response:', rawResponse);
            
            // Extract JSON from the response
            let insights;
            try {
                const jsonMatch = rawResponse.match(/\{[\s\S]*\}/);
                if (jsonMatch) {
                    insights = JSON.parse(jsonMatch[0]);
                    console.log('🤖 Extracted JSON insights:', JSON.stringify(insights, null, 2));
                } else {
                    throw new Error('No JSON found in response');
                }
            } catch (parseError) {
                console.log('🤖 JSON parse failed, creating fallback insights');
                insights = {
                    analysis: `Search for "${query}" found ${results.length} relevant article${results.length === 1 ? '' : 's'}.`,
                    relatedTopics: ["technology", "reviews", "guides"]
                };
            }
            
            if (results.length > 0) {
                results[0].searchInsights = insights;
                console.log('🤖 Added insights to first result');
                console.log('🤖 First result now has searchInsights:', !!results[0].searchInsights);
            }
            
        } catch (error) {
            console.error('🤖 Error enhancing search:', error.message);
            
            // Add fallback insights even if API fails
            if (results.length > 0) {
                results[0].searchInsights = {
                    analysis: `Search for "${query}" found ${results.length} relevant article${results.length === 1 ? '' : 's'}.`,
                    relatedTopics: ["technology", "reviews", "guides"]
                };
                console.log('🤖 Added fallback insights due to API error');
            }
        }

        console.log('🤖 Returning results, first result has searchInsights:', !!(results[0] && results[0].searchInsights));
        return results;
    }

    async generatePostSummary(post) {
        const response = await this.openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Create concise blog post summaries.' },
                { role: 'user', content: `Summarize this post in 2-3 sentences:\n\nTitle: ${post.title}\nContent: ${post.content.substring(0, 2000)}` }
            ],
            temperature: 0.3,
            max_tokens: 200
        });

        return response.choices[0].message.content;
    }

    generateSuggestions(query) {
        if (!query || query.length < 2) return [];

        const allTags = [...new Set(this.searchIndex.flatMap(post => post.tags))];
        const allTitles = this.searchIndex.map(post => post.title);
        
        const suggestions = [
            ...allTags.filter(tag => tag.toLowerCase().includes(query.toLowerCase())),
            ...allTitles.filter(title => title.toLowerCase().includes(query.toLowerCase()))
        ];

        return suggestions.slice(0, 5);
    }

    generateExcerpt(content, maxLength = 200) {
        const plainText = content.replace(/[#*`_\[\]]/g, '');
        if (plainText.length <= maxLength) return plainText;
        
        const words = plainText.split(' ');
        let excerpt = '';
        
        for (const word of words) {
            if ((excerpt + word).length > maxLength) break;
            excerpt += word + ' ';
        }
        
        return excerpt.trim() + '...';
    }

    generateSnippet(content, query, maxLength = 150) {
        const queryLower = query.toLowerCase();
        const contentLower = content.toLowerCase();
        const index = contentLower.indexOf(queryLower);
        
        if (index === -1) {
            return this.generateExcerpt(content, maxLength);
        }
        
        const start = Math.max(0, index - 50);
        const end = Math.min(content.length, index + query.length + 100);
        const snippet = content.substring(start, end);
        
        return (start > 0 ? '...' : '') + snippet + (end < content.length ? '...' : '');
    }

    async getPostBySlug(slug) {
        await this.ensureSearchIndex();
        return this.searchIndex.find(post => post.slug === slug);
    }

    start(port = process.env.PORT || 8081) {
        this.app.listen(port, () => {
            console.log(`🔍 Blog Search Server running on port ${port}`);
            console.log(`🏥 Health check: http://localhost:${port}/api/health`);
            console.log(`🔍 Search API: http://localhost:${port}/api/search?q=welcome`);
            console.log(`🤖 LLM features: ${process.env.OPENAI_API_KEY ? 'Enabled' : 'Disabled (set OPENAI_API_KEY to enable)'}`);
        });

        this.buildSearchIndex().catch(console.error);
    }
}

// Start the server
const searchServer = new BlogSearchServer();
searchServer.start(process.env.PORT || 8081);