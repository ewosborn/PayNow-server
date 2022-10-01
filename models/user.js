import mongoose from 'mongoose';

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
    name: {
        type: String,
        validate: {
            validator: (value) => {
                
                return value.length > 5;
            },
            message: "Name should not be less than 5 character",
        }
    },
    contact: {
        type: String,
        default: '',
    },
    totalAmount: {
        type: Number,
        default: 0,
    },
        
})

const User = mongoose.model('User', userSchema);
export default User;