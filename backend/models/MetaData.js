const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const metaDataSchema = new Schema({
    image : {
        type : String,
        required : false
    },
    desc : {
        type : String,
        required : true
    },
    treeTypes : [{
        type : String
    }],
    lattitude : {
        type : String,
        required : true
    },
    longitude : {
        type : String,
        required : true
    },
    numberTrees : {
        type : Number,
        required : true
    },
    age : {
        type : Number,
        required : true
    },
    circumference : {
        type : Number,
        required : true
    }
});

const MetaData = mongoose.model('MetaData',metaDataSchema);

module.exports = MetaData;
