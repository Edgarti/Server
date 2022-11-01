const { application } = require('express');
const express = require('express');
const app = express();
const PORT =8080

app.listen(PORT , ()=>{
    console.log(`Serviro arriba puerto: ${PORT}`)
})
app.use(express.json())
app.use(express.urlencoded({ esxtend : true}))
app.use(express.static('public'))

const routerProductos = express.Router()

const productos =[];



// postman  localhost:8080/producto
routerProductos.get("/",(req,res)=>{
 res.json({productos})
})
// postman  localhost:8080/producto  en body colocar el objeto a subir
routerProductos.post("/",(req,res)=>{
   let prod = req.body;
   let id = productos.length+1
   prod.id = id;
    console.log(req.body)
    productos.push(prod);
    console.log(productos);
    res.json({
        msg : 'Se agrego la producto',
        Id : id
       })
   })

   // postman  localhost:8080/producto/2
   routerProductos.get("/:id",(req,res)=>{
    let indice = req.params.id;
    let prodFilter = productos.filter(p => p.id ==indice)

    if((prodFilter == undefined) || prodFilter.length == 0 ){
        res.json({
         error: 'Producto no encontrado'
        })
       }else{
        res.json({prodFilter})
       }
   })

   // postman  localhost:8080/producto/2
   routerProductos.delete("/:id",(req,res)=>{
    let indice = req.params.id ;
    let prodFilter = productos.filter(p => p.id !=indice)
    if((prodFilter == undefined) || prodFilter.length == 0 ){
        res.json({
         error: 'Producto no encontrado'
        })
       }else{
        res.json({prodFilter})
       }
   })

 // postman  localhost:8080/producto enviar informacion en body
 routerProductos.put("/",(req,res)=>{
    if(!req.body.title || !req.body.price || !req.body.id) {

        res.json({
         error: true,
         codigo: 502,
         mensaje: 'El campo title, price y id son requeridos'
        });
       } else {
            if(req.body.title === '' || req.body.price === '' || req.body.id=== '') {
                res.json({
                    error: true,
                    codigo: 501,
                    mensaje: 'Hay campos vacios'
            });
            } else {
                let num = parseInt(req.body.id) - 1
                productos[num].title = req.body.title;
                productos[num].price = req.body.price;
            };
            res.json({
            mensaje: 'Producto actualizado',
            });
        }
    })

app.use("/producto",routerProductos)
// app.use(express.static('public'))

