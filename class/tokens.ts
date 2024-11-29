import Jwt  from "jsonwebtoken";

export default class TOKEN{
    
    private static secret: string = "this-is-my-seed"; // Clave secreta
    // private static token: string= 'this-is-my-seed';
    private static expiration: string = "30d"; // Tiempo de expiración del token
    // private static caducida: string= '30d';
    
    constructor(){

    }
    //payload pasan los datos para el token
    static getJwToken( payload: any): string {

// firma
        return Jwt.sign({
            usuario: payload
        }, this.secret, {expiresIn: this.expiration});
    }

//comparo los datos que vienen 
static comprobarToken( userToken: string): Promise<any> { 
return new Promise((resolve, reject)=>{

    Jwt.verify(userToken, this.secret, (err, decoded)=> {
        if (err) {
            console.error("Error al verificar el token:", err); // Log para depuración
               reject(err);
        } else {
            resolve( decoded);
        }
    })
});

   
}}