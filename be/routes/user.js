const Router = require("express");
const User = require('../models/users');
const { getUserByEmail } = require('../utils/database');
const { getUserByUsername } = require('../utils/database');
const { getUserById } = require('../utils/database');
const withAuth = require('../middleware/middleware');
const router = Router();

const getUserWithoutPassword = (user) => {
    if (!!user.id) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }

    return user;
}

router.get('/users', async (req, res) => {
    const userEmail = req.query.email;
    const username = req.query.username;

    if (userEmail) {
        const user = await getUserByEmail(userEmail);
        const userWithoutPassword = await getUserWithoutPassword(user);

        return res.status(200).json(userWithoutPassword);
    }
    if (username) {
        const user = await getUserByUsername(username);
        const userWithoutPassword = await getUserWithoutPassword(user);

        return res.status(200).json(userWithoutPassword);
    }
    let users = await User.findAll();

    users = users.map(u => {
        return getUserWithoutPassword(u.dataValues);
    });
    res.status(200).json(users);
});

router.get('/me', withAuth, async (req, res) => {
    const user = await getUserById(req.id);
    const userWithoutPassword = getUserWithoutPassword(user);

    return res.status(200).json(userWithoutPassword);
});


module.exports = router;