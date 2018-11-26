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
            //-----------FLIGHT CONTROLLER ---------------///
            client.on('newJoystickPossition', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('joystickPossitionChanged',data);
            });
            //-----------SCREEN INFORMATION ---------------///
            client.on('newBatteryLevel', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('batteryLevelChanged',data);
            });
            client.on('newAirlinkWifiLevel', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('airlinkWifiLevelChanged',data);
            });
            client.on('newGPSSignalStatus', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('gpsSignalStatusChanged',data);
            });
            client.on('newRCConnectionStatus', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('rcConnectionStatusChanged',data);
            });
            client.on('newSystemStatus', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('systemStatusChanged',data);
            });
            client.on('newFlightModeSwitch', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('flightModeSwitchChanged',data);
            });
            client.on('newFlightAssistantState', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('flightAssistantStateChanged',data);
            })
            client.on('newBatteryANeededRTH', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('batteryANeededRTHChanged',data);
            });
            client.on('newFlightTime', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('flightTimeChanged',data);
            });
            client.on('newHight', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('hightChanged',data);
            });
            client.on('newRadio', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('radioChanged',data);
            });
            client.on('newCoordinates', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('coordinatesChanged',data);
            });
            //-----------TAKE OFF , LANDING ---------------///
            client.on('newTakeOff', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('takeOffChanged',data);
            });
            client.on('newLanding', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('landingChanged',data);
            });
            client.on('newReturnToHome', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('returnToHomeChanged',data);
            });
            //-----------INFORMATION LOGS---------------///
            client.on('newInformation', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('informationChanged',data);
            });
            client.on('newError', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('errorChanged',data);
            });
            
                       
        });
        
        this.io.sockets.on('disconnect', (client: any) => {
            console.log('Disconnect ' +  client.id)            
        });
    };
    public notifyAll = (msgID: string, msgData: any) => {
        var jsonData=JSON.parse(JSON.stringify(msgData));
//        console.log("Server in "+msgID+":  "+jsonData['batteryLevel']);
        console.log("Server in "+msgID+":  "+jsonData);
        this.io.sockets.emit(msgID, JSON.stringify(msgData));
        
    };
}