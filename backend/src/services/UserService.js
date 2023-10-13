const web3 = require("../smart-contracts/Web3Instance");
const User = require("../models/User");
const Joi = require("joi").extend(require('@joi/date'));
const DigitalAssetMarketContract = require("../smart-contracts/SmartContract");
const jwtUtils = require("../utils/JwtUtils");
const DigitalAssetService = require("../services/DigitalAssetService");
const creditCardValidation = Joi.object().keys({
    amount: Joi.number().precision(2).sign('positive').max(10).required(),
    card_number: Joi.string().creditCard().required().messages({
        'string.creditCard': 'Invalid credit card number',
    }),
    card_holder: Joi.string().min(3).required(),
    expiry_date: Joi.date().format('MM-YYYY').raw().required(),
    cvv: Joi.string().length(3).pattern(/^[0-9]+$/).required().messages({
        'string.length': 'CVV must be 3 digits long',
        'string.pattern.base': 'CVV must contain only numbers',
    })
});

class InvalidCredentialsError extends Error {
    constructor() {
        super("Invalid credentials");
        this.name = "InvalidCredentialsError";
    }
}

class UserNotFound extends Error {
    constructor() {
        super("User Not Found");
        this.name = "UserNotFound";
    }
}


exports.createUser = async (first_name,last_name,email,password) => {
    const web3Account = web3.eth.accounts.create();
    const user = new User(first_name,last_name,email,password,web3Account.privateKey,web3Account.address);

    let newUser = await User.createUser(user);
    const accounts = await web3.eth.getAccounts();
    await DigitalAssetMarketContract.methods.createUser(newUser.user_id, newUser.last_name, newUser.email, newUser.wallet_address).send({
        from: accounts[0],
        gas: 1000000
    });

    return {
        user: newUser,
        access_token: jwtUtils.generateAccessToken(newUser.user_id,newUser.email)
    }
}

exports.login = async (email,password) => {
    let credentials = {email,password}

    await Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
    }).validateAsync(credentials);

    let users = await User.findUserByEmail(email)

    if (users.length === 0 || users[0].password !== password) {
        throw new InvalidCredentialsError();
    }

    const user = users[0];
    return jwtUtils.generateAccessToken(user.user_id, user.email)

}

exports.findUserById = async (id) => {

    let users = await User.findUserById(id);

    if (users.length === 0) {
        throw new UserNotFound();
    }

    return users[0];
}

exports.findProfileById = async (id) => {
    let user = await exports.findUserById(id);
    user.private_key = undefined;
    try {
        user.digital_assets = await DigitalAssetService.findDigitalAssets({"owner_id": id})
    } catch (error) {
        if (error instanceof DigitalAssetService.DigitalAssetsNotFoundError) {
            user.digital_assets = []
        } else {
            throw error;
        }
    }

    return user;
}

exports.getBalanceByUserId = async (id) => {
    const user = await exports.findUserById(id);
    return Number(web3.utils.fromWei(await web3.eth.getBalance(user.wallet_address),"ether"));
}

exports.depositCoinsToUserBalance = async (user_id,creditCardData) => {
    await creditCardValidation.validateAsync(creditCardData);
    const user = await exports.findUserById(user_id);
    const accounts = await web3.eth.getAccounts();

    await web3.eth.sendTransaction({
        from: accounts[0],
        to: user.wallet_address,
        value: web3.utils.toWei(creditCardData.amount,"ether"),
    });

}

exports.InvalidCredentialsError = InvalidCredentialsError;
exports.UserNotFound = UserNotFound;

