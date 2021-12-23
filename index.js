const express = require("express");
const app = express();
const cors = require("cors");
const { config } = require("./config");
let path = require("path");

// Rutas
let {Router} = express;
let router = new Router();
let id = new Router();


// Clases

let Contenedor = require("./contenedor");
let c1 = new Contenedor('./productos.txt');

// Puerto
const PORT = config.port;

const db_obj= require("./config/db");
const db = db_obj.client;



// Middlewares
app.use(cors(config.cors));


// Settings
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* 
router.get("/",(req,res,next)=>{
  c1.getAll().then(data=>{
    res.send(data);
  }).catch(error=>{
    res.send(error);
  })
});



id.get("/:id",(req,res,next)=>{
  console.log("Entre al get")
  let id = (req.params.id);
  console.log(id)
  c1.getById(id).then(data=>{
    console.log(data);
    res.json(data);
  }).catch(error=>{
    res.send(error);
  });
});

router.post("/",(req,res,next)=>{
  console.log(req.body.producto);
  c1.save(req.body.producto).then(data=>{
    console.log(data);
    res.json(data);
  }).catch(error=>{
    res.send(error);
  })
});

*/


// CREACION DE TABLA
(async ()=>{
  try {
    await db.schema.createTable("articulos", table=>{
      table.increments("id").primary(),
      table.string("nombre"),
      table.string("codigo"),
      table.float("precio"),
      table.integer("stock")
    })
  } catch (error) {
    console.log(error)
    
  }
});

// INSERTAR EN TABLA
(async ()=>{
  try {
    let data = [
      {
        nombre:"Televisor",
        codigo:"cd123",
        precio:"12.5",
        stock:10
      }
    ];
    let response = await db.from("articulos").insert(data);
    console.log(response);
  } catch (error) {
    console.log(error)
    
  }
});

// MOSTRAR EN TABLA
(async ()=>{
  try {
    let response = await db.from("articulos");
    console.log(response);
  } catch (error) {
    console.log(error)
    
  }
});

// ELIMINAR EN TABLA
(async ()=>{
  try {
    let response = await db.from("articulos").where("id","=",2).del();
    console.log(response);
  } catch (error) {
    console.log(error)
    
  }
});

// ACTUALIZAR DATOS
(async ()=>{
  try {
    let response = await db.from("articulos").where("id","=",1).update({stock:100});
    console.log(response);
  } catch (error) {
    console.log(error)
    
  }
})();



app.use("/api/productos",router);
app.use("/api/productos",id);
app.use("/api",express.static(path.join(__dirname,"public","html")));

app.get("/", (req,res,next) => {
  res.send("<h1>Pagina de Inicio<br></h1>");
});

app.listen(PORT,()=>{
  console.log(`Conexión hecha en http://localhost:${PORT}`);
});