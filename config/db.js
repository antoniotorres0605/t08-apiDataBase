let {db} = require("./index");

let mysql = require('knex')({
  client: 'mysql',
  connection: {
    ...db
  },
  pool: { min: 0, max: 7 }
});


class Database{
  static client;
  constructor(){
    if(Database.client){
      return Database.client;
    }
    Database.client = mysql;
    this.client = Database.client;
  }
}

module.exports = new Database()