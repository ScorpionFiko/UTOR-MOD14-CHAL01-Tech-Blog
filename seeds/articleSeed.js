const {Article} = require(`../models`);

const data = [
    {
        id: null,
        title: `Test Article 1`,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum placerat iaculis. Aenean viverra ex lectus, ac rhoncus massa facilisis a. Aliquam lacinia massa arcu, et elementum nisi dapibus ac. Aliquam nec mauris ac urna pellentesque laoreet nec at urna. Aenean bibendum pharetra augue, et varius nisl tincidunt at. Curabitur eu eros ac lectus aliquam malesuada in non dolor. Duis arcu sapien, euismod eu lorem nec, aliquet tristique sem. Etiam eu libero tincidunt, suscipit velit fermentum, vehicula velit. Donec viverra consectetur nibh, ullamcorper eleifend neque facilisis eu.`,
        user_id: 1
    },
    {
        id: null,
        title: `Test Article 2`,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum placerat iaculis. Aenean viverra ex lectus, ac rhoncus massa facilisis a. Aliquam lacinia massa arcu, et elementum nisi dapibus ac. Aliquam nec mauris ac urna pellentesque laoreet nec at urna. Aenean bibendum pharetra augue, et varius nisl tincidunt at. Curabitur eu eros ac lectus aliquam malesuada in non dolor. `,
        user_id: 1
    },
    {
        id: null,
        title: `Test Article 3`,
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vestibulum placerat iaculis. Aenean viverra ex lectus, ac rhoncus massa facilisis a. Aliquam lacinia massa arcu, et elementum nisi dapibus ac. `,
        user_id: 2
    }
]

const seedArticleData = async () => {
    await Article.bulkCreate(data);
}

module.exports = seedArticleData;