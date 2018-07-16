
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
    testCreated(){
        console.log("on testCreated");
        return this.listenOnChannel('testCreated');
    }
    private listenOnChannel(channel: string) {
        return ((observer: any) => {
            this.socket.on(channel, (data: any) => {
                observer.next(data);
            });
            return () => {
                this.socket.removeEventListener(channel);
                //this.socket.disconnect();

                // NOTA: MUITO IMPORTANTE
                // Se usar o sicket disconnect, quando se faz unsubscribe, o socket é fechada!!!!
                // Em vez disso remove-se apenas os listeners para esse socket, mantendo o socket aberto
            }
        });
    }
}