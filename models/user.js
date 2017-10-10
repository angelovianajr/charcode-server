var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

// Main Schema
var userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    minimize: false
});

// Chamado antes de salvar no banco de dados no banco e criptografa a senha
userSchema.pre('save', function (next) {
    var user = this;
    // Verifica se a senha do usuário foi modificada ou é nova
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(16, function (err, salt) {
            if (err) return next(err);
            // Gera um hash com a senha e um salt
            bcrypt.hash(user.password, salt, null, function (err, hash) {
                if (err) return next(err);
                // Seta a senha do usuário como o hash gerado
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

// Chamado a partir de um objeto user, recebe uma seha como parametro e retorna se a senha está correta
userSchema.methods.comparePassword = function (passw, callback) {
    bcrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

// Cria um model com o schema par ao uso
var User = mongoose.model('User', userSchema);

module.exports = User;
