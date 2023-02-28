const router = require('express').Router();
const { User } = require('../../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    // adds id and username to the session so that they can be displayed
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId  = dbUserData.get({plain:true}).id;
      req.session.username  = dbUserData.get({plain:true}).username;
      res.status(200).json();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }
    // adds id and username to the session so that they can be displayed
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.get({plain:true}).id;
      req.session.username  = dbUserData.get({plain:true}).username;
      res
        .status(200)
        .json();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
   req.session.destroy(() => {
      res.status(204).end();
  })
});

module.exports = router;
