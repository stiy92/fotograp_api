"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postSchema = new mongoose_1.default.Schema({
    created: {
        type: Date
    },
    mensaje: {
        type: String
    },
    imgs: [{
            type: String
        }],
    coords: {
        type: String //-13.3333
    },
    usuario: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
});
// guardar fecha y se le anexa una interfaz
postSchema.pre('save', function (next) {
    this.created = new Date();
    next();
});
exports.Post = mongoose_1.default.model('post', postSchema);
