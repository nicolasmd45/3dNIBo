//config do node, express, handlebars e bodyparser
//express
const express = require("express");
const app = express();
let debugMode:boolean = false;

//bodyparser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.json());

//config de porta
const porta:number = 5173;

app.listen(porta, function(){
    console.log("Debug:")
    console.log(`The server is running in the port ${porta}`)
    console.warn('Debug Mode: ', + debugMode);
})

//rotas
app.post("/auth/google", async(req:any, res:any) => {
    res.json({sucess : true});
})
