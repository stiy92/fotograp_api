import { Post } from '../Models/post.model';
import { verificaToken } from '../middlewares/autenticacion';


postRoutes.Post('/', [verificaToken], (req: any, res:Response)=>{

    const body = req.body;
    body.usuario = req.usuario._id;

    Post.create( body).then(async postDB =>{

        await postDB.populate('usuario', '-password');

        res.json({
            ok: true,
            post: postDB
        });
    }).catch( err =>{
        res.json(err)
    });
})