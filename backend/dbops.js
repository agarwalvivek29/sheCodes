const Contract = require("./models/Contract");
const MetaData = require("./models/MetaData");

async function saveContract({ contractId }){
    try{
        const contract = new Contract({ contractId });
        await contract.save();
        return contract;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

async function uploadContractMetaData({ name, symbol, initialSupply, salePrice, payoutAddress }){
    try{
        const metaData = new MetaData({
            name,
            symbol,
            initialSupply,
            salePrice,
            payoutAddress
        });
        await metaData();
        return metaData;
    }
    catch(e){
        return null;
    }
}

module.exports = { saveContract, uploadContractMetaData };