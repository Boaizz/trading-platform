const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const path = require("path");
const checkFileType = require("../utils/FileTypeCheck");

const storageEngine = multer.diskStorage({
    destination: "./upload",
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}--${uuidv4()}`+path.extname(file.originalname);
        req.fileName = fileName;
        cb(null, fileName);
    },
});



const upload = multer({
    storage: storageEngine,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    },
}).single("image");


module.exports = (req, res, next) => {

    upload(req, res, function (err) {
        if (err) {
            res.status(400).json({
                status: "fail",
                message: err
            })
        } else {
            next();
        }

    })
}