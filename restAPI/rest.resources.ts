import { RestBase } from './rest.base';
import { HandlerSettings } from '../app/handler.settings';
import { AuthUtil, UserInfo } from '../security/auth.util';
import { AppConfig } from '../app/app.config';
import { on } from 'cluster';
import {WebSocketClient } from '../websockets/wsClient';
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require("mongodb").ObjectID;

export class RestResources extends RestBase {
    public wsClient: WebSocketClient;
    constructor(handlerSettings: HandlerSettings) {
        super(handlerSettings);
        this.wsClient=new WebSocketClient();
    }
    
    public joystrickPossition = (request: any, response: any, next: any) => {
        if (request.params.joystick == null) {
            console.error('RestDevelop.joystickPossition: Invalid parameters');
            response.send(400, { 'msg': 'Invalid parameters' } || {});
            return next();
        }
        console.log(request.params.joystick);
        this.wsClient.newJoystickPossition(request.params.joystick);
        // this.wsClient.joystickPossitionChanged().subscribe(
        //     success=>{console.log("The message is on the promise")},
        //     error=>{console.error}
        // );
        response.send(200, { 'msg': request.params.joystick } || {});
        return next();
    }
}
