const express = require("express");
const transactionController = require("./../controllers/TransactionController");
const userController = require("./../controllers/UserController");
const JwtMiddleware = require("./../middlewares/JwtMiddleware");

const router = express.Router();


router.route("/profile/transactions")
    .get(JwtMiddleware.authenticateToken,transactionController.getAllTransactions);

router.route("/profile")
    .get(JwtMiddleware.authenticateToken,userController.getProfile);

router.route("/balance")
    .get(JwtMiddleware.authenticateToken,userController.getBalance)
    .put(JwtMiddleware.authenticateToken,userController.depositCoins);




module.exports = router;