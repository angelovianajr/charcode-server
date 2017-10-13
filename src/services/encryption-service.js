import bcrypt from 'bcrypt-nodejs';

const rounds = 16;

function createHash(value, salt) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(value, salt, undefined, (err, hash) => {
            if (err) reject(err);

            resolve(hash);
        });
    });
};

function encrypt(value) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(rounds, (err, salt) => {
            if (err) reject(err);

            createHash(value, salt).then((hash) => {
                resolve(hash);
            }).catch((err) => {
                reject(err);
            });
        });
    });
};

function compare(first, second) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(first, second, (err, equals) => {
            if (err) reject(err);

            resolve(equals);
        });
    });
}

export default {
    encrypt,
    compare
};