const router = require('express').Router();
const { Article, Comment, User } = require('../models');
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');

// gets all articles for the landing page; if user is logged in returns additional information
router.get('/', async (req, res) => {
    try {
        let articleData=[];
        if (req.session.loggedIn) {
            articleData = await Article.findAll({
                include: {
                    model: User,
                    attributes:['id', 'username']
                }
            });
        } else {
            articleData = await Article.findAll({
                attributes: ['id','text']
            });
        }
        const articles = articleData.map((article) => article.get({ plain: true }));
        res.render('home/homepage', { 
            layout:'main', 
            articles, 
            loggedIn: req.session.loggedIn, 
            userId: req.session.userId, 
            username: req.session.username });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// gets a single article with comments to display to the user
router.get('/article/:id', withAuth, async (req, res) => {
    try {
        const articleData = await Article.findByPk(req.params.id,{
            include: [{
                model: Comment,
                include: [{model: User, attributes: ['id','username']}]     
            },
            { 
                model: User, attributes: ['id','username']
            }]
        });

        const article = articleData.get({plain: true});
        res.render('home/article', { 
            layout: "main", 
            article, 
            loggedIn: req.session.loggedIn,userId: 
            req.session.userId, 
            username: req.session.username });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// renders the login page
router.get('/login', async (req, res) => {
    try {
        res.render('home/login', { layout: "main" });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;