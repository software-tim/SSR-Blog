// src/lib/search-router.js
import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Fuse from 'fuse.js';
import OpenAI from 'openai';

const router = express.Router();

class SearchEngine {
    constructor() {
        this.searchIndex = [];
        this.fuse = null;
        this.postsPath = path.join(process.cwd(), 'src/content/blog');
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY || 'your-api-key-here',
            baseURL: process.env.LLM_BASE_URL || 'https://api.openai.com/v1'
        });
    }

    async init() {
        await this.buildSearchIndex();
    }

    async ensureSearchIndex() {
        if (this.searchIndex.length === 0) {
            await this.buildSearchIndex();
        }
    }

    async buildSearchIndex() {
        this.searchIndex = [];
        try {
            try {
                await fs.access(this.postsPath);
            } catch {
                await fs.mkdir(this.postsPath, { recursive: true });
                await this.createSamplePost();
            }
            const files = await fs.readdir(this.postsPath);
            const mdFiles = files.filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
            if (mdFiles.length === 0) {
                await this.createSamplePost();
            }
            for (const file of mdFiles) {
                const content = await fs.readFile(path.join(this.postsPath, file), 'utf8');
                const { data: frontmatter, content: body } = matter(content);
                const slug = file.replace(/\.(md|mdx)$/, '');
                const post = {
                    slug: frontmatter.slug || slug,
                    title: frontmatter.title || slug,
                    description: frontmatter.description || '',
                    content: body,
                    excerpt: this.generateExcerpt(body),
                    tags: frontmatter.tags || [],
                    author: frontmatter.author || 'Anonymous',
                    date: frontmatter.date || new Date().toISOString(),
                    category: frontmatter.category || 'General'
                };
                this.searchIndex.push(post);
            }
            this.fuse = new Fuse(this.searchIndex, {
                keys: ['title', 'description', 'content', 'tags'],
                threshold: 0.4,
                includeScore: true,
                includeMatches: true
            });
        } catch (error) {
            console.error('Error building index:', error);
        }
    }

    async createSamplePost() {
        const post = `---\ntitle: Welcome\ndescription: Welcome post\ndate: 2025-01-01\ntags: [welcome]\nauthor: Admin\ncategory: General\n---\nWelcome to your blog.`;
        await fs.writeFile(path.join(this.postsPath, 'welcome.md'), post);
    }

    generateExcerpt(content, length = 200) {
        const plain = content.replace(/[#*`_\[\]]/g, '');
        return plain.length > length ? plain.slice(0, length) + '...' : plain;
    }

    async fuzzySearch(query, limit = 5) {
        const results = this.fuse.search(query, { limit });
        return results.map(r => ({ ...r.item, score: 1 - r.score }));
    }
}

const engine = new SearchEngine();
await engine.init();

router.use(cors());
router.use(express.json());

router.get('/search', async (req, res) => {
    const { q, limit = 5 } = req.query;
    if (!q) return res.status(400).json({ error: 'Missing query' });
    try {
        await engine.ensureSearchIndex();
        const results = await engine.fuzzySearch(q, parseInt(limit));
        res.json({ results });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/health', (req, res) => {
    res.json({ status: 'ok', indexSize: engine.searchIndex.length });
});

export default router;
