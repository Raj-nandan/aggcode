import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [ws, setWs] = useState(new WebSocket("ws://localhost:3000"))

  useEffect(() =>{
    ws.onopen = () =>{
      if(ws){
        ws.send("Hello from frontend");
      }
    }

  }, [ws])

  return (
    <>
      Hi there!
    </>
  )
}

export default App
