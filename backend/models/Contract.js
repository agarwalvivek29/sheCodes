const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const ContractSchema = new Schema({
    address : {
        type: String,
        required: true
    },
});

const Contract = mongoose.model('Contract', ContractSchema);

module.exports = Contract;