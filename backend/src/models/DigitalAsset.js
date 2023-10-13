const Joi = require("joi").extend(require("@joi/date"));
const db = require("./DB");

class DigitalAsset {
    constructor(
        name,
        description,
        category,
        price,
        owner_id,
        image_name = null,
    ) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = price;
        this.owner_id = owner_id;
        this.image_name = image_name;
    }

    static getValidationSchema() {
        return Joi.object({
            name: Joi.string().min(1).max(255).truncate().trim().required(),
            description: Joi.string()
                .min(1)
                .max(255)
                .truncate()
                .trim()
                .required(),
            category: Joi.string().min(1).max(50).truncate().trim().required(),
            price: Joi.number()
                .precision(2)
                .sign("positive")
                .less(1000000)
                .required(),
            owner_id: Joi.number().sign("positive").required(),
            image_name: Joi.string().allow(null)
        });
    }

    static createDigitalAsset(digitalAsset) {
        return new Promise(async (resolve, reject) => {
            try {
                await DigitalAsset.getValidationSchema().validateAsync(
                    digitalAsset,
                );
            } catch (validationError) {
                return reject(validationError);
            }
            console.log(digitalAsset);
            db.query(
                "INSERT INTO DigitalAssets SET ?",
                digitalAsset,
                (err, res) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    return resolve({ asset_id: res.insertId, ...digitalAsset });
                },
            );
        });
    }

    static getAllDigitalAssets(query) {
        // TODO: sanitise input

        return new Promise(async (resolve, reject) => {
            let filter = [];
            if (query.name !== undefined) {
                filter.push(`name LIKE '%${query.name}%'`);
            }
            if (query.min !== undefined) {
                filter.push(`price >= ${query.min}`);
            }
            if (query.max !== undefined) {
                filter.push(`price <= ${query.max}`);
            }
            if (query.start !== undefined) {
                filter.push(`creation_date >= '${query.start}'`);
            }
            if (query.end !== undefined) {
                filter.push(`creation_date <= '${query.end}'`);
            }
            if (query.category !== undefined) {
                filter.push(`category LIKE '%${query.category}%'`);
            }
            if (query.owner_id !== undefined) {
                filter.push(`owner_id = ${query.owner_id}`);
            }

            if (query.availability !== undefined) {
                filter.push(`is_available = ${query.availability}`)
            }

            let querySQL = filter.length === 0 ? "" : "WHERE " + filter.join(" AND ");

            console.log(querySQL);

            db.query(
                `Select asset_id,name,price,description,category,owner_id,CONCAT(first_name,' ',last_name) as owner_name, creation_date,image_name, is_available 
                FROM DigitalAssets 
                INNER JOIN
                Users ON DigitalAssets.owner_id = Users.user_id
                ${querySQL}
                `,
                (queryError, res) => {
                    if (queryError) {
                        console.log(queryError);
                        return reject(queryError);
                    }

                    return resolve(res);
                },
            );
        });
    }

    static findDigitalAssetById(digitalAssetId) {
        return new Promise((resolve, reject) => {
            db.query(
                `Select asset_id,name,price,description,category,owner_id,CONCAT(first_name,' ',last_name) as owner_name, creation_date, image_name, is_available 
                FROM DigitalAssets 
                INNER JOIN
                    Users ON DigitalAssets.owner_id = Users.user_id
                WHERE asset_id='${digitalAssetId}'`,
                (err, res) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    for (const row of res) {
                        row.is_available = Boolean(Number(row.is_available));
                    }
                    return resolve(res);
                },
            );
        });
    }
    static updateOwnership(digitalAssetId, newOwnerId) {
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE DigitalAssets SET is_available = 0, owner_id = ? WHERE asset_id = ?",
                [newOwnerId, digitalAssetId],
                (err, res) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }
                    return resolve(res);
                },
            );
        });
    }
}

module.exports = DigitalAsset;
