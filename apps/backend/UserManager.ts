import { WebSocket } from "ws";

interface User {
    socket: WebSocket;
}

export class UserManager {
    private users : User[];
    private static instance: UserManager;
    constructor(){
        this.users = [];
    }

    static getInstance(): UserManager {
         if(UserManager.instance){
            return UserManager.instance;
         }
         UserManager.instance = new UserManager();
         return UserManager.instance;
    }

    addUser(ws: WebSocket){
        this.users.push({
            socket:ws
        });

        ws.on("message", (msg) =>{
            try{
                const parsedMesage = JSON.parse(msg.toString());

            } catch(e){
                console.log(`User sent non JSON input`);
                console.log(msg.toString());
            }
    
        })

        ws.on("close", () =>{
            this.users = this.users.filter(x => x.socket != ws);
        })
    }

}