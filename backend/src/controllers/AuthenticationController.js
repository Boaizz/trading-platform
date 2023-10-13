const UserService = require("./../services/UserService");
const Joi = require("joi");
const convertJoiValidationError = require("./../utils/ConvertJoiValidationError")
exports.register = async (req,res) => {
    let userData;
    try {
        userData = await UserService.createUser(req.body.first_name,req.body.last_name,req.body.email,req.body.password)
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({
                status: "fail",
                message: convertJoiValidationError(error),
            });
        }

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
                status: "fail",
                message: "An user with the email already exists"
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
            userData
        }
    })
}


exports.login = async (req,res) => {
    let accessToken;
    try {
        accessToken = await UserService.login(req.body.email,req.body.password);
    } catch (error) {
        if (error instanceof Joi.ValidationError) {
            return res.status(400).json({
                status: "fail",
                message: convertJoiValidationError(error),
            });
        }
        else if (error instanceof UserService.InvalidCredentialsError) {
            return res.status(404).json({
                status: "error",
                message: "Invalid credentials"
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
            access_token: accessToken
        }
    })
}