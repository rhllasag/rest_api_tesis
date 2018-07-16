import {HandlerSettings} from '../app/handler.settings';
import {WebSocketServer } from '../websockets/wsServer';

export class RestBase{

    public handlerSettings: HandlerSettings;
    public wsServer: WebSocketServer;

    protected handleError = (err: string, response: any, next: any) => {
    	response.send(500, err);
	    next();
    }

    constructor(handlerSettings: HandlerSettings){
        this.handlerSettings = handlerSettings;
        this.wsServer = this.handlerSettings.wsServer;
    }
}
