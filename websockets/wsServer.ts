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
            client.on('connectSocket', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('connectSocketChanged',data);
            });
            client.on('disconnectSocket', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('disconnectSocketChanged',data);
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
            client.on('newBatteryState', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('batteryStateChanged',data);
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
            client.on('newHomeLocation', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('homeLocationChanged',data);
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
            client.on('newReturnToHomeQuestion', (data) => { 
                wsServer.contadorSocketMessages++;  
                this.notifyAll('returnToHomeQuestionChanged',data);
            });
            client.on('newReturnToHomeDecision', (data) => { 
                wsServer.contadorSocketMessages++;  
                this.notifyAll('returnToHomeDesicionChanged',data);
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
            //-----------CONFIG FLIGHT MISSIONS-----------------------//
            client.on('newHome', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('homeChanged',data);
            });
            client.on('addWaypoints', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('addWaypointsChanged',data);
            });
            client.on('clearWaypoints', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('clearWaypointsChanged',data);
            });
            client.on('newAltitudeWaypoints', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('newAltitudeWaypointsChanged',data);
            });
            client.on('newSpeedWaypoints', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('newSpeedWaypointsChanged',data);
            });
            client.on('uploadWaypointsMission', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('uploadWaypointsMissionChanged',data);
            });
            client.on('startWaypointsMission', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('startWaypointsMissionChanged',data);
            });
            client.on('endWaypointsMission', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('endWaypointsMissionChanged',data);
            });
            client.on('newActionAfterMission', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('actionAfterMissionChanged',data);
            });
            client.on('newHeading', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('headingChanged',data);
            });
            //------ CONFIG AIRCRAFT Battery----------------//
            client.on('newLowBatteryWarningThreshold', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('lowBatteryWarningThresholdChanged',data);
            });
            client.on('newSeriousLowBatteryWarningThreshold', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('seriousLowBatteryWarningThresholdChanged',data);
            });
            client.on('newConfirmSmartReturnToHomeRequest', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('confirmSmartReturnToHomeRequestChanged',data);
            });
             //------ CONFIG AIRCRAFT Proximity Sensors----------------//
             client.on('newSmartRTH', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('smartRTHChanged',data);
            });
            client.on('newAnticollision', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('anticollisionChanged',data);
            });
            client.on('newHorizontalAnticollision', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('horizontalAnticollisionChanged',data);
            });
            client.on('newBeginnerMode', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('beginnerModeChanged',data);
            });
            client.on('newMaximumAltitude', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('maximumAltitudeChanged',data);
            });
            client.on('newLimitDistance', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('limitDistanceChanged',data);
            });
            client.on('newMaximumFlightDistance', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('maximumFlightDistanceChanged',data);
            });
            //------ CONFI   Panels----------------//
            client.on('newJoystickPanel', (data) => {
                wsServer.contadorSocketMessages++;  
                this.notifyAll('joystickPanelChanged',data);
            });
        });
        
        this.io.sockets.on('disconnect', (client: any) => {
            console.log('Disconnect ' +  client.id)            
        });
    };
    public notifyAll = (msgID: string, msgData: any) => {
        var jsonData=JSON.parse(JSON.stringify(msgData));
        console.log("Server in "+msgID+":  "+jsonData);
        this.io.sockets.emit(msgID, JSON.stringify(msgData));
        
    };
}