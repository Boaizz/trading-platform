const web3 = require("./Web3Instance");
const fs = require("fs");
const path = require("path");
const details = path.resolve(__dirname, 'ContractDetails.json');

const {abi,address} = JSON.parse(fs.readFileSync(details, 'utf8'));
module.exports = new web3.eth.Contract(abi,address);

