//arquivo para a edição de itens do catálogo etc

//importação da conexão da database
const conn = require("./db");

conn.query(
    'INSERT INTO `catalogo` (name, description imgSrc, infillPreset, colorPreset)  VALUES () '
  )
