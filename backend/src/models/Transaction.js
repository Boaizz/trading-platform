const db = require("./DB");
const Joi = require("joi");
class Transaction {
    constructor(transaction_hash,buyer_id,seller_id,asset_id) {
        this.transaction_hash = transaction_hash;
        this.buyer_id = buyer_id;
        this.seller_id = seller_id;
        this.asset_id = asset_id;
    }

    static getValidationSchema = () => Joi.object({
        transaction_hash: Joi.string().required(),
        buyer_id: Joi.number().sign("positive").required(),
        seller_id: Joi.number().sign("positive").required(),
        asset_id: Joi.number().sign("positive").required(),
    })

    static createTransaction(transaction, callback) {
        return new Promise(async (resolve,reject) => {
            let newTransaction = {...transaction};
            try {
                await Transaction.getValidationSchema().validateAsync(newTransaction);
            } catch (error) {
                return reject(error);
            }

            db.query("INSERT INTO Transactions SET ?", newTransaction,
                async (err, res) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    return resolve({ id: res.insertId, ...newTransaction });
            })
        })

    }

    static getAllTransactions(user_id,callback) {
        return new Promise((resolve,reject) => {
            db.query(`SELECT
                    t.transaction_hash,
                    CONCAT(b.first_name,' ',b.last_name) AS buyer_name,
                    CONCAT(s.first_name,' ',s.last_name) AS seller_name,
                    a.name AS asset_name,
                    a.price AS asset_price,
                    t.purchase_date
                FROM
                    Transactions t
                INNER JOIN
                    DigitalAssets a ON t.asset_id = a.asset_id
                INNER JOIN
                    Users s ON t.seller_id = s.user_id
                INNER JOIN
                    Users b ON t.buyer_id = b.user_id
                WHERE
                    b.user_id = ${user_id}
                OR 
                    s.user_id = ${user_id}`,
                (err, res) => {
                    if (err) {
                        console.log(err);
                        return reject(null);
                    }
                    return resolve(res);
                })
        })
    }



}

module.exports = Transaction;