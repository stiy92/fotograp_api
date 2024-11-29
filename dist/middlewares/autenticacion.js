"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const tokens_1 = __importDefault(require("../class/tokens"));
const verificaToken = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    console.log('Received token:', userToken); // Verifica que el token esté siendo recibido correctamente
    if (!userToken) {
        return res.status(401).json({
            ok: false,
            mensaje: 'No se proporcionó el token'
        });
    }
    tokens_1.default.comprobarToken(userToken)
        .then((decoded) => {
        console.log('Token Decoded:', decoded); // Debug: Muestra el contenido decodificado
        req.usuario = decoded.usuario;
        next();
    })
        .catch(err => {
        console.error('Error al comprobar el token:', err); // Debug: Muestra errores específicos
        res.status(401).json({
            ok: false,
            mensaje: 'Token inválido o expirado'
        });
    });
};
exports.verificaToken = verificaToken;
