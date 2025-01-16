// Blog API Routes
const express = require('express');
const router = express.Router();
const BlogController = require('../controllers/BlogController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Create new blog post
router.post('/posts',
    auth.requireAdmin,
    upload.single('featuredImage'),
    async (req, res) => {
        try {
            await BlogController.createPost(req, res);
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
);

// Get all blog posts
router.get('/posts', async (req, res) => {
    try {
        const posts = await BlogController.getPosts(req.query);
        res.json({
            success: true,
            data: posts
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});

// Get single blog post
router.get('/posts/:slug', async (req, res) => {
    try {
        const post = await BlogController.getPostBySlug(req.params.slug);
        if (!post) {
            return res.status(404).json({
                success: false,
                error: 'Post not found'
            });
        }
        res.json({
            success: true,
            data: post
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});

// Update blog post
router.put('/posts/:id',
    auth.requireAdmin,
    upload.single('featuredImage'),
    async (req, res) => {
        try {
            const post = await BlogController.updatePost(req.params.id, req);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    error: 'Post not found'
                });
            }
            res.json({
                success: true,
                data: post
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
);

// Delete blog post
router.delete('/posts/:id',
    auth.requireAdmin,
    async (req, res) => {
        try {
            const post = await BlogController.deletePost(req.params.id);
            if (!post) {
                return res.status(404).json({
                    success: false,
                    error: 'Post not found'
                });
            }
            res.json({
                success: true,
                data: {}
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
);

// Get SEO analysis for draft content
router.post('/analyze-seo',
    auth.requireAdmin,
    async (req, res) => {
        try {
            const analysis = await BlogController.analyzeSEO(req.body);
            res.json({
                success: true,
                data: analysis
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
);

// Get blog categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await BlogController.getCategories();
        res.json({
            success: true,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Server error'
        });
    }
});

// Get blog stats
router.get('/stats',
    auth.requireAdmin,
    async (req, res) => {
        try {
            const stats = await BlogController.getBlogStats();
            res.json({
                success: true,
                data: stats
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                error: 'Server error'
            });
        }
    }
);

module.exports = router;