//config do node, express, handlebars e bodyparser
//express
const express = require("express");
const app = express();
let debugMode = false;

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
    console.warn('Debug Mode: ', + debugMode)
})


//configuração da database
const db = require("./db")



//configuração de rotas

//index
app.get("/inicial", function(req, res){
    res.render("index");
})


app.post("/admin", async function(req, res){

    async function renderAdmin(){
        let items = await db.Read();
        res.render("admin", {itemsHandle: items});
    }

    let product = {}
    dbAction = req.body.dbAction;


    if(dbAction === "add"){
        product.name = req.body.productName;
        product.imgSrc = req.body.productImgSrc;
        product.price = req.body.productPrice;
        product.desc = req.body.productDescription;

        await db.Insert(product);

        product = {};

        renderAdmin();
    }

    else if(dbAction === "update"){
        product = {};

        id = req.body.productId;

        product.name = req.body.editName === '' ? req.body.defaultName : req.body.editName;
        product.imgSrc = req.body.editImage === '' ? req.body.defaultImage : req.body.editImage;
        product.description = req.body.editDescription === '' ? req.body.defaultDescription : req.body.editDescription;
        product.price = req.body.editPrice === '' ? req.body.defaultPrice : req.body.editPrice;
        product.id = id;
        await db.Update(product);
           if (debugMode == true){
                console.log('product:');
                console.log(product);
                renderAdmin();
            }

    }

    else if(dbAction === "delete"){
        product = {};
        product.id =req.body.productId;
        await db.Delete(product);
        if (debugMode == true){
            console.log("Deleting item with id: " + product.id);
        }
         
        renderAdmin();
    }

    else{
        if (debugMode == true){
            console.error('Unknown database action: ', dbAction);
        }

        renderAdmin();
    }
    
})

//redirects ----------------------------------------------------------------------------------------------------------------------



app.post("/adminShowAll", function(req, res){

})

//-----------------------------------------------------------------------------

app.post("/addProduct", function(req, res){

    res.render("admin", {items});
})
