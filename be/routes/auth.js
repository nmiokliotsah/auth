require('dotenv').config();

const Router = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { registerValidators } = require('../validators/validators');
const { loginValidators } = require('../validators/validators');
const { createAccessToken } = require('../utils/token');
const { createRefreshToken } = require('../utils/token');
const { getUserByEmail } = require('../utils/database');
const withAuth = require('../middleware/middleware');
const User = require('../models/users');
const router = Router();

let refreshTokens = [];

router.post('/auth/login', loginValidators, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json({ message: 'Email or password is wrong' })
        }
        const { email, password } = req.body;
        const candidate = await getUserByEmail(email);

        if (candidate.id) {
            const areSame = await bcrypt.compare(password, candidate.password);
            if (areSame) {
                const accessToken = createAccessToken(candidate.id, "muSecretValue1");
                const refreshToken = createRefreshToken(candidate.id, 'muSecretValue2');
                refreshTokens.push(refreshToken);
                res.cookie('token', refreshToken, { httpOnly: true });
                res.status(200).json({ accessToken });
            } else {
                res.status(401).json({
                    message: 'Password or email are incorrect'
                });
            }
        } else {
            res.status(500).json({
                message: 'This user does not exist'
            });
        }
    } catch (e) {
        console.log(e);
    }
});

router.delete('/logout', (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.cookies.token)
    res.sendStatus(204)
});

router.post('/auth/register', registerValidators, async (req, res) => {
    try {
        const errors = validationResult(req);
        const { username, password, email } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        if (!errors.isEmpty()) {
            return res.status(422).json({ error: errors.array()[0].msg });
        }
        await User.create({
            email,
            username,
            password: hashPassword,
            undatedAt: new Date()
        });
        res.status(200).json({
            message: 'Welcome to the club'
        });
    } catch (e) {
        res.status(500).json({
            message: 'Error registering'
        });
        console.log(e);
    }
});

router.get('/auth/token', (req, res) => {
    const refreshToken = req.cookies.token;

    if (!refreshToken) {
        return res.status(401).json({
            message: 'Unauthorized: No token provided'
        });
    }
    console.log(refreshTokens)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);

    jwt.verify(refreshToken, "muSecretValue2", (err, user) => {
        if (err) return res.sendStatus(403);
        req.id = user.id;
        const accessToken = createAccessToken(user.id , 'muSecretValue1');
        res.json({ accessToken: accessToken });
    });
});

router.get('/checkToken', withAuth, (req, res) => {
    res.status(200);
});
module.exports = router;