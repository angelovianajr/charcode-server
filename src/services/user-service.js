import User from '../models/user';

function findByEmail(email) {
    return new Promise((resolve, reject) => {
        User.findOne({ email }, (err, user) => {
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