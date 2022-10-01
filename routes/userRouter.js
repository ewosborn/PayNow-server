const express = require('express');
const auth = require('../middlewares/auth');
const User = require('../models/user');

const userRouter = express.Router();


// SIGN UP Route
userRouter.post('/signup', async (req, res) => {
    try {
        const {email, password} = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res
                .status(400)
                .json({msg: 'User with same email already exists!'});
        }

        const hashedPassword = await bcryptjs.hash(password, 8);

        let user = new User({
            email,
            password: hashedPassword,        
        });
        user = await user.save();
        res.json(user);
    } catch (e) {
        res.status(500).json({error: e.message});
    }
    
});

// SIGN IN Route
userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({email});
        if(!user) {
            return res
                .status(400)
                .json({ msg: "User with this email does not exist!" });
        }       

        const isMatch = await bcryptjs.compare(password, user.password);
        if(!isMatch) {
            return res
                .status(400)
                .json({msg: "Incorrect password."});
        } 

        const token = jwt.sign({id: user._id}, "passwordKey");
        res.json({ token, ...user._doc });
    } catch (e) {
        res.status(500).json({error: e.message});
    }
});

// 

module.exports = userRouter;