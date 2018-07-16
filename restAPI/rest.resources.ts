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
    public createPost = (request: any, response: any, next: any) => {
        if (request.params.text == null) {
            console.error('RestDevelop.CreatePost: Invalid parameters');
            response.send(400, { 'msg': 'Invalid parameters' } || {});
            return next();
        }
        console.log(request.params.text);
        this.wsClient.newTest("test rhllasag");
        response.send(200, { 'msg': request.params.text } || {});
        return next();
    }
}
