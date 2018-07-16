import {WebSocketServer } from '../websockets/wsServer';


export class HandlerSettings {
    public wsServer: WebSocketServer = null;
    public security: any = null;
    public prefix: string = '';

    constructor (wsServer: WebSocketServer, security: any, prefix: string) {
    
        this.wsServer = wsServer;
        this.security = security;
        this.prefix = prefix;
    } 
}