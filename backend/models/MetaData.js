const mongoose = require('mongoose');

const metaDataSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    symbol : {
        type : String,
        required : true
    },
    initialSupply : {
        type : Number,
        required : true
    },
    salePrice : {
        type : Number,
        required : true
    },
    payoutAddress : {
        type : String,
        required : true
    }
});

const MetaData = mongoose.model('MetaData',metaDataSchema);

module.exports = MetaData;
