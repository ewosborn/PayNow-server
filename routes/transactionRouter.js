import express from 'express';
import Transaction from '../models/transaction.js';
import { auth } from '../middlewares/auth.js';
const transactionRouter = express.Router();


// Post expenses
transactionRouter.post('/', auth, async (req, res) => {
    try {
        const { transactionType, receiver, amount } = req.body;
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

// send all transactions
transactionRouter.post('/send-all', auth, async (req, res) => {
    try {
        const { transactionData } = req.body;
        console.log(req.user);
        const transacs = await Transaction.insertMany(transactionData)
        const createdTransactions = await transacs.save();
        res.status(201).send({ message: 'Transaction created successfully', transaction: createdTransactions });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }

});


// Get all transactions associated with the current user
transactionRouter.get('/:userId',auth, async (req, res) => {
    try {
        const userId = req.params.userId
        console.log(req.user);
        const transacs = new Transaction.find({ $or: [{ sender: userId }, { receiver: userId }] });
        const createdTransaction = await transacs.save();
        res.status(201).send({ message: 'Transaction received successfully', transaction: createdTransaction });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});


// request transaction
transactionRouter.post('/request', auth, async (req, res) => {
    try {
        const { transactionType, sender, amount } = req.body;
        const transacs = new Transaction({
            amount: amount,
            sender: sender,
            receiver: req.user.id,
            transactionType: transactionType
        });
        const request = transacs.save();
        res.status(201).send({ message: 'Request created successfully', transaction: createdTransaction });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
});

export default transactionRouter;