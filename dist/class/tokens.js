"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TOKEN {
    // private static caducida: string= '30d';
    constructor() {
    }
    //payload pasan los datos para el token
    static getJwToken(payload) {
        // firma
        return jsonwebtoken_1.default.sign({
            usuario: payload
        }, this.secret, { expiresIn: this.expiration });
    }
    //comparo los datos que vienen 
    static comprobarToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.secret, (err, decoded) => {
                if (err) {
                    console.error("Error al verificar el token:", err); // Log para depuración
                    reject(err);
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
TOKEN.secret = "this-is-my-seed"; // Clave secreta
// private static token: string= 'this-is-my-seed';
TOKEN.expiration = "30d"; // Tiempo de expiración del token
exports.default = TOKEN;
