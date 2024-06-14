const express = require('express');
const deployRouter = require('./routes/deploy');
const contractRouter = require('./routes/contract');
const connectDB = require('./db');
require('dotenv').config();
const cors = require('cors');

const app = express();
app.use(cors());

connectDB();

app.use(express.json());

app.use('/deploy', deployRouter);
app.use('/contract', contractRouter);

app.listen(8000, ()=>{
    console.log('Server is running on port 8000');
});