const router = require('express').Router();
const { Article } = require('../models');
const withAuth = require('../utils/auth');

// get all user's articles
router.get('/', withAuth, async (req, res) => {

    const articleData = await Article.findAll({
        where: {
            user_id: req.session.userId
        }
    });
    const articles = articleData.map((article) => article.get({plain: true}));
    res.render('dashboard/dashboard', {layout: "main", articles, loggedIn: req.session.loggedIn, userId: req.session.userId })
});

module.exports = router;