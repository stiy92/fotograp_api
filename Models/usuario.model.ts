import { Schema, model, Document } from "mongoose";
import bcrypt from 'bcrypt';


///////////////////defino la constante con schema modelando los datos del usuario que pasaran al registro//////////////////////
const usuarioSchema:Schema<Iusuario> = new Schema ({
nombre:{
    type: String,
    require:[true, 'es necesario']
},

avatar: {
    type: String,
    default: 'av-1.png'
},

email:{
    type: String,
    unique: true,
    require:[true, 'es necesario']
},

password:{
    type: String,
    require:[true, 'es necesario']

}


});

/////////////////////////////////comparar password////////////////////////

usuarioSchema.method('compararPassword', function(password: string = ''): boolean {
    if (bcrypt.compareSync(password, this.password)){
        return true;
    } else {
        return false;
    }
});
//////////////////////////////////fin de constante schema/*////////////////////////////

//interface del usuario y pasarlo en la exportacion

interface Iusuario extends Document{
    nombre: string,
    avatar:string,
    email: string,
    password: string

    compararPassword(password: string): boolean;
};
//////////////////////fin definicion string/////////////////////////////


//esportar la constrante usando el interface

const Usuario = model<Iusuario>('usuario', usuarioSchema);

export {
    Iusuario, Usuario
}