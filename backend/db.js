const mongoose = require('mongoose');

const mongoDbURI = process.env.MONGO_URI;
console.log('mongoDbURI:', mongoDbURI);

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(mongoDbURI);    
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;