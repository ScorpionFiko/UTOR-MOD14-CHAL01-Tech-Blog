const {Comment} = require(`../models`);

const data = [
    {
        id: null,
        text: `A1C1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum placerat iaculis. Aenean viverra ex lectus, ac rhoncus massa facilisis a. Aliquam lacinia massa arcu, et elementum nisi dapibus ac. Aliquam nec mauris ac urna pellentesque laoreet nec at urna. Aenean bibendum pharetra augue, et varius nisl tincidunt at. Curabitur eu eros ac lectus aliquam malesuada in non dolor. Duis arcu sapien, euismod eu lorem nec, aliquet tristique sem. Etiam eu libero tincidunt, suscipit velit fermentum, vehicula velit. Donec viverra consectetur nibh, ullamcorper eleifend neque facilisis eu.`,
        article_id: 1,
        user_id: 2
    },
    {
        id: null,
        text: `A1C2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum placerat iaculis. Aenean viverra ex lectus, ac rhoncus massa facilisis a. Aliquam lacinia massa arcu, et elementum nisi dapibus ac. Aliquam nec mauris ac urna pellentesque laoreet nec at urna. Aenean bibendum pharetra augue, et varius nisl tincidunt at. Curabitur eu eros ac lectus aliquam malesuada in non dolor. Duis arcu sapien, euismod eu lorem nec, aliquet tristique sem. Etiam eu libero tincidunt, suscipit velit fermentum, vehicula velit. Donec viverra consectetur nibh, ullamcorper eleifend neque facilisis eu.`,
        article_id: 1,
        user_id: 1
    },
    {
        id: null,
        text: `A2C1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum placerat iaculis. Aenean viverra ex lectus, ac rhoncus massa facilisis a. Aliquam lacinia massa arcu, et elementum nisi dapibus ac. Aliquam nec mauris ac urna pellentesque laoreet nec at urna. Aenean bibendum pharetra augue, et varius nisl tincidunt at. Curabitur eu eros ac lectus aliquam malesuada in non dolor. Duis arcu sapien, euismod eu lorem nec, aliquet tristique sem. Etiam eu libero tincidunt, suscipit velit fermentum, vehicula velit. Donec viverra consectetur nibh, ullamcorper eleifend neque facilisis eu.`,
        article_id: 2,
        user_id: 1
    }
]

const seedCommentData = async () => {
    await Comment.bulkCreate(data);
}

module.exports = seedCommentData;