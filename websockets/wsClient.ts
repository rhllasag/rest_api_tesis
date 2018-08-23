
import {TicTacToeGame, GameStatus, TIMEOUT} from '../social_model/game';
import { Observable, Subject, ReplaySubject, from, of, range } from 'rxjs';
import {AuthUtil, UserInfo} from '../security/auth.util';
const darknet = require('@moovel/yolo');
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
            this.socket = io('http://192.168.140.110:8080');  // URL to webSockets                     
        }
    }

    newJoystickPossition(data: any) {
        //console.log("image det");
        this.socket.emit('newJoystickPossition', { 'data': data });
    }
    joystickPossitionChanged(): Observable<any>{
        //console.log("image detection");
        // darknet.detectImage({
        //     cfg: './cfg/yolo.cfg',
        //     weights: './yolo.weights',
        //     data: './cfg/coco.data',
        //     image: './data/dog.jpg',
        //     thresh: 0.24, // optional, default: 0.24
        //     hierThresh: 0.5, // optional, default: 0.5,
        //   }, function(modified, original, detections, dimensions) {
            
        //   });
          
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