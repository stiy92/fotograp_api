"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uniqid_1 = __importDefault(require("uniqid"));
//propio de node para las rutas de los archivos
const path_1 = __importDefault(require("path"));
//verificar si la carpeta< existe
const fs_1 = __importDefault(require("fs"));
class FileSystem {
    constructor() { }
    ;
    guardarImagenTemporal(file, userId) {
        // ejecutar este metodo con promesa
        return new Promise((resolve, reject) => {
            // crear carpetas
            const path = this.crearCarpetaUsuario(userId);
            // nombre de la carpeta
            const nombreArchivo = this.generarNombreUnico(file.name);
            //mover el archivo del temp a nuestra carpeta
            file.mv(`${path}/${nombreArchivo}`, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
            // console.log( file.name );
            //  console.log( nombreArchivo );
        });
    }
    //metodo para generar nombre
    generarNombreUnico(nombreOriginal) {
        // splinte ejje array bueno aqui separo el nombre y estencion del image
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[nombreArr.length - 1];
        //generar id unico constante
        const idUnico = (0, uniqid_1.default)();
        return `${idUnico}.${extension}`;
    }
    crearCarpetaUsuario(userId) {
        const pathUser = path_1.default.resolve(__dirname, '../uploads/', userId);
        // cargar imagen temporal para luego hacer el push
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);
        //verificar si existe
        const existe = fs_1.default.existsSync(pathUser);
        //si no existe crea el directorio
        if (!existe) {
            fs_1.default.mkdirSync(pathUser);
            fs_1.default.mkdirSync(pathUserTemp);
        }
        //retornar las imagenes temporales
        return pathUserTemp;
    }
    //pasar imagenes de temporal a carpeta post
    imagenesDeTempHaciaPost(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        const pathPost = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts');
        if (!fs_1.default.existsSync(pathTemp)) {
            return [];
        }
        if (!fs_1.default.existsSync(pathPost)) {
            fs_1.default.mkdirSync(pathPost);
        }
        const imagenesTemp = this.obtenerImagenesEnTemp(userId);
        imagenesTemp.forEach(imagen => {
            fs_1.default.renameSync(`${pathTemp}/${imagen}`, `${pathPost}/${imagen}`);
        });
        return imagenesTemp;
    }
    obtenerImagenesEnTemp(userId) {
        const pathTemp = path_1.default.resolve(__dirname, '../uploads/', userId, 'temp');
        return fs_1.default.readdirSync(pathTemp) || [];
    }
    //mostrar foto en la app
    getFotoUrl(userId, img) {
        // path Posts
        const pathFoto = path_1.default.resolve(__dirname, '../uploads/', userId, 'posts', img);
        //si la imagen no existe
        const existe = fs_1.default.existsSync(pathFoto);
        if (!existe) {
            return path_1.default.resolve(__dirname, '../assets/400x250.jpg');
        }
        return pathFoto;
    }
}
exports.default = FileSystem;
