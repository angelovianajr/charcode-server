var User = require('../models/user');

function findByEmail(user) {
    return new Promise(function (resolve, reject) {
        User.findOne({ email: user.email }, (err, user) => {
            if (err) reject(err);

            resolve(user);
        });
    });
}

function listAll() {
    return new Promise(function (resolve, reject) {
        User.find(function (err, users) {
            if (err) reject(err);

            resolve(users);
        });
    });
}

module.exports = {
    findByEmail,
    listAll
};