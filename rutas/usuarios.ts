import { Router, Request, Response } from "express";
import { Usuario } from "../Models/usuario.model";
import bcrypt from "bcrypt";
import TOKEN from '../class/tokens';
import { verificaToken } from "../middlewares/autenticacion";


const UserRoutes = Router();

// ruta para login

UserRoutes.post('/login', async (req: Request, res: Response) =>{
try{
    const body = req.body;

  const userDB = await Usuario.findOne({ email: body.email});

        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'usuario/contraseña no son correctos'
            });
        }

        if (userDB.compararPassword(body.password)){

            const tokenUser = TOKEN.getJwToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });

            res.json({
                ok: true,
                token: tokenUser
            });

        } else {
            return res.json({
                ok:false,
                mensaje: 'usuario/contraseña no son correctos ****'
            });
        }
    } catch (err){
        throw err;
    }
    })

// ruta para crear usuario
UserRoutes.post('/create', (req: Request, res: Response) => {
// recibo y guardo los datos del get en la siguiente constante

    const user = {
        nombre: req.body.nombre,
        avatar: req.body.avatar,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10)
    }

    //guardo en la base de datos 
Usuario.create(user).then(userDB =>{

        const tokenUser = TOKEN.getJwToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: tokenUser
        });
}).catch(err => {
    res.json({
        ok: false,
        err
    });
});



})

//ruta update usuario

UserRoutes.post('/update', verificaToken, (req:any, res: Response)=> {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar,
    };

    Usuario.findOneAndUpdate( req.usuario._id, user, {new: true}).then(
        (userDB) => {

            if(!userDB){
                return res.json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese ID'
                });
            }
            
        const tokenUser = TOKEN.getJwToken({
            _id: userDB._id,
            nombre: userDB.nombre,
            email: userDB.email,
            avatar: userDB.avatar
        });

        res.json({
            ok: true,
            token: tokenUser
        });
        
    }).catch( err =>{
        res.json({
            ok: false,
            mensaje: 'Error con la verificacion del token'
        });

    }); 
        });



export default UserRoutes;