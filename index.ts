import mongoose from "mongoose";
import Server from "./class/server";
import UserRoutes from "./rutas/usuarios";
import bodyParser from "body-parser";

//A1 constante del server para usar la extancia de express servidor
const server = new Server;
//===============================fin A1======================

//A4 conectar DB esto lo debo de poner aparte
mongoose.connect('mongodb://127.0.0.1:27017/fotosgram')
.then(()=> { 
    console.log('Base de datos online');
}).catch((err)=>{
 if(err) throw err;
});


//middleware with bodyparser pasa estos parametros primero estos middleware deben de ir de primero ya que cuando pase la ruta user deben de existir los datos para el registro
server.app.use(bodyParser.urlencoded({ extended:true}));
server.app.use(bodyParser.json());

//end middleware

//===================== A2 primer uso constante levantar el servidor======================
server.start(()=>{
    console.log(`El servidor esta corriendo en el puerto ${server.port}`);
    
})
//=====================fin A2 ======================

// A3 rutas
server.app.use('/user', UserRoutes);

// fin A3

//=====================fin route ======================

// A3 rutas
server.app.use('/posts', postRoutes);

// fin A3



