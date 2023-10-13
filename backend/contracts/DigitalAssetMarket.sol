// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract DigitalAssetMarket {
    address public manager;

    struct DigitalAsset {
        uint256 ownerId;
        string name;
        string description;
        uint256 price;
        string category;
        bool isAvailable;
    }


    struct UserInfo {
        string name;
        string email;
        address payable wallet;
        uint256[] ownedAssetIds;

    }

    struct Transaction {
        uint256 assetId;
        uint256 buyerId;
        uint256 sellerId;
        uint256 purchaseTime;
    }



    mapping(uint256 => DigitalAsset) public digitalAssets;
    mapping(uint256 => UserInfo) public users;
    mapping(address => uint256) public userWallets;
    mapping(uint256 => Transaction[]) public transactionHistory;

    error Unauthorized();
    error InsufficientFunds();
    error NotAvailable();

    modifier onlyManager {
        if (msg.sender != manager) {
            revert Unauthorized();
        }
        _;
    }

    constructor() {
        manager = msg.sender;

    }

    function createDigitalAsset(
        uint256 assetId,
        uint256 ownerId,
        string memory name,
        string memory description,
        uint256 price,
        string memory category
    ) public onlyManager {
        digitalAssets[assetId] = DigitalAsset(ownerId,name, description, price, category, true);
        users[ownerId].ownedAssetIds.push(assetId);
    }


    function createUser(
        uint256 userId,
        string memory name,
        string memory email,
        address payable wallet
    ) public onlyManager {
        users[userId] = UserInfo(name,email,wallet, new uint256[](0));
        userWallets[wallet] = userId;
    }


    function purchaseDigitalAsset(uint256 assetId) public payable {
        if (!digitalAssets[assetId].isAvailable) {
            revert NotAvailable();
        }
        if (msg.value < digitalAssets[assetId].price) {
            revert InsufficientFunds();
        }

        uint buyerId = userWallets[msg.sender];
        uint previousOwnerId = digitalAssets[assetId].ownerId;
        // forward money to asset's owner
        users[previousOwnerId].wallet.transfer(msg.value);
        // remove the asset from the owner's asset list
        removeValueFromArray(users[previousOwnerId].ownedAssetIds,assetId);
        // transfer the ownership to the buyer
        digitalAssets[assetId].ownerId = buyerId;
        // add the asset to the buyer's asset list
        users[buyerId].ownedAssetIds.push(assetId);

        digitalAssets[assetId].isAvailable = false;
        // add a new transaction to history

        Transaction memory transaction = Transaction(assetId,buyerId,previousOwnerId,block.timestamp);
        transactionHistory[buyerId].push(transaction);
        transactionHistory[previousOwnerId].push(transaction);
    }


    function getUserAsset(uint256 userId) public view returns (uint256[] memory)  {
        return users[userId].ownedAssetIds;
    }

    function getUserTransactionHistory(uint256 userId) public view returns (Transaction[] memory)  {
        return transactionHistory[userId];
    }

    function changeAvailability(uint256 assetId, bool value) public {
        if (userWallets[msg.sender] != digitalAssets[assetId].ownerId) {
            revert Unauthorized();
        }

        digitalAssets[assetId].isAvailable = value;
    }

    function removeValueFromArray(uint256[] storage arr, uint256 value) private {
        for (uint256 i = 0; i < arr.length; i++) {
            if (arr[i] == value) {
                if (i != arr.length - 1) {
                    arr[i] = arr[arr.length - 1];
                }
                arr.pop();
                break;
            }
        }
    }



}