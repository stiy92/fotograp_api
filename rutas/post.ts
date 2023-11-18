import { Router, Response } from 'express';
import { Post } from '../Models/post.model';
import { verificaToken } from '../middlewares/autenticacion';
import { FileUpload } from '../interfaces/file-upload';
import FileSystem from '../class/file-system';

const postRoutes = Router();
   //crear instancia de guardar imagen temporal
   const fileSystem = new FileSystem();

//ruta  agregar un post con verificar token de usuario y almacenar sus posteos==========================
postRoutes.post('/', [verificaToken], (req: any, res:Response)=>{

    const body = req.body;
    body.usuario = req.usuario._id;
   
    // constante con metodo que envia las imagenes temporales a la carpeta de post
    const imagenes= fileSystem.imagenesDeTempHaciaPost( req.usuario._id);
    //se agregan al body del modelo agregar s al modelo
    body.imgs = imagenes;

    Post.create( body ).then( async postDB => {
        //populate es para poblar la informacion del usuario deacuerdo a todos sus posteos 
        await postDB.populate('usuario', '-password');
       
        res.json({
            ok: true,
            post: postDB
        })

    }).catch( err =>{
        res.json(err)
    });
})

//=======================================================================================================

// ruta buscar POST Paginados
postRoutes.get('/', async (req: any, res: Response)=> {

let pagina = Number(req.query.pagina) || 1;
let skip = pagina -1;
skip = skip * 10;

const posts = await Post.find()
.sort({ _id: -1})
.skip( skip)
.limit(10)
.populate('usuario', '-password')
.exec();

    res.json({
        pagina,
        ok: true,
        posts
    });
})


//ruta servicio para subir archivos

postRoutes.post( '/upload', [verificaToken], async (req:any, res:Response)=>{

    if ( !req.files){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ninguna imagen'
        });
    }
    const file: FileUpload = req.files.image;

    if(!file){
        return res.status(400).json({
            ok: false,
            mensaje: 'No se subió ninguna archivo imagen'
        });
    }
    if(!file.mimetype.includes('image')){
        return res.status(400).json({
            ok: false,
            mensaje: 'Lo que subió no es una imagen'
        });
    }

 // llamar metodo de la instancia filesystem
 await fileSystem.guardarImagenTemporal( file,  req.usuario._id);

    res.json({
        ok: true,
        file: file.mimetype
    });
});

// ruta para buscar imagen desde DB
postRoutes.get('/imagen/:userid:img', (req:any, res:Response) =>{

    const userId = req.params.userid;
    const img = req.params.img;

    const pathFoto = fileSystem.getFotoUrl( userId, img);

    res.sendFile( pathFoto);

})


export default postRoutes;