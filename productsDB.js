const connectDB = require('./db/connect');
const Product = require('./model/products');
require('dotenv').config();
const ProductJSON = require('./products.json');

const start = async()=>{
    try{
        await connectDB(process.env.MONGODB_URL);
        await Product.create(ProductJSON);
        // await Product.deleteMany();
        console.log('success');
    } catch(error){
        console.log(error);
    }
}

start()