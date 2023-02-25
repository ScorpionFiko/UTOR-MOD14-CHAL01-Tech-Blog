const Article = require(`./Article`);
const Comment = require(`./Comment`);
const User = require(`./User`);

User.hasMany(Article, {
    foreignKey: `user_id`,
    onDelete: `CASCADE`
});

Article.belongsTo(User, {
    foreignKey: `user_id`,
    onDelete:`CASCADE`
});

User.hasMany(Comment, {
    foreignKey: `user_id`,
    onDelete:`CASCADE`
});

Comment.belongsTo(User, {
    foreignKey: `user_id`,
    onDelete:`CASCADE`
});

Article.hasMany(Comment, {
    foreignKey:`article_id`,
    onDelete: `CASCADE`
});

Comment.belongsTo(Article, {
    foreignKey: `article_id`,
    onDelete: `CASCADE`
});



module.exports = { Article, Comment, User }