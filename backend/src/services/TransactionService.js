const Transaction = require("./../models/Transaction")
exports.createTransaction = async (transaction_hash,buyer_id,seller_id,asset_id) => {
    let transaction = new Transaction(transaction_hash,buyer_id,seller_id,asset_id);
    let newTransaction = await Transaction.createTransaction(transaction);
    return newTransaction;
}

exports.findTransactionsByUserId = async (user_id) => {
    let transactions = await Transaction.getAllTransactions(user_id);
    return transactions;
}