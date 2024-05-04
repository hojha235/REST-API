require('dotenv').config();
const connectDb= require('./db/connect');
const Product = require('./models/model');

const ProductJson = require('./products.json');
const start = async () =>{
    try {
        await connectDb(process.env.MONGODB_URL);
        await Product.create(ProductJson);
        console.log("success");
    }
        catch(error){
            console.log(error);
        }
}
start();