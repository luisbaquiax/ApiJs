import mysql2 from "mysql2";
import express from "express";
import bodyParser from "body-parser";

const connection=mysql2.createConnection({
    host:"localhost",
    database:"cunoc",
    user:"root",
    password:"luisbaquiax",
});
//crear una instancia de aplicación Express,
//Esta instancia es la base de nuestro servidor web y permite definir rutas,
//intermediarios(middlewares y todo lo relacionado al servidor)
const app =express();//enrutador

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

app.get("/estudiantes",(req, res)=>{
    const query="SELECT * FROM estudiante;";
    connection.query(query,(err,resultado)=>{
        if(err) throw err;
        res.send(resultado);
    })
    //res.send("autores");
});


//*agregando el logueo para usuario)

app.get("/estudiante/:carne/:id",(req,res)=>{
    const {carne,id}=req.params;
    const query=`select *from estudiante where carne='${carne}' and id='${id}'`;
    connection.query(query,(err,resultado)=>{
        
        if(err) {
            throw err;
        }

        if(resultado.length === 0)
        {
            res.send("usuario no encontrado");
        }
        else{

            if(resultado[0].id === id)
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

app.post("/insertar/estudiante",(req,res)=>{

    const{
        carne,
        dpi,
        nombre1,
        nombre2,
        apellido1,
        apellido2,
        correo,
        telefono,
        password,
        estado
    }=req.body;
    //INSERTAR ESTUDAINTE QUERY
    const query=`INSERT INTO estudiante (carne,dpi,nombre1,nombre2,apellido1,apellido2,correo,telefono,password,estado) 
    VALUES('${carne}','${dpi}','${nombre1}','${nombre2}','${apellido1}','${apellido2}','${correo}','${telefono}','${password}','${estado}')`;
   
    connection.query(query,(err,result)=>{
        if(err)
        {res.status(500).send("Error al insertar datos: "+err);

        }else{
            res.send({msg: "Datos insertados correctamente"});
        }
    });

});
/* tabla autor--insertar datos */

app.use("/",(req,res)=>{
    res.send("Hola mundo de la api de biblioteca");
});