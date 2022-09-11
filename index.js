// IMPORTS FROM PACKAGES
const express = require('express');
const mongoose = require('mongoose');

// IMPORTS FROM OTHER FILES
const authRouter = require('./routes/auth');

// INIT
const port = process.env.PORT || 3000;
//const PORT = 3000;
const app = express();
const DB = "mongodb+srv://paynow:NowPay2022Project@cluster0.tpa8stj.mongodb.net/?retryWrites=true&w=majority";

// Middleware
app.use(express.json());
app.use(authRouter);

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
    console.log(`connected at port 3000`);
});