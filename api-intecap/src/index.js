import mysql2 from "mysql2";
import express from "express";
import bodyParser from "body-parser";

const connection=mysql2.createConnection({
    host:"localhost",
    database:"biblioteca",
    user:"root",
    password:"luisbaquiax",
});
//crear una instancia de aplicación Express,
//Esta instancia es la base de nuestro servidor web y permite definir rutas,
//intermediarios(middlewares y todo lo relacionado al servidor)
const app = express();//enrutador

app.use(bodyParser.json()); //para manejo de Json

//conexión a la base de datos
connection.connect();

//asignamos un puerto
const PORT=5000;

/*
const mundo= "mundo";
const hola= `Hola${mundo}`;
*/

app.listen(PORT,() =>{
    console.log(`Corriendo en: http://localhost:${PORT}`);
    connection.connect((err)=>{
        if(err) throw err;
        console.log("base de datos conectada!");
    });
});

/*CREANDO LAS RUTAS */

app.get("/autores",(req, res)=>{
    const query="select *from autor";
    connection.query(query,(err,resultado)=>{
        if(err) throw err;
        res.send(resultado);
    })
    //res.send("autores");
});
app.get("/libros",(req, res)=>{
    const query="select *from libro";
    connection.query(query,(err,resultado)=>{
        if(err) throw err;
        res.send(resultado);
    })
    //res.send("autores");
});

///////////////////////pedir catetorias
app.get("/categorias",(req, res)=>{
    const query="select *from categoria";
    connection.query(query,(err,resultado)=>{
        if(err) throw err;
        res.send(resultado);
    })
    //res.send("autores");
});

///**********autor libro */


app.get("/autorlibro",(req, res)=>{
    const query="select *from autor_libro";
    connection.query(query,(err,resultado)=>{
        if(err) throw err;
        res.send(resultado);
    })
    //res.send("autores");
});

//*agregando el logueo para usuario)

app.get("/usuario/:usuario/:contrasenia",(req,res)=>{
    const {usuario,contrasenia}=req.params;
    const query=`select *from usuario where usuario='${usuario}'`;
    connection.query(query,(err,resultado)=>{
        
        if(err) {
            throw err;
        }

        if(resultado.length === 0)
        {
            res.send("usuario no encontrado");
        }
        else{

            if(resultado[0].contrasenia===contrasenia)
            {
                res.send(true);//autenticado
            }
            else{
                res.send(false);
            }
        }
    });
});
/*INSERTAR DATOS */

app.post("/insertar/categoria",(req,res)=>{

    const{
      
        Nombre_categoria,
    }=req.body;

    const query=`INSERT INTO categoria (Nombre_categoria) VALUES('${Nombre_categoria}')`;
    connection.query(query,(err,result)=>{
        if(err)
        {res.status(500).send("Error al insertar datos: "+err);

        }else{
            res.send("Datos insertados correctamente");
        }
    });

});
/* tabla autor--insertar datos */
app.post("/insertar/autor",(req,res)=>{

    const{
      
        nombre,
        apellido,
        nacionalidad,
        fecha_nacimiento,
    }=req.body;

    const query=`INSERT INTO autor (nombre,apellido,nacionalidad,fecha_nacimiento) 
    VALUES('${nombre}','${apellido}','${nacionalidad}','${fecha_nacimiento}')`;
    
    connection.query(query,(err,result)=>{
        if(err)
        {res.status(500).send("Error al insertar datos: "+err);

        }else{
            res.send("Datos insertados correctamente");
        }
    });
});

/*insertar datos libro*/
app.post("/insertar/libro",(req,res)=>{

    const{
      
        titulo,
        fecha_publicacon,
        id_categoria
        
    }=req.body;

    const query=`INSERT INTO libro (titulo,fecha_publicacon,id_categoria) 
    VALUES('${titulo}','${fecha_publicacon}','${id_categoria}')`;
    
    connection.query(query,(err,result)=>{
        if(err)
        {res.status(500).send("Error al insertar datos: "+err);

        }else{
            res.send("Datos insertados correctamente");
        }
    });

});


/*insertar en autor_libro */
app.post("/insertar/autorlibro",(req,res)=>{

    const{
      
       id_autor,
       id_libro
        
    }=req.body;

    const query=`INSERT INTO autor_libro (id_autor,id_libro) 
    VALUES('${id_autor}','${id_libro}')`;
    
    connection.query(query,(err,result)=>{
        if(err)
        {res.status(500).send("Error al insertar datos: "+err);

        }else{
            res.send("Datos insertados correctamente");
        }
    });

});

app.get("/autores/:id_autor",(req,res)=>{
    const {
        id_autor
    }=req.params;

    const query=`select *from autor where id_autor=${id_autor}`;
    connection.query(query,(err,resultado)=>{
        if(err)throw err;
        res.send(resultado);
    });
});

app.use("/",(req,res)=>{
    res.send("Hola mundo de la api de biblioteca");
});