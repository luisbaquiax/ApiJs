import mysql2 from "mysql2";
import express from "express";
import bodyParser from "body-parser";

let database = 'tienda_online';

const connection=mysql2.createConnection({
    host:"localhost",
    database: database,
    user:"root",
    password:"luisbaquiax",
});

const app =express();

app.use(bodyParser.json()); 

connection.connect();

const PORT=5000;

app.listen(PORT,() =>{
    connection.connect((err)=>{
        if(err) throw err;
        console.log("Base de datos conectado: ", database);
    });
});

/*routes*/

app.get("/clientes",(req, res)=>{
    const query="select *from cliente";
    connection.query(query,(err,resultado)=>{
        if(err) throw err;
        res.send(resultado);
    })
});

app.post("/insertar/cliente",(req,res)=>{

    const{
        nit,
        nombre1,
        nombre2,
        apellido1,
        apellido2,
        correo,
        telefono,
        password,
        estado
    }=req.body;

    const query=`INSERT INTO cliente 
    (nit,nombre1,nombre2,apellido1,apellido2,correo,telefono, password, estado) 
    VALUES('${nit}', 
        '${nombre1}', 
        '${nombre2}', 
        '${apellido1}',  
        '${apellido2}',  
        '${correo}', 
        '${telefono}',
        '${password}', 
        '${estado}'
        )`;

    connection.query(query,(err,result)=>{
        if(err)
        {res.status(500).send("Error al insertar datos: "+err);

        }else{
            res.send("Datos insertados correctamente");
        }
    });
});

app.put("/actualizar/cliente/:nit",(req,res)=>{
    const {nit}=req.params;
    const{
        nombre1,
        nombre2,
        apellido1,
        apellido2,
        correo,
        telefono,
        password,
        estado
    }=req.body;
    const query=`UPDATE cliente 
    SET nombre1='${nombre1}', 
        nombre2='${nombre2}', 
        apellido1='${apellido1}', 
        apellido2='${apellido2}', 
        correo='${correo}', 
        telefono='${telefono}', 
        password='${password}', 
        estado='${estado}' 
        WHERE nit=${nit}`;


    connection.query(query,(err,result)=>{
       if(err) {
        res.send(err);
       }else {
        res.send("Datos actualizados correctamente");
       }
    });
});

app.delete("/eliminar/cliente/:nit",(req,res)=>{
    const {nit}=req.params;
    const query=`DELETE FROM cliente WHERE nit=${nit}`;
    connection.query(query,(err,result)=>{
        if(err) {
            res.send(err);
        }else {
            res.send("Cliente eliminado correctamente");
        }
    });
});

/* Rutas para producto */
app.get("/productos", (req, res) => {
    const query = "SELECT * FROM producto";
    connection.query(query, (err, resultado) => {
        if (err) throw err;
        res.send(resultado);
    });
});


app.get("/productos/:id", (req, res) => {
    const { id } = req.params;
    const query = `SELECT * FROM producto WHERE id = ${id}`;
    connection.query(query, (err, resultado) => {
        if (err) throw err;
        res.send(resultado);
    });
});

app.post("/insertar/producto", (req, res) => {
    const { nombre, descripcion, costo, existencias, estado } = req.body;
    const query = `INSERT INTO producto (nombre, descripcion, costo, existencias, estado) 
                   VALUES ('${nombre}', '${descripcion}', '${costo}', '${existencias}', '${estado}')`;
    connection.query(query, (err, result) => {
        if (err) res.status(500).send("Error al insertar producto: " + err);
        else res.send("Producto insertado correctamente");
    });
});

app.put("/actualizar/producto/:id", (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, costo, existencias, estado } = req.body;
    const query = `UPDATE producto 
                   SET nombre='${nombre}', descripcion='${descripcion}', 
                       costo='${costo}', existencias='${existencias}', estado='${estado}' 
                   WHERE id=${id}`;
    connection.query(query, (err, result) => {
        if (err) res.send({ error: err, msg: "No se pudo actualizar el producto" });
        else res.send("Producto actualizado correctamente");
    });
});

