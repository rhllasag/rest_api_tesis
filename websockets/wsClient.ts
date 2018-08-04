
import {TicTacToeGame, GameStatus, TIMEOUT} from '../social_model/game';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import {AuthUtil, UserInfo} from '../security/auth.util';
const io = require('socket.io-client');
class SocketError extends Error {
    constructor(m: string) {
        super(m);
    }
}
export class WebSocketClient 
{
    public socket;
    constructor() {
        if (!this.socket) {
            this.socket = io('http://192.168.1.5:80');  // URL to webSockets                     
        }
    }

    newJoystickPossition(data: any) {
        this.socket.emit('newJoystickPossition', { 'data': data });
    }
    joystickPossitionChanged(): Observable<any>{
        
        return this.listenOnChannel('joystickPossitionChanged');
    }
    private listenOnChannel(channel: string):Observable<any> {
        return new Observable((observer: any) => {
            this.socket.on(channel, (data: any) => {
                console.log(data);
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