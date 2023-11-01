"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./class/server"));
const usuarios_1 = __importDefault(require("./rutas/usuarios"));
const body_parser_1 = __importDefault(require("body-parser"));
//A1 constante del server para usar la extancia de express servidor
const server = new server_1.default;
//===============================fin A1======================
//A4 conectar DB esto lo debo de poner aparte
mongoose_1.default.connect('mongodb://127.0.0.1:27017/fotosgram')
    .then(() => {
    console.log('Base de datos online');
}).catch((err) => {
    if (err)
        throw err;
});
//middleware with bodyparser pasa estos parametros primero estos middleware deben de ir de primero ya que cuando pase la ruta user deben de existir los datos para el registro
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
//end middleware
//===================== A2 primer uso constante levantar el servidor======================
server.start(() => {
    console.log(`El servidor esta corriendo en el puerto ${server.port}`);
});
//=====================fin A2 ======================
// A3 rutas
server.app.use('/user', usuarios_1.default);
// fin A3
//=====================fin route ======================
// A3 rutas
server.app.use('/posts', postRoutes);
// fin A3
