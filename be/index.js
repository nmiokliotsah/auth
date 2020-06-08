const express = require('express');
const sequelize = require('./utils/databaseSettings');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser());
app.use('/api', authRouter);
app.use('/api', userRouter);

async function start() {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log('Server is starting');
        });
    } catch (e) {
        console.log(e);
    }
}

start();