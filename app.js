const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const products_router = require('./routes/products');
const connectDB = require('./db/connect');
const dotenv = require('dotenv');

dotenv.config();

app.get('/',(req,res)=>{
    res.send('Hi, I am Live');
});

//middleware to set router
app.use('/api/products', products_router);


const start = async() => {
    try{
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`${PORT}, Hello World`)
        })
    } catch(error){
        console.log('error1', error)
    }
}

start();