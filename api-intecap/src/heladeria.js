import mysql2 from "mysql2";
import express from "express";
import bodyParser from "body-parser";

let database = 'heladeria';

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

app.get("/sabores",(req, res)=>{
    const query="select *from sabor";
    connection.query(query,(err,resultado)=>{
        if(err) throw err;
        res.send(resultado);
    })
});

app.get("/pedidos",(req, res)=>{
    const query="select *from pedido";
    connection.query(query,(err,resultado)=>{
        if(err) throw err;
        res.send(resultado);
    })
});

app.get("/detallePedidos",(req, res)=>{
    const query="select *from detalle_pedido";
    connection.query(query,(err,resultado)=>{
        if(err) throw err;
        res.send(resultado);
    })
});

/*INSERTAR DATOS */

app.post("/insertar/sabor",(req,res)=>{

    const{ nombre, costo, estado } = req.body;

    const query=`INSERT INTO sabor(nombre, costo, estado)
     VALUES('${nombre}', '${costo}', '${estado}')`;
    connection.query(query,(err,result)=>{
        if(err)
        {res.status(500).send("Error al insertar datos: "+err);

        }else{
            res.send("Datos insertados correctamente");
        }
    });

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

/*insertar datos libro*/
app.post("/insertar/pedido",(req,res)=>{

    const{
        fecha,
        total,
        nit_cliente,
        estado        
    } = req.body;

    const query=`INSERT INTO pedido (fecha, total,nit_cliente,estado)
     VALUES('${fecha}','${total}','${nit_cliente}','${estado}')`;
    
    connection.query(query,(err,result)=>{
        if(err)
        {res.status(500).send("Error al insertar datos: "+err);

        }else{
            res.send("Datos insertados correctamente");
        }
    });

});


/*insertar en autor_libro */
app.post("/insertar/detallePedido",(req,res)=>{

    const{
        id_pedido,
        id_sabor,
        cantidad,
        precio,
        estado
    }=req.body;

    const query=`INSERT INTO detalle_pedido
    (id_pedido, id_sabor, cantidad, precio, estado) 
    VALUES(
        '${id_pedido}',
        '${id_sabor}',
        '${cantidad}',
        '${precio}',
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

//actualizar cliente

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

app.put('/actualizar/sabor/:id',(req,res)=>{
    const {id}=req.params;
    const{ nombre, costo, estado } = req.body;
    const query=`UPDATE sabor 
    SET nombre='${nombre}', 
        costo='${costo}', 
        estado='${estado}' 
        WHERE id=${id}`;
        
    connection.query(query,(err,result)=>{
        if(err) {
            res.send({ error: err, msg: 'No se pudo actualizar'});
        }else {
            res.send("Datos actualizados correctamente");
        }
    });
});

app.put('/actualizar/pedido/:id',(req,res)=>{
    const {id}=req.params;
    const{ fecha, total, nit_cliente, estado } = req.body;
    const query=`UPDATE pedido 
    SET fecha='${fecha}', 
        total='${total}', 
        nit_cliente='${nit_cliente}', 
        estado='${estado}' 
        WHERE id=${id}`;
        
    connection.query(query,(err,result)=>{
        if(err) {
            res.send({ error: err, msg: 'No se pudo actualizar'});
        }else {
            res.send("Datos actualizados correctamente");
        }
    });
});

app.put('/actualizar/detallePedido/:id',(req,res)=>{
    const {id}=req.params;
    const{ id_pedido, id_sabor, cantidad, precio, estado } = req.body;
    const query=`UPDATE detalle_pedido 
    SET id_pedido='${id_pedido}', 
        id_sabor='${id_sabor}', 
        cantidad='${cantidad}', 
        precio='${precio}', 
        estado='${estado}' 
        WHERE id=${id}`;
        
    connection.query(query,(err,result)=>{
        if(err) {
            res.send({ error: err, msg: 'No se pudo actualizar'});
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

app.delete("/eliminar/sabor/:id",(req,res)=>{
    const {id}=req.params;
    const query=`DELETE FROM sabor WHERE id=${id}`;
    connection.query(query,(err,result)=>{
        if(err) {
            res.send(err);
        } else {
            res.send("Sabor eliminado correctamente");
        }
    });
});

app.delete("/eliminar/pedido/:id",(req,res)=>{
    const {id}=req.params;
    const query=`DELETE FROM pedido WHERE id=${id}`;
    connection.query(query,(err,result)=>{
        if(err) {
            res.send(err);
        } else {
            res.send("Pedido eliminado correctamente");
        }
    });
});

app.delete("/eliminar/detallePedido/:id",(req,res)=>{
    const {id}=req.params;
    const query=`DELETE FROM detalle_pedido WHERE id=${id}`;
    connection.query(query,(err,result)=>{
        if(err) {
            res.send(err);
        } else {
            res.send("Detalle pedido eliminado correctamente");
        }
    });
});

app.use("/",(req,res)=>{
    res.send("Hola mundo de la api de ", database);
});