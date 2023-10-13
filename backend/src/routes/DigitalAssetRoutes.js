const express = require("express");
const digitalAssetController = require("./../controllers/DigitalAssetController");
const JwtMiddleware = require("./../middlewares/JwtMiddleware");
const multerMiddleware = require("./../middlewares/MulterMiddleware");

const router = express.Router();

router.route("/")
    .get(digitalAssetController.getAllDigitalAssets)
    .post(JwtMiddleware.authenticateToken,multerMiddleware,digitalAssetController.createDigitalAsset);

router.route("/:id")
    .get(digitalAssetController.getOneDigitalAsset)

router.route("/:id/purchase")
    .post(JwtMiddleware.authenticateToken,digitalAssetController.purchaseDigitalAsset)

module.exports = router;