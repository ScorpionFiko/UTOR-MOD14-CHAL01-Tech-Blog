const sequelize = require(`./config/connection`);
sequelize.sync({ force: true });