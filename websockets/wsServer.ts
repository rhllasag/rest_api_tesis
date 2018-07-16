import {TicTacToeGame, GameStatus, TIMEOUT} from '../social_model/game';
import {AuthUtil, UserInfo} from '../security/auth.util';

const io = require('socket.io');
export class WebSocketServer {
    private contadorSocketMessages = 0;
    public io: any;
    public users:Map<any,string> = new Map<string,string>();

    public init = (server: any) => {
        let wsServer: WebSocketServer= this;
        //wsServer.users = new Map<any, string>();
        
        this.io = io.listen(server);    
        
        this.io.sockets.on('connection', (client: any) => {
            console.error("Socket connected");
            client.on('newTest', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('testCreated',data);
            });
            client.on('newPost', (data) => {      
                wsServer.contadorSocketMessages++;   
                
                this.notifyAll('postCreated',data);           
            })
            client.on('newFriend', (data) => {      
                wsServer.contadorSocketMessages++;   
                
                this.notifyAll('invitationAccepted',data);           
            })
            client.on('newInvitation', (data) => {      
                wsServer.contadorSocketMessages++;   
                
                this.notifyAll('invitationCreated',data);           
            })
            client.on('deleteFriend', (data) => {      
                wsServer.contadorSocketMessages++;   
                
                this.notifyAll('friendDeleted',data);           
            })
            client.on('deleteInvitation', (data) => {      
                wsServer.contadorSocketMessages++;   
                this.notifyAll('friendDeleted',data);           
            })

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