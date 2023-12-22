const express = require("express");
const cors = require("cors");
const dotenv = require ("dotenv");
dotenv.config();
const app = express();
const  mongoose  = require('mongoose');
const PORT = process.env.PORT || 6000;
app.use(cors());
const bodyParser = require('body-parser');
const { rout } = require("./Router");
app.use(bodyParser.json({limit:'50mb'}));

mongoose.set('strictQuery', true)

mongoose.connect(process.env.URI).then(res =>{
   console.log("db connected");
}).catch(err =>{
   console.log( err.message );
})


app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.json());


app.use("/",rout )

app.listen(PORT, ()=>{
    console.log("My server is running on port "+ PORT)
})