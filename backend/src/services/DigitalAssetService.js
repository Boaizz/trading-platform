const DigitalAsset = require("../models/DigitalAsset");
const Joi = require("joi").extend(require("@joi/date"));
const DigitalAssetMarketContract = require("../smart-contracts/SmartContract");
const web3 = require("../smart-contracts/Web3Instance");
const User = require("../models/User");
const TransactionService = require("../services/TransactionService");
const {InvalidCredentialsError} = require("./UserService")
const queryValidationSchema = Joi.object({
    max: Joi.number(),
    min: Joi.number(),
    start: Joi.date().format("YYYY-MM-DD").raw(),
    end: Joi.date().format("YYYY-MM-DD").raw(),
    category: Joi.string().max(255).truncate().trim(),
    name: Joi.string().max(255).truncate().trim(),
    owner_id: Joi.number(),
    availability: Joi.boolean()
});

class DigitalAssetsNotFoundError extends Error {
    constructor() {
        super("Digital Assets not found");
        this.name = "DigitalAssetsNotFound";
    }
}

class DigitalAssetNotAvailableError extends Error {
    constructor() {
        super("Digital Assets not available");
        this.name = "DigitalAssetNotAvailableError";
    }
}

class DigitalAssetIsOwnedByUserError extends Error {
    constructor() {
        super("You already own the asset");
        this.name = "DigitalAssetIsOwnedByUserError";
    }
}

exports.createDigitalAsset = async (name, description, category, price, owner_id, image_name) => {

    const digitalAsset = new DigitalAsset(name, description, category, price, owner_id, image_name);

    let newAsset = await DigitalAsset.createDigitalAsset(digitalAsset);


    await DigitalAssetMarketContract.methods
        .createDigitalAsset(
            newAsset.asset_id,
            newAsset.owner_id,
            newAsset.name,
            newAsset.description,
            web3.utils.toWei(newAsset.price, "ether"),
            newAsset.category,
        )
        .send({ from: (await web3.eth.getAccounts())[0], gas: 1000000 });

    return newAsset;
}

exports.findDigitalAssetById = async (digitalAssetId) => {

    let assets = await DigitalAsset.findDigitalAssetById(digitalAssetId);


    if (assets.length === 0) {
        throw new DigitalAssetsNotFoundError();
    }

    return assets[0];
}

exports.findDigitalAssets = async (query) => {
    let validatedQuery = await queryValidationSchema.validateAsync(query);

    let assets = await DigitalAsset.getAllDigitalAssets(validatedQuery);

    if (assets.length === 0) {
        throw new DigitalAssetsNotFoundError();
    }

    for (const row of assets) {
        row.is_available = Boolean(Number(row.is_available));
    }

    return assets;
}
exports.purchaseDigitalAsset = async (buyer_id,asset_id) => {
    let assets = await DigitalAsset.findDigitalAssetById(asset_id);

    if (assets.length === 0) {
        throw new DigitalAssetsNotFoundError();
    }

    let asset = assets[0];

    let users = await User.findUserById(buyer_id);

    if (users.length === 0) {
        throw new InvalidCredentialsError();
    }

    let user = users[0];

    let seller_id = asset.owner_id;
    let userWallet = user.wallet_address;

    if (buyer_id === seller_id) {
        throw new DigitalAssetIsOwnedByUserError();
    }

    if (!asset.is_available) {
        throw new DigitalAssetNotAvailableError();
    }

    let tx = {
        from: userWallet,
        to: DigitalAssetMarketContract.options.address,
        data: await DigitalAssetMarketContract.methods
            .purchaseDigitalAsset(asset_id)
            .encodeABI(),
        value: web3.utils.toWei(asset.price, "ether"),
        gasLimit: 600000,
        gasPrice: await web3.eth.getGasPrice(),
    };


    let signedTx = await web3.eth.accounts.signTransaction(
        tx,
        user.private_key,
    );
    let transaction_hash = (await web3.eth.sendSignedTransaction(signedTx.rawTransaction)).transactionHash;

    await DigitalAsset.updateOwnership(asset_id,buyer_id);

    await TransactionService.createTransaction(
        transaction_hash,
        buyer_id,
        seller_id,
        asset_id,
    );
}

exports.DigitalAssetsNotFoundError = DigitalAssetsNotFoundError;
exports.DigitalAssetNotAvailableError = DigitalAssetNotAvailableError;
exports.DigitalAssetIsOwnedByUserError = DigitalAssetIsOwnedByUserError;