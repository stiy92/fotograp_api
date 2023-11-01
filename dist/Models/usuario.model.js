"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Usuario = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
///////////////////defino la constante con schema modelando los datos del usuario que pasaran al registro//////////////////////
const usuarioSchema = new mongoose_1.Schema({
    nombre: {
        type: String,
        require: [true, 'es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        require: [true, 'es necesario']
    },
    password: {
        type: String,
        require: [true, 'es necesario']
    }
});
/////////////////////////////////comparar password////////////////////////
usuarioSchema.method('compararPassword', function (password = '') {
    if (bcrypt_1.default.compareSync(password, this.password)) {
        return true;
    }
    else {
        return false;
    }
});
;
//////////////////////fin definicion string/////////////////////////////
//esportar la constrante usando el interface
const Usuario = (0, mongoose_1.model)('usuario', usuarioSchema);
exports.Usuario = Usuario;
