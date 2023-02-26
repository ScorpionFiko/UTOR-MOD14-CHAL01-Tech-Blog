const router = require('express').Router();
const { Article } = require('../../models');
const withAuth = require('../../utils/auth');

// create new Article
router.post('/', withAuth, async (req, res) => {
    try {
        const articleData = await Article.create({
            id: null,
            title: req.body.title,
            text: req.body.text,
            user_id: req.body.user_id
        });

        res.status(200).json(articleData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// update existing Article
router.put('/:id', withAuth, async (req, res) => {
    try {
        const articleData = await Article.update({
            title: req.body.title,
            text: req.body.text,
            user_id: req.body.user_id
        },{
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(articleData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// delete existing Article
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const articleData = await Article.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(articleData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;