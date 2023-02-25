const sequelize = require('../config/connection');
const {Article, Comment, User } = require(`../models`);
const seedArticleData = require(`./articleSeed`);
const seedCommentData = require(`./commentSeed`);
const seedUserData = require(`./userSeed`);

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedUserData();
  console.log('\n----- USER TABLE SYNCED -----\n');
  await seedArticleData();
  console.log('\n----- ARTICLE TABLE SYNCED -----\n');
  await seedCommentData();
  console.log('\n----- COMMENT TABLE SYNCED -----\n');
  process.exit(0);
};

seedAll();
