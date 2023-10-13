
const Joi = require("joi");
const DigitalAssetService = require("./../services/DigitalAssetService")
const UserService = require("./../services/UserService")
const convertJoiValidationError = require("../utils/ConvertJoiValidationError");
const {InvalidResponseError} = require("web3")
exports.createDigitalAsset = async (req, res) => {
    let newAsset;
    try {
        newAsset = await DigitalAssetService.createDigitalAsset(req.body.name,req.body.description,req.body.category,req.body.price,req.user.id,req.fileName)
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({
                status: "fail",
                message: convertJoiValidationError(error),
            });
        } else  if (error instanceof  InvalidResponseError) {
            return res.status(500).json({
                status: "fail",
                message: "Web3.js " + error.message,
            });
        }
        else {
            return res.status(500).json({
                status: "error",
                message: error,
            });
        }
    }
    return res.status(200).json({
        status: "success",
        data: {
            digital_asset: newAsset
        },
    });

};

exports.getAllDigitalAssets = async (req, res) => {
    let assets;
    try {
        assets = await DigitalAssetService.findDigitalAssets(req.query);
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({
                status: "fail",
                message: convertJoiValidationError(error),
            });
        } else if (error instanceof  DigitalAssetService.DigitalAssetsNotFoundError) {
            return res.status(404).json({
                status: "fail",
                message: "Digital assets not found",
            });
        } else {
            return res.status(500).json({
                status: "error",
                message: error,
            });
        }
    }

    for (let row of assets) {
        if (row.image_name) {
            row.image_name =
                req.protocol + "://" + req.get("host") + "/" + row.image_name;
        }
    }

    return res.status(200).json({
        status: "success",
        data: {
            digital_assets: assets
        },
    });
};

exports.getOneDigitalAsset = async (req, res) => {
    let asset;
    try {
        asset = await DigitalAssetService.findDigitalAssetById(req.params.id);
    } catch (error) {
        if (error instanceof DigitalAssetService.DigitalAssetsNotFoundError) {
            return res.status(404).json({
                status: "fail",
                message: "Cannot find the digital asset",
            });
        } else {
            return res.status(500).json({
                status: "error",
                message: error
            });
        }
    }

    if (asset.image_name) {
        asset.image_name =
            req.protocol + "://" + req.get("host") + "/" + asset.image_name;
    }

    return res.status(200).json({
        status: "success",
        data: {
            digital_asset: asset,
        },
    });
};

exports.purchaseDigitalAsset = async (req, res) => {
    try {
        await DigitalAssetService.purchaseDigitalAsset(req.user.id,req.params.id)
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({
                status: "fail",
                message: convertJoiValidationError(error),
            });
        } else if (error instanceof DigitalAssetService.DigitalAssetsNotFoundError) {
            return res.status(404).json({
                status: "fail",
                message: "Cannot find the digital asset",
            });
        } else if (error instanceof UserService.InvalidCredentialsError) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid credentials",
            });
        } else if (error instanceof  DigitalAssetService.DigitalAssetNotAvailableError) {
            return res.status(400).json({
                status: "fail",
                message: "Digital Asset not available",
            });
        } else if (error instanceof  DigitalAssetService.DigitalAssetIsOwnedByUserError) {
            return res.status(400).json({
                status: "fail",
                message: "You already own the digital asset",
            });
        } else {
            return res.status(500).json({
                status: "error",
                message: error
            });
        }
    }
    return res.status(200).json({
        status: "success"
    });
};
