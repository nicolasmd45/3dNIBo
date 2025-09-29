//config do node, express, handlebars e bodyparser
//express
const express = require("express");
const app = express();


//handlebars
const {engine} = require('express-handlebars');
app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'))


//bodyparser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));


//config de porta
const porta = 3000;

app.listen(porta, function(){
    console.log("Debug:")
    console.log(`The server is running in the port ${porta}`)
})


//configuração da database
const db = require("./db")



//configuração de rotas

//index
app.get("/inicial", function(req, res){
    res.render("index");
})


app.post("/admin", async function(req, res){
    let product = {}
    product.name = req.body.productName;
    product.imgSrc = req.body.productImgSrc;
    product.price = req.body.productPrice;
    product.desc = req.body.productDescription;

    await db.insert(product);
    
    let items = await db.read();

    res.render("admin", {itemsHandle: items});
})

//redirects ----------------------------------------------------------------------------------------------------------------------



app.post("/adminShowAll", function(req, res){

})

//-----------------------------------------------------------------------------

app.post("/addProduct", function(req, res){

    res.render("admin", {items});
})
