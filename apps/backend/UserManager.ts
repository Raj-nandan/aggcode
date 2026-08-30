import { uuid } from "uuidv4";
import { WebSocket } from "ws";
import { User } from "./User";


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
        const id = uuid();
        const user = new User(id, ws);
        this.users.push(user);

        ws.on("message", async(msg) =>{
            try{
                const parsedMesage = JSON.parse(msg.toString());
                const responsePayload = await user.handleIncomingMessage(parsedMesage); 
                user.sendMessage(responsePayload);

            } catch(e){
                console.log(`User sent non JSON input`);
                console.log(msg.toString());
            }
    
        })

        ws.on("close", () =>{
            this.users = this.users.filter(x => x.id != id);
        })
    }

}