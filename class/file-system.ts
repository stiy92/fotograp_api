import { FileUpload } from '../interfaces/file-upload';
import uniqid from 'uniqid';

//propio de node para las rutas de los archivos
import path from 'path';

//verificar si la carpeta< existe
import fs from 'fs';


export default class FileSystem {

    constructor(){};

    guardarImagenTemporal( file: FileUpload, userId: string){

        // ejecutar este metodo con promesa
        return new Promise( (resolve:any, reject:any)=>{ 
         // crear carpetas
         const path = this.crearCarpetaUsuario( userId);

         // nombre de la carpeta
         const nombreArchivo = this.generarNombreUnico( file.name);
       
         //mover el archivo del temp a nuestra carpeta
         file.mv( `${path}/${nombreArchivo}`, (err:any)=>{
            if(err){
                reject(err);
            } else {
                resolve();
            }
         });
        
       
         // console.log( file.name );
       //  console.log( nombreArchivo );

        })
       

    }

    //metodo para generar nombre

    private generarNombreUnico( nombreOriginal: string){
        // splinte ejje array bueno aqui separo el nombre y estencion del image
        const nombreArr = nombreOriginal.split('.');
        const extension = nombreArr[ nombreArr.length -1 ];

        //generar id unico constante
        const idUnico= uniqid();

        return `${idUnico}.${ extension}`
    }

    private crearCarpetaUsuario( userId: string){
        const pathUser = path.resolve( __dirname, '../uploads/', userId);

        // cargar imagen temporal para luego hacer el push
        const pathUserTemp = pathUser + '/temp';
        console.log(pathUser);
        
        //verificar si existe
        const existe= fs.existsSync( pathUser);

        //si no existe crea el directorio
        if(!existe){
        
            fs.mkdirSync( pathUser);
            fs.mkdirSync( pathUserTemp);
        }
//retornar las imagenes temporales
        return pathUserTemp
    }
    //pasar imagenes de temporal a carpeta post
    imagenesDeTempHaciaPost( userId: string){
        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp');
        const pathPost = path.resolve( __dirname, '../uploads/', userId, 'posts');

        if ( !fs.existsSync(pathTemp)){
            return [];
        }

        
        if ( !fs.existsSync(pathPost)){
            fs.mkdirSync(pathPost);
        }

        const imagenesTemp = this.obtenerImagenesEnTemp( userId);

        imagenesTemp.forEach( imagen => {
            fs.renameSync( `${pathTemp}/${imagen}`,`${pathPost}/${imagen}`)
        });

        return imagenesTemp;

    }

    private obtenerImagenesEnTemp( userId: string){

        const pathTemp = path.resolve( __dirname, '../uploads/', userId, 'temp');

        return fs.readdirSync( pathTemp) || [];

    }

           //mostrar foto en la app
    getFotoUrl( userId: string, img: string){

        // path Posts
        const pathFoto = path.resolve( __dirname, '../uploads/', userId, 'posts', img);

        //si la imagen no existe
    const existe = fs.existsSync( pathFoto)
        if ( !existe){
            return path.resolve( __dirname, '../assets/400x250.jpg');
        }
        return pathFoto;

    }
    }

