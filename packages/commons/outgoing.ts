import z from "zod";

export const WorkSpaceCreatedSchema = z.object({
    id: z.string(),
    name: z.string(),
    path: z.string(),
})

export type WorkSpaceCreatedSchemaType = z.infer<typeof WorkSpaceCreatedSchema>;

export const SessionCreatedSchema = z.object({
    id: z.string(),
}) 

export type SessionCreatedSchemaType = z.infer<typeof SessionCreatedSchema>;

export const MessageAddedSchema = z.object({
    id: z.string(),
})

export type MessageAddedSchemaType = z.infer<typeof MessageAddedSchema>;


export type OutgoingMessageType = 
    {type: "workspace-created", payload : WorkSpaceCreatedSchemaType} | 
    {type: "session-created", payload:  SessionCreatedSchemaType} |
    {type: "message-added", payload: MessageAddedSchemaType} | {
     type: "init",  workspaces: Workspace[]
    };


export type Workspace = {
    id: string,
    name: string,
    path: string,
    sessions: Session[]
}

export type Session = {
    id: string,
    messages: Message[]
}

type Message = {
    id: string,
    role: "user",
    payload: {
        message: string
    }
} | {
    role: "assistant",
    payload: {
        message: any
    }
}