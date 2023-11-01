import { Schema, Document, model } from "mongoose";

const postSchema = new Schema({

    created: {
        type: Date
    },

    mensaje: {
        type: String
    },
    img: {
        type: String
    },
    coords: {
        type: String  //-13.3333
    },

    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Debe de existir una referencia a un usuario']
    }
});

// guardar fecha y se le anexa una interfaz

postSchema.pre<Ipost>('save', function(next){
    this.created = new Date();
    next();
});

interface Ipost extends Document {
    created: Date;
    mensaje: string;
    img: string[];
    coords: string;
    usuario: string;

}

export const Post = model<Ipost>('post', postSchema);