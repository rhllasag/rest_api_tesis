const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;

import {AuthUtil, UserInfo} from './auth.util';

export class PassportSecurity {
    public passport = null;
    public authorize = null;  


    constructor (server: any) {
        this.passport = passport;
        // Init Middleware
        this.initMiddleware(server);
        this.authorize = this.passport.authenticate('bearer', { session: false });     
        console.error(this.authorize); 
    }

    public initMiddleware = (server : any) => {
        server.use(passport.initialize());
        passport.use(new BearerStrategy((token, done) => {
            let user: UserInfo = AuthUtil.validateToken(token);
            if (user){
                return done(null, user, { scope: 'all' })
            } else {
                return done(null, false);
            }
        }));
    } 
}  