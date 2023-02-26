const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// create new Comment
router.post('/', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.create({
            id: null,
            title: req.body.title,
            text: req.body.text,
            article_id: req.body.article_id,
            user_id: req.body.user_id
        });

        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// update existing Comment
router.put('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.update({
            title: req.body.title,
            text: req.body.text,
            article_id: req.body.article_id,
            user_id: req.body.user_id
        },{
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// delete existing Comment
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        res.status(200).json(commentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


module.exports = router;