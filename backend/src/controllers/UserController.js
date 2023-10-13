const User = require("./../models/User");
const web3 = require("./../smart-contracts/Web3Instance");
const UserService = require("./../services/UserService");
const Joi = require("joi");
const convertJoiValidationError = require("../utils/ConvertJoiValidationError");

exports.getProfile =  async (req, res) => {
    let userProfile;
    try {
        userProfile = await UserService.findProfileById(req.user.id);
    } catch (error) {
        if (error instanceof UserService.UserNotFound) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            })
        } else {
            return res.status(500).json({
                status: "error",
                message: error
            })
        }
    }
    for (let row of userProfile.digital_assets) {
        if (row.image_name) {
            row.image_name =
                req.protocol + "://" + req.get("host") + "/" + row.image_name;
        }
    }
    return res.status(200).json({
        status: "success",
        data : {
            user: userProfile
        }
    })
}

exports.getBalance =  async (req, res) => {
   let balance;
   try {
       balance = await UserService.getBalanceByUserId(req.user.id);
   } catch (error) {
       if (error instanceof UserService.UserNotFound) {
           return res.status(404).json({
               status: "fail",
               message: "User not found"
           })
       } else {
           return res.status(500).json({
               status: "error",
               message: error
           })
       }
   }

    return res.status(200).json({
        status: "success",
        data : {
            balance
        }
    })
}

exports.depositCoins =  async (req, res) => {
    try {
        await UserService.depositCoinsToUserBalance(req.user.id,req.body);
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({
                status: "fail",
                message: convertJoiValidationError(error),
            });
        } else if (error instanceof UserService.UserNotFound) {
            return res.status(404).json({
                status: "fail",
                message: "User not found"
            })
        } else {
            return res.status(500).json({
                status: "error",
                message: error
            })
        }
    }

    return res.status(200).json({
        status: "success"
    })

}