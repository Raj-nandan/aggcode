import type { Workspace } from "commons/types";
import { createContext } from "react";

export const AppContext = createContext<{
    workspaces: Workspace[],
    socket: WebSocket | null,
    setWorkspaces: any
}>({
    workspaces: [],
    socket: null,
    setWorkspaces: null
}) 