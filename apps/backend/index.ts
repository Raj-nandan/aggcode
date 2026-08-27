import { WebSocketServer } from "ws";
import mongoose from "mongoose";
import { WorkspaceModel } from "db/client";
import { CreateWorkspaceSchema } from "commons/types";
import { UserManager } from "./UserManager";


mongoose.connect(process.env.DB_URL!).then(() =>{
    console.log("Connected to database✅✅");
})
.then(() =>{
    const server = new WebSocketServer({ port: 3000 });

    server.on("connection", (ws) => {
        console.log("Client connected✅✅");
    
        UserManager.getInstance().addUser(ws); 
    });
})



