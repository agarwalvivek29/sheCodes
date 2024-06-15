const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');
const { Web3 } = require('web3');
const OneTimeSaleToken = require('../contracts/OneTimeSaleToken.json');
require('dotenv').config();

const infuraLink = process.env.INFURA_ENDPOINT;

router.get('/getAll', async (req,res)=>{
    try{
        const contracts = await Contract.find();
        const web3 = new Web3(new Web3.providers.HttpProvider(infuraLink));

        let populatedContractData = [];

        for(let i=0; i<contracts.length; i++){
            const contract = contracts[i];
            const contractAddress = contract.address;
            console.log(contract.address);
            const contractInstance = new web3.eth.Contract(OneTimeSaleToken.abi,contractAddress);
            const name = await contractInstance.methods.name().call();
            const symbol = await contractInstance.methods.symbol().call();
            const initialSupply = await contractInstance.methods.totalSupply().call();
            const salePrice = await contractInstance.methods.salePrice().call();
            const metaData = await contractInstance.methods.metaData().call();
            const payoutAddress = await contractInstance.methods.payoutAddress().call();
            const availableTokens = await contractInstance.methods.getUnsoldTokens().call();
            
            const ethSalePrice = web3.utils.fromWei(salePrice, 'ether');

            const contractData = {
                address: contractAddress,
                name,
                symbol,
                initialSupply : initialSupply.toString(),
                salePrice : ethSalePrice,
                metaData,
                payoutAddress,
                availableTokens : availableTokens.toString(),
                _id : contract._id,
                weiSalePrice : salePrice.toString()
            }
            populatedContractData.push(contractData);
        }

        res.status(200).send({
            success : true,
            contracts : populatedContractData
        });
    }
    catch(err){
        res.status(500).send({
            success : false,
            message : err.message
        });
    }    
});

module.exports = router;