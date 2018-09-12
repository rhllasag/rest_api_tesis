import {HandlerSettings} from '../app/handler.settings';
import {AppConfig} from '../app/app.config';
import {WebSocketServer} from '../websockets/wsServer';
import {PassportSecurity} from '../security/passport.security';

import { RestResources } from './rest.resources';

export class RestAPI_v1{

    private handlerSettings: HandlerSettings = null;
    private resources: RestResources;

    private url = (mainUrl: string) => this.handlerSettings.prefix + mainUrl;
    
    constructor (server: any, wsServer: WebSocketServer, passSecurity: PassportSecurity) {
        this.handlerSettings = new HandlerSettings( wsServer, passSecurity, AppConfig.restAPIPrefix('1'));
        this.resources= new RestResources(this.handlerSettings);
        server.post(this.url('joystick'),this.resources.joystrickPossition);
    };
}