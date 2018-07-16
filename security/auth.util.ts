const bcrypt = require('bcrypt');
const jwtDecode = require('jwt-decode');
const jwt = require('jwt-simple');
const moment = require('moment');
             
import {AppConfig} from '../app/app.config';

export class UserInfo {
    _id: String;
    username: String;
    password: String;

    constructor (userDB: any){
        this.username = userDB.username;
        this.password = userDB.password;
    } 
}

export class AuthUtil {
    public static validatePassword(password, passwordHash){
        return AuthUtil.checkHash(password, passwordHash); 
    }
    public static createToken(user) {
        var payload = {
            data:{
                _id: user._id,
                username: user.username,
                password: user.password
            },
            iat: moment().unix(),
            exp: moment().add(14, "days").unix(),
        };
        return jwt.encode(payload, AppConfig.secret);
    };
    public static validateToken(token: string): UserInfo { 
        try {
            let dataFromToken = jwtDecode(token).data;
            let userInfo =new UserInfo(dataFromToken);
            userInfo._id = dataFromToken._id; 
            return userInfo;
            
        } catch(err) {
            return null;
        }        
    }

    public static  generateHash(value: string) {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(value, salt);
    }

    public static checkHash(value: string, hash: string) {
        console.error(bcrypt.compareSync(value,hash));
        return bcrypt.compareSync(value, hash); 
    }
    

}