const mysql = require('mysql2/promise');
let debugMode = false;

//Conexão com o banco 
const conn = mysql.createPool({
  host: 'localhost', 
  user: 'root', 
  database: '3dnibo',
  password: '131020'
})

function DatabaseControl(){

  async function insert(product){
    if (product.name != null){
      try{
        await conn.query('INSERT INTO `catalogo` (name, imgSrc, price, description)  VALUES (?, ?, ?, ?)',
           [product.name, product.imgSrc, product.price, product.desc])           
        
           
        if (debugMode == true){
          console.log("insert method called!")
          console.log("The item has been sucessfully added, with the following attributes:")
          for(let x in product){
            console.log(`${x}: ${product[x]}`)
          }
        }
      }

      catch(err){
        console.log("Error while inserting into database:", err)
      }
    }

    else{
      if (debugMode == true){
        console.log("product is empty! Not inserting into database.")
      }
      } 
  }
  

  async function read(){
    let items = []

    try{
      items = await conn.query('SELECT * FROM catalogo') 
      items = items[0] //para eliminar a descrição da table

      if (debugMode == true){
        console.log("read method called!")
        console.log("items:");
        console.log(items);
        console.log("length " + items.length);
      }
    }

    catch(err){
      console.log("Error while reading database: ", err)
    }

    return items;
  }


  async function update(product){
    try{
      await conn.query("UPDATE `catalogo` SET " +
        "name = ?, " +
        "imgSrc = ?, " +
        "description = ?, " +
        "price = ? " + 
        "WHERE id = ? ", [product.name, product.imgSrc, product.description, product.price, product.id]
      )

    }
    catch(err){
      console.error(err);
    }
  }
      

  return {
    insert,
    read,
    update
  }
}
const db = DatabaseControl()
//exporta a conexão
module.exports = db


