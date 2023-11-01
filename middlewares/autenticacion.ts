import { Response, Request, NextFunction } from "express";
import TOKEN from "../class/tokens";


export const verificaToken = ( req: any, res: Response, next: NextFunction)=>{
    const userToken = req.get('x-token') || '';

    TOKEN.comprobarToken( userToken)
    .then( (decoded: any) =>{
     //   console.log ('Decoded', decoded);
        req.usuario = decoded.usuario;
        next();
    })
    .catch( err =>{
        res.json({
            ok: false,
            mensaje: 'Token falso'
        });

    });
}