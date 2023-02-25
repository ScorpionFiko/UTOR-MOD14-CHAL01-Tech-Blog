const {User} = require(`../models`);
const bcrypt = require(`bcrypt`);

const data = [
    {
        id: null,
        username: `Stefan`,
        email: `test@test.com`,
        password: bcrypt.hashSync(`passWord123`, 10)
    },
    {
        id: null,
        username: `Fiko`,
        email: `fiko@fiko.com`,
        password: bcrypt.hashSync(`Password123`, 10)
    }
]

const seedUserData = async () => {
    await User.bulkCreate(data);
}

module.exports = seedUserData;