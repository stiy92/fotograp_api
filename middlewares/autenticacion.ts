import { Response, Request, NextFunction } from "express";
import TOKEN from "../class/tokens";


export const verificaToken = ( req: any, res: Response, next: NextFunction)=>{
    const userToken = req.get('x-token') || '';

    console.log('Received token:', userToken); // Verifica que el token esté siendo recibido correctamente
    
    if (!userToken) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No se proporcionó el token'
        });
    }

    TOKEN.comprobarToken( userToken)
    .then( (decoded: any) =>{
        console.log('Token Decoded:', decoded); // Debug: Muestra el contenido decodificado
        req.usuario = decoded.usuario;
        next();
    })
    .catch( err =>{
        console.error('Error al comprobar el token:', err); // Debug: Muestra errores específicos
        res.status(401).json({
            ok: false,
            mensaje: 'Token inválido o expirado'
        });

    });
}