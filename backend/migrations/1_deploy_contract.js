const DigitalAssetMarket = artifacts.require("DigitalAssetMarket");
const fs = require("fs");
const path = require("path");
const contractDetailsPath = path.resolve(__dirname,"..","src","smart-contracts","ContractDetails.json");
console.log(contractDetailsPath)
module.exports = function(deployer) {
    deployer.deploy(DigitalAssetMarket).then(() => {
        fs.writeFileSync(contractDetailsPath,JSON.stringify({abi: DigitalAssetMarket.abi, address: DigitalAssetMarket.address}));
    });
};