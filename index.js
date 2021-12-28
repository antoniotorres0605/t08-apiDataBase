//@Autor: Antonio Torres
//@Fecha: 27/12/2021


//Dependencias
const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("./config");
let path = require("path");
let Socket = require("./utils/sockets");

// Rutas
let {Router} = express;
let router = new Router();
//let id = new Router();

// Websockets
let {Server: HttpServer} = require("http");
let httpServer = new HttpServer(app);
let socket = new Socket(httpServer);
socket.init();

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

app.set("views",path.join(__dirname,"views","ejs"));
app.set("view engine", "ejs");

//Dirección de las rutas

// RUTA localhost/api (GET)
router.get("/:id?",(req,res,next)=>{
  let id = (req.params.id);
  if(id == undefined){
    c1.getAll().then(data=>{
      res.render("index",{data});
      //res.send(data);
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

router.post("/",(req,res,next)=>{
  console.log(req.body.producto);
  c1.save(req.body.producto).then(data=>{
    console.log(data);
    res.json(data);
  }).catch(error=>{
    res.send(error);
  });
});

app.use("/api/productos",router);

//Ruta raiz
app.get("/", (req,res,next) => {
  res.send("<h1>Pagina de Inicio<br></h1>");
});

//Ruta 
httpServer.listen(PORT,()=>{
  console.log(`Conexión hecha en http://localhost:${PORT}`);
});