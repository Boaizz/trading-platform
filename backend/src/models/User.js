const db = require("./DB");
const Joi = require("joi");
const web3 = require("./../smart-contracts/Web3Instance");
const DigitalAssetMarketContract = require("./../smart-contracts/SmartContract");
class User {
    constructor(first_name,last_name,email,password,private_key,wallet_address) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.email = email;
        this.password = password;
        this.private_key = private_key;
        this.wallet_address = wallet_address;
    }
    static userValidationSchema() {
        return Joi.object({
            first_name: Joi.string().min(1).max(255).truncate().alphanum().required(),
            last_name:Joi.string().min(1).max(255).truncate().alphanum().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(8).required(),
            private_key: Joi.string().required(),
            wallet_address: Joi.string().required()
        });
    }


    static async createUser(user) {
        return new Promise(async (resolve,reject) => {
            let newUser = {...user};
            try {
                await User.userValidationSchema().validateAsync(newUser);
            } catch (error) {
                return reject(error);
            }

            db.query("INSERT INTO Users SET ?", newUser,
                (err, res) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    console.log(newUser)
                    newUser.password = undefined; // remove password from the returned message
                    newUser.private_key = undefined; // remove private key from the returned message
                    return resolve({ user_id: res.insertId, ...newUser });
            })
        })
    }





    static findUserByEmail(email) {
        return new Promise((resolve,reject) => {
            db.query(`SELECT user_id,first_name,last_name,email,password FROM Users WHERE email='${email}'`, (err,res) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                resolve(res);
            })
        })
    }


    static findUserById(id) {
        return new Promise((resolve,reject) => {
            db.query(`SELECT CONCAT(first_name,' ',last_name) as user_name,user_id,email,wallet_address,private_key FROM Users WHERE user_id='${id}'`, (err,res) => {
                if (err) {
                    console.log(err);
                    return reject(err);
                }
                return resolve(res);
            })
        })

    }


}

module.exports = User;