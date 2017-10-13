import User from '../models/user';

function findByEmail(user) {
    return new Promise((resolve, reject) => {
        User.findOne({ email: user.email }, (err, user) => {
            if (err) reject(err);

            resolve(user);
        });
    });
}

function listAll() {
    return new Promise((resolve, reject) => {
        User.find((err, users) => {
            if (err) reject(err);

            resolve(users);
        });
    });
}

export default {
    findByEmail,
    listAll
};