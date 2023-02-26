const router = require('express').Router();
const { Article } = require('../models');

router.get('/', async (req, res) => {
    const articleData = await Article.findAll();
    const articles = articleData.map((article) => article.get({plain: true}));
    // must change to res.render("view") later on
    res.status(200).json(articles);
});

module.exports = router;