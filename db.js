const mysql = require('mysql2/promise');


//Conexão com o banco 
const conn = mysql.createPool({
  host: "localhost", 
  user: "root", 
  database: "3dnibo",
  password: "131020"
})

function DatabaseControl(){

  async function insert(product){
    console.log("insert method called!")
    if (product.name != null){
      try{
        await conn.query('INSERT INTO `catalogo` (name, imgSrc, infillPreset, colorPreset, description)  VALUES (?, ?, ?, ?, ?)', [product.name, product.imgSrc, product.infill, product.color, product.desc])           
        
        console.log("The item has been sucessfully added, with the following attributes:")
        for(let x in product){
          console.log(`${x}: ${product[x]}`)
        }
      }

      catch(err){
        console.log("Error while inserting into database:", err)
      }
    }

    else{
      console.log("product is empty! Not inserting into database.")
    } 
  }
  

  async function read(){
    console.log("read method called!")
    let items = []

    try{
      items = await conn.query('SELECT * FROM catalogo') 
      items = items[0] //para eliminar a descrição da table

      console.log("items:");
      console.log(items);
      console.log("length " + items.length);
    }

    catch(err){
      console.log("Error while reading database: ", err)
    }

    return items;
  }
      

  return {
    insert,
    read
  }
}
const db = DatabaseControl()
//exporta a conexão
module.exports = db


