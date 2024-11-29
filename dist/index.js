"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const server_1 = __importDefault(require("./class/server"));
const usuarios_1 = __importDefault(require("./rutas/usuarios"));
const post_1 = __importDefault(require("./rutas/post"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
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
mongoose_1.default.connection.on('connected', () => {
    console.log('Base de datos online');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err.message);
});
mongoose_1.default.connection.on('disconnected', () => {
    console.log('Base de datos desconectada');
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
// user Cors
server.app.use((0, cors_1.default)({ origin: true, credentials: true }));
//=====================fin route ======================
// FileUpload
server.app.use((0, express_fileupload_1.default)());
// fin FileUpload
// user rutas
server.app.use('/user', usuarios_1.default);
// fin rutas
// post rutas
server.app.use('/posts', post_1.default);
// fin post rutas
