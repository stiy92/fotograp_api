"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class TOKEN {
    constructor() {
    }
    //payload pasan los datos para el token
    static getJwToken(payload) {
        // firma
        return jsonwebtoken_1.default.sign({
            usuario: payload
        }, this.token, { expiresIn: this.caducida });
    }
    //comparo los datos que vienen 
    static comprobarToken(userToken) {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.verify(userToken, this.token, (err, decoded) => {
                if (err) {
                    reject();
                }
                else {
                    resolve(decoded);
                }
            });
        });
    }
}
exports.default = TOKEN;
TOKEN.token = 'this-is-my-seed';
TOKEN.caducida = '30d';
