import mongoose from 'mongoose';

const transactionSchema = mongoose.Schema({
    transactionType: {
        required: true,
        type: String
    },
    amount: {
        required: true,
        type: Number
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },


}, {
    timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default  Transaction;