app.delete("/eliminar/producto/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM producto WHERE id=${id}`;
    connection.query(query, (err, result) => {
        if (err) res.send(err);
        else res.send("Producto eliminado correctamente");
    });
});

/* Rutas para carrito */
app.get("/carritos", (req, res) => {
    const query = "SELECT * FROM carrito";
    connection.query(query, (err, resultado) => {
        if (err) throw err;
        res.send(resultado);
    });
});

app.get("/carrito/:idCarrito/:nit", (req, res) => {
    const { idCarrito, nit } = req.params;
    const query = `
    SELECT p.nombre, p.descripcion, c.cantidad, c.precio, (c.cantidad * c.precio) as subtotal
    FROM producto p
    INNER JOIN carrito_productos c ON p.id = c.id_producto
    INNER JOIN carrito ca ON ca.id = c.id_carrito
    WHERE ca.nit_cliente = ${nit} AND c.id_carrito = ${idCarrito};
    `;
    connection.query(query, (err, resultado) => {
        if (err) throw err;
        res.send(resultado);
    });
});

app.post("/insertar/carrito", (req, res) => {
    const { fecha, total, nit_cliente, estado } = req.body;
    const query = `INSERT INTO carrito (fecha, total, nit_cliente, estado) 
                   VALUES ('${fecha}', '${total}', '${nit_cliente}', '${estado}')`;
    connection.query(query, (err, result) => {
        if (err) res.status(500).send("Error al insertar carrito: " + err);
        else res.send("Carrito insertado correctamente");
    });
});

app.put("/actualizar/carrito/:id", (req, res) => {
    const { id } = req.params;
    const { fecha, total, nit_cliente, estado } = req.body;
    const query = `UPDATE carrito 
                   SET fecha='${fecha}', total='${total}', nit_cliente='${nit_cliente}', estado='${estado}' 
                   WHERE id=${id}`;
    connection.query(query, (err, result) => {
        if (err) res.send({ error: err, msg: "No se pudo actualizar el carrito" });
        else res.send("Carrito actualizado correctamente");
    });
});

app.delete("/eliminar/carrito/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM carrito WHERE id=${id}`;
    connection.query(query, (err, result) => {
        if (err) res.send(err);
        else res.send("Carrito eliminado correctamente");
    });
});

/* Rutas para carrito_productos */
app.get("/carrito_productos", (req, res) => {
    const query = "SELECT * FROM carrito_productos";
    connection.query(query, (err, resultado) => {
        if (err) throw err;
        res.send(resultado);
    });
});

app.post("/carrito/agregar", (req, res) => {
    const { id_carrito, id_producto, cantidad, precio, estado } = req.body;
    const query = `INSERT INTO carrito_productos (id_carrito, id_producto, cantidad, precio, estado) 
                   VALUES ('${id_carrito}', '${id_producto}', '${cantidad}', '${precio}', '${estado}')`;
    connection.query(query, (err, result) => {
        if (err) res.status(500).send("Error al insertar carrito_productos: " + err);
        else res.send("Se ha agregado el producto al carrito");
    });
});

app.put("/actualizar/carrito_producto/:id", (req, res) => {
    const { id } = req.params;
    const { id_carrito, id_producto, cantidad, precio, estado } = req.body;
    const query = `UPDATE carrito_productos 
                   SET id_carrito='${id_carrito}', id_producto='${id_producto}', 
                       cantidad='${cantidad}', precio='${precio}', estado='${estado}' 
                   WHERE id=${id}`;
    connection.query(query, (err, result) => {
        if (err) res.send({ error: err, msg: "No se pudo actualizar el carrito_producto" });
        else res.send("Carrito_producto actualizado correctamente");
    });
});

app.delete("/carrito/eliminar/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM carrito_productos WHERE id=${id}`;
    connection.query(query, (err, result) => {
        if (err) res.send(err);
        else res.send("Producto eliminado del carrito correctamente");
    });
});

app.delete("/carrito/vaciar/:id", (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM carrito_productos WHERE id=${id}`;
    connection.query(query, (err, result) => {
        if (err) res.send(err);
        else res.send("Se ha vaciado el carrito correctamente");
    });
});


app.use("/",(req,res)=>{
    res.send("Hola mundo de la api de ", database);
});