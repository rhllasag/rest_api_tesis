
import {TicTacToeGame, GameStatus, TIMEOUT} from '../social_model/game';
import {AuthUtil, UserInfo} from '../security/auth.util';
const io = require('socket.io-client');
class SocketError extends Error {
    constructor(m: string) {
        super(m);
    }
}
export class WebSocketClient 
{
    public socket = io('http://192.168.140.101:8080');
    constructor() {
        console.log("Socket created");
        if (!this.socket) {
            this.socket = io('http://192.168.140.101:8080');  // URL to webSockets                     
        }
    }
    newTest(data: any) {
        this.socket.emit('newTest', { 'data': data });
    }
}