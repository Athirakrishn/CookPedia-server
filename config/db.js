const mongoose = require('mongoose')

const connectionString = process.env.DBCONNECTION

mongoose.connect(connectionString).then(res=>{
    console.log("Cookpedia Database connection successfull....");
}).catch(err=>{
    console.log("DB Connection failed!!!");
    console.log(err);    
})