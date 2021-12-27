//@Autor: Antonio Torres
//@Fecha: 27/12/2021


//Dependencias
const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("./config");
let path = require("path");

// Rutas
let {Router} = express;
let router = new Router();
//let id = new Router();

//Base de datos
const db_obj= require("./config/db");
const db = db_obj.client;

// Puerto
const PORT = config.port;

// Clases
let Contenedor = require("./contenedorDB");
let c1 = new Contenedor('items',db);

// Middlewares
app.use(cors(config.cors));


// Settings
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//Dirección de las rutas

// RUTA localhost/api
router.get("/:id?",(req,res,next)=>{
  let id = (req.params.id);
  if(id == undefined){
    c1.getAll().then(data=>{
      //res.render("historial1",{data});
      res.send(data);
    }).catch(error=>{
      res.send(error);
    });
  }
  else{
    c1.getById(id).then(datos=>{
      let data = [];
      data.push(datos);
      //res.render("historial1",{data});
      res.send(datos);
    }).catch(error=>{
      res.send(error);
    });
  }
});

app.use("/api/productos",router);

//Ruta raiz
app.get("/", (req,res,next) => {
  res.send("<h1>Pagina de Inicio<br></h1>");
});

//Ruta 
app.listen(PORT,()=>{
  console.log(`Conexión hecha en http://localhost:${PORT}`);
});