import './App.css'
import io from 'socket.io-client'; //io for client side here we dont have to first require Server than make its essance and make it equal to the io

import{useState} from 'react'
import Chat from './Chat';

const socket = io.connect("http://localhost:3001"); //socket here is the variable here we are directing it to conenct with the localhost:3001

function App() {
  const [username,setUsername] = useState("")
  const [room,setRoom] = useState("")
  const [showChat,setShowChat]= useState(false)

  const joinRoom = () =>{
    if (username !== "" && room !== ""){
      socket.emit("join_room",room) //here using this function we are sending joining id to the backend
        setShowChat(true)
    }
    
  }

  return (
    <div className="App">
    {!showChat ? (
    <div className='joinChatContainer'>
    <h3>Join A Chat</h3>
    <input type="text" placeholder="shoaib..." onChange={(event)=>{
      setUsername(event.target.value)
      // console.log(username)
    }}/>
    <input type="text" placeholder="Room Id..." onChange={(event)=>{
      setRoom(event.target.value)
      // console.log(room)
    }}/>
    <button onClick={joinRoom}>JOIN A ROOM</button>
    </div>)
    :(
    <Chat socket={socket} username={username} room={room}/>)}
    </div>
  );
}

export default App;
