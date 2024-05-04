require("dotenv").config();

const express =require("express");
const mongoose=require('mongoose')
const cors =require('cors')

const connectDb = require('./db/connect')

const products_routes = require('./routes/products');


const app=express();
app.use(express.json());
app.use(cors());



// mongoose.connect("mongodb://127.0.0.1:27017/employee");

const PORT = process.env.PORT || 5000;
app.get('/',(req,res)=>{
    res.send("this is the home route");
})

//middleware or to set routes

app.use("/api/products",products_routes);


const start = async () => {
    try {
        
         await connectDb(process.env.MONGODB_URL);
        app.listen(PORT,()=>{
            console.log("the server is started on port number "+ `${PORT}`)
        })
    } catch (error) {
     console.log(error);   
    }
}
start();