const express = require("express");
const authenticationController = require("./../controllers/AuthenticationController");
// const transactionController = require("./../controllers/TransactionController");
const router = express.Router();
// router.route("/users/:id")
//     .get(authenticationController.getOneUser);

router.route("/register")
    .post(authenticationController.register)

router.route("/login")
    .post(authenticationController.login)

// router.route("/users/:id/transactions")
//     .get(transactionController.getAllTransactions);


module.exports = router;