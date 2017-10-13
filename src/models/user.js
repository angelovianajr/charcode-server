import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

// Main Schema
const userSchema = new mongoose.Schema({
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
userSchema.pre('save', (next) => {
    const user = this;
    // Verifica se a senha do usuário foi modificada ou é nova
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(16, (err, salt) => {
            if (err) return next(err);
            // Gera um hash com a senha e um salt
            bcrypt.hash(user.password, salt, null, (err, hash) => {
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

userSchema.methods.comparePassword = function (passw, callback) {
    bcrypt.compare(passw, this.password, (err, isMatch) => {
        if (err) {
            return callback(err);
        }
        callback(null, isMatch);
    });
};

export default mongoose.model('User', userSchema);;