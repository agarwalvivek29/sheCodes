const express = require('express');
const router = express.Router();
const { Web3 } = require('web3');
require('dotenv').config();
const ContractData = require('../contracts/OneTimeSaleToken.json');
const Contract = require('../models/Contract');
const { saveContract } = require('../dbops');

const provider = process.env.INFURA_ENDPOINT;
const privateKey = process.env.METAMASK_PVT_KEY;

console.log('provider:', provider);
console.log('privateKey:', privateKey);

const web3 = new Web3(provider);

const abi = ContractData.abi;
const bytecode = ContractData.bytecode;

router.post('/tokenContract',async (req,res)=>{

    const { name, symbol, initialSupply, salePrice, metaData , payoutAddress } = req.body;

    if(!name || !symbol || !initialSupply || !salePrice || !metaData || !payoutAddress){
        res.status(403).send({
            success : false,
            message : "Parameters not sent properly"
        })
    }

    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    web3.eth.accounts.wallet.add(account);
    web3.eth.defaultAccount = account.address;

    const Contract = new web3.eth.Contract(abi);
    const deployTx = Contract.deploy({
      data: bytecode,
      arguments : [ name, symbol, initialSupply, salePrice, metaData, payoutAddress ]
    }); 

    if(!req.body){
        return res.status(400).send('Request body is missing');
    }

    try{
        const gas = await deployTx.estimateGas({ from: account.address });
        console.log('gas:', gas);   
        const gasPrice = await web3.eth.getGasPrice();
        console.log('gasPrice:', gasPrice);

        const deployOptions = {
            from: account.address,
            data: deployTx.encodeABI(),
            gas,
            gasPrice,
        };

        console.log('deployOptions:', deployOptions);

        const signedTx = await web3.eth.accounts.signTransaction(deployOptions, privateKey);
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

        console.log('receipt:', receipt);

        const savedContract = await saveContract({ contractId : receipt.contractAddress });

        res.status(200).send({
            success : true,
            message : 'Contract deployed successfully',
            address : receipt.contractAddress
        });
    }
    catch(err){
        console.log('error:', err);
        res.status(500).send({
            success : false,
            message : err
        });
    }
});


module.exports = router;