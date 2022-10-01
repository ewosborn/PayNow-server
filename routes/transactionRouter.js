import express from 'express';
import Transaction from '../models/transaction.js';
import {auth} from '../middlewares/auth.js';
const transactionRouter = express.Router();


// Post expenses
transactionRouter.post('/', auth, async (req, res) => {

    try {
        const { transactionType,receiver, amount } = req.body;
        console.log(req.user);
        const transacs = new Transaction({
            amount: amount,
            sender: req.user.id,
            receiver: receiver,
            transactionType: transactionType
        });
        const createdTransaction = await transacs.save();
        res.status(201).send({ message: 'Transaction created successfully', transaction: createdTransaction });


    } catch (e) {
        res.status(500).json({ error: e.message });
    }

});

// Get incomes
transactionRouter.get('/', async (req, res) => {

});

export default transactionRouter;