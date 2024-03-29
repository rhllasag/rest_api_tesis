export class AppConfig {
    public static secret = 'randomstr-efr23fe2r3fegrbnj65645rfghuy4t4gh56r4fw924f9ue1)HG(&F&%"/FT)';
    public static tokenExpirationTime = 240;  // in Minutes    
    public static db = "socialNetwork";
    public static mongoDB = 'mongodb://localhost:27017/socialNetwork'; 
    public static restAPIPort = '8080';
    public static restAPIPrefix = (version : string = '1') => '/v' + version + '/';    
    public static restAPIFullPrefix = (version : string = '1') => ':' + AppConfig.restAPIPort + '/v' + version + '/';   
}