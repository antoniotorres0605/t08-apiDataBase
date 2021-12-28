//@Autor: Antonio Torres
//@Fecha: 10/11/2021

let fs = require("fs");
let path = require("path");


class Contenedor{
  constructor(database,db){
    this.database = database;
    this.db = db;
  }
  async save(product){
    try {
      //Inserción a la base de datos
      let response = await this.db.from(this.database).insert(product);
      let r;
      await this.db.from(this.database).select('id').then((rows)=>{
        for(let row in rows){
          r = row;
        }
      });
      return(r);
    } catch (error) {
      console.log(error)
    }
  }

  async getAll(){
    try {   
      let arr = [];
      //Funcion de select para la base de datos
      await this.db.from(this.database).then((rows)=>{        
        for (let row of rows){
          let data = {
            id: row['id'],
            title: row['title'],
            price: row['price'],
            thumbnail: row['thumbnail']
          }
          arr.push(data);
        }
        
      });
      return(arr);
    }
    catch (error) {
        console.log('No se pudo leer el archivo',error);
    }
  }

  async getById(id){
    try {   
      let arr = [];
      //Funcion de select para la base de datos con where
      await this.db.from(this.database).where('id','=',id)
      .then((rows)=>{
        for ( let row of rows){
          let data = {
            id: row['id'],
            title: row['title'],
            price: row['price'],
            thumbnail: row['thumbnail']
          }
          arr.push(data);
        }
        
      });
      return(arr);
    }
    catch (error) {
        console.log('No se pudo leer el archivo',error);
    }
  }
}

module.exports = Contenedor;