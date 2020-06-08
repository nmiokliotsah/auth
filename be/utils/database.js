const User = require('../models/users');

exports.getUserByEmail = async email => {
    const user = await User.findAll({
        where: {
            email
        }
    });

    if (user.length) {
        return user[0].dataValues;
    }
    return {};
}

exports.getUserByUsername = async username => {
    const user = await User.findAll({
        where: {
            username
        }
    });

    if (user.length) {
        return user[0].dataValues;
    }
    return {};
}

exports.getUserById = async id => {
    const user = await User.findAll({
        where: {
            id
        }
    });

    if (user.length) {
        return user[0].dataValues;
    }
    return {};
}