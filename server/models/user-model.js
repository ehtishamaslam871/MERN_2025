const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});


//JSON WEB TOKEN Method
userSchema.methods.generateAuthToken = function() {
    try {
        return jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d' 
            }
        );
    } catch (error) {
        console.error("Error generating token:", error);
    }

}


const User = mongoose.model('User', userSchema);

module.exports = User;