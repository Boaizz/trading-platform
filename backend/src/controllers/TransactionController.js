const TransactionService = require("./../services/TransactionService");
const Joi = require("joi");
const convertJoiValidationError = require("../utils/ConvertJoiValidationError");

exports.getAllTransactions = async (req,res) => {
    let transactions;
    try {
        transactions = await TransactionService.findTransactionsByUserId(req.user.id);
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({
                status: "fail",
                message: convertJoiValidationError(error),
            });
        } else {
            return res.status(500).json({
                status: "error",
                message: error
            })
        }
    }

    return res.status(200).json({
        status: "success",
        data: {
            transactions: transactions
        }
    })
}