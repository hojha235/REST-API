const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');




const connectDb = (uri) => {
    // console.log("connect db");
    return mongoose.connect(uri,{
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });

}

module.exports = connectDb;