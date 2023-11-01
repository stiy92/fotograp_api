"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificaToken = void 0;
const tokens_1 = __importDefault(require("../class/tokens"));
const verificaToken = (req, res, next) => {
    const userToken = req.get('x-token') || '';
    tokens_1.default.comprobarToken(userToken)
        .then((decoded) => {
        //   console.log ('Decoded', decoded);
        req.usuario = decoded.usuario;
        next();
    })
        .catch(err => {
        res.json({
            ok: false,
            mensaje: 'Token falso'
        });
    });
};
exports.verificaToken = verificaToken;
