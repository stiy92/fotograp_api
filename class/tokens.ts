import Jwt  from "jsonwebtoken";

export default class TOKEN{

    private static token: string= 'this-is-my-seed';
    private static caducida: string= '30d';
    
    constructor(){

    }
    //payload pasan los datos para el token
    static getJwToken( payload: any): string {

// firma
        return Jwt.sign({
            usuario: payload
        }, this.token, {expiresIn: this.caducida});
    }

//comparo los datos que vienen 
static comprobarToken( userToken: string){
return new Promise((resolve, reject)=>{

    Jwt.verify(userToken, this.token, (err, decoded)=> {
        if (err) {
               reject();
        } else {
            resolve( decoded);
        }
    })
});

   
}}