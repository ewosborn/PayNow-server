const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email: {
        required: true,
        type: String,
        trim: true,
        validate: {
            validator: (value) => {
                const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
                return value.match(re);
            },
            message: "Please enter a valid email address",
        }
    },
    password: {
        required: true,
        type: String,
        validate: {
            validator: (value) => {
                
                return value.length > 7;
            },
            message: "Please enter a password",
        }
    },
    contact: {
        type: String,
        default: '',
    },    
})

const User = mongoose.model('User', userSchema);
module.exports = User;