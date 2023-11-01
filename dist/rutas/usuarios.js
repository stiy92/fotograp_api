"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_model_1 = require("../Models/usuario.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const tokens_1 = __importDefault(require("../class/tokens"));
const autenticacion_1 = require("../middlewares/autenticacion");
const UserRoutes = (0, express_1.Router)();
// ruta para login
UserRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = req.body;
        const userDB = yield usuario_model_1.Usuario.findOne({ email: body.email });
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'usuario/contraseña no son correctos'
            });
        }
        if (userDB.compararPassword(body.password)) {
            const tokenUser = tokens_1.default.getJwToken({
                _id: userDB._id,
                nombre: userDB.nombre,
                email: userDB.email,
                avatar: userDB.avatar
            });
            res.json({
                ok: true,
                token: tokenUser
            });
        }
        else {
            return res.json({
                ok: false,
                mensaje: 'usuario/contraseña no son correctos ****'
            });
        }
    }
    catch (err) {
        throw err;
    }
}));
// ruta para crear usuario
UserRoutes.post('/create', (req, res) => {
    // recibo y guardo los datos del get en la siguiente constante
    const user = {
        nombre: req.body.nombre,
        avatar: req.body.avatar,
        email: req.body.email,
        password: bcrypt_1.default.hashSync(req.body.password, 10)
    };
    //guardo en la base de datos 
    usuario_model_1.Usuario.create(user).then(userDB => {
        const tokenUser = tokens_1.default.getJwToken({
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
});
//ruta update usuario
UserRoutes.post('/update', autenticacion_1.verificaToken, (req, res) => {
    const user = {
        nombre: req.body.nombre || req.usuario.nombre,
        email: req.body.email || req.usuario.email,
        avatar: req.body.avatar || req.usuario.avatar,
    };
    usuario_model_1.Usuario.findOneAndUpdate(req.usuario._id, user, { new: true }).then((userDB) => {
        if (!userDB) {
            return res.json({
                ok: false,
                mensaje: 'No existe un usuario con ese ID'
            });
        }
        const tokenUser = tokens_1.default.getJwToken({
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
            mensaje: 'Error con la verificacion del token'
        });
    });
});
exports.default = UserRoutes;
