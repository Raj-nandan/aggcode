import { useContext, useEffect, useState } from "react";
import { useSocket } from "./hooks/useSocket";
import { AppContext } from "./context/AppContext";
import "../styles/globals.css"
import type { Workspace } from "commons/types"


export function App() {
  const { loading, socket } = useSocket();
  const [ workspaces, setWorkspaces ] = useState<Workspace[]>([]);

 
  useEffect (() => {
    if(!loading && socket){
      socket.onmessage = (ev) => {
        const parsedData = JSON.parse(ev.data)
        if(parsedData.type === "init"){
          setWorkspaces(parsedData.workspaces) 
        } 
        if(parsedData.type === "workspace-created"){
          setWorkspaces(workspaces => workspaces.map(w => {
            if(w.id == null){
              return {
                ...w,
                ...parsedData.payload
              }
            }
            else{
              return workspaces;
            }
          }))
        }
      }
    }
  }, [socket])

  if(loading){
    <div>
      loading...
    </div>
  }


  return (
    <AppContext.Provider value={{ workspaces, socket, setWorkspaces }}>
      <div className="flex">
      <div  className="flex-1">
        <Sidebar />
      </div>

      <div className="flex-6">
        chat Window...
      </div>
    </div>
    </AppContext.Provider>
    
  );
}

function Sidebar(){
  const { socket, workspaces, setWorkspaces } = useContext(AppContext);
  const [path, setPath] = useState("");

  return <div>
    {JSON.stringify(workspaces)}
    <input placeholder="path" type="text" onChange={(e) => {
      setPath(e.target.value);
    }} />
    <button onClick={() => {
      setWorkspaces((w: Workspace[]) => [...w,  {
        path: path,
        id: null
      }])
      setPath("");
      socket?.send(JSON.stringify({
        type: "create-workspace",
        payload: {
          path
        }

      }))
    }}>
      Submit
    </button>
  </div>
}

export default App;
