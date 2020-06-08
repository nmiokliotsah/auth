const Router = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { registerValidators } = require('../validators/validators');
const { loginValidators } = require('../validators/validators');
const { getUserByEmail } = require('../utils/database');
const withAuth = require('../middleware/middleware');
const User = require('../models/users');
const router = Router();

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
            const secret = 'muSecretValue'
            if (areSame) {
                const payload = { id: candidate.id };
                const token = jwt.sign(payload, secret, {
                    expiresIn: '1h'
                });
                res.cookie('token', token, { httpOnly: true })
                    .sendStatus(200);
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

router.get('/auth/token', withAuth, (req, res) => {
    res.sendStatus(200);
});

module.exports = router;