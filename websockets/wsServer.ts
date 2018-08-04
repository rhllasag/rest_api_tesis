import {TicTacToeGame, GameStatus, TIMEOUT} from '../social_model/game';
import {AuthUtil, UserInfo} from '../security/auth.util';

const io = require('socket.io');
export class WebSocketServer {
    private contadorSocketMessages = 0;
    public io: any;
    public users:Map<any,string> = new Map<string,string>();

    public init = (server: any) => {
        let wsServer: WebSocketServer= this;
        this.io = io.listen(server);    
        
        this.io.sockets.on('connection', (client: any) => {
            client.on('newTest', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('testCreated',data);
            });
            client.on('newJoystickPossition', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('joystickPossitionChanged',data);
            });
        });
        this.io.sockets.on('chat', (client: any) => {
            console.log('chat ' +  client)            
        });
        this.io.sockets.on('disconnect', (client: any) => {
            console.log('Disconnect ' +  client.id)            
        });
    };
    public notifyAll = (msgID: string, msgData: any) => {
        console.log("Server:  "+msgData);
        this.io.sockets.emit(msgID, msgData);
        
    };
}