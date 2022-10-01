// IMPORTS FROM PACKAGES
const express = require('express');
const mongoose = require('mongoose');

// IMPORTS FROM OTHER FILES
const userRouter = require('./routes/userRouter.js');

// INIT
const port = process.env.PORT || 3000;
const app = express();
const DB = "mongodb+srv://paynow:NowPay2022Project@cluster0.tpa8stj.mongodb.net/?retryWrites=true&w=majority";

app.use(express.json());
app.use('/api/user', userRouter);

// Connections
mongoose
    .connect(DB)
    .then(() => {
        console.log("Connection successful");
    })
    .catch((e) => {
        console.log(e);
    });

app.listen(3000, () => {
    console.log(`Connected at port 3000`);
});