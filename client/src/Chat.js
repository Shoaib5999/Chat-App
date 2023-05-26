import React, { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
function Chat({socket,username,room}) {
const [currentMessage , setCurrentMessage] = useState("");
const[messageList,setMessageList] = useState([])
const sendMessage=async()=>{
   
    if(currentMessage!==""){
        const messageData={
            room:room,
            author:username,
            message:currentMessage,
            time:new Date(Date.now()).getHours() + ":"+new Date(Date.now()).getMinutes()
        }
        
        await socket.emit("send_data",messageData) //you can use socket.emit on the client side to send data or trigger events to the server. It allows you to emit custom events along with any associated data.
        setMessageList((list)=>[...list,messageData])  //this means we are spreading the list then adding messageData to its last
        
        setCurrentMessage("")
    }
}
useEffect(()=>{
    socket.on("receive_message", (data)=>{
        // console.log(data)
        setMessageList((list)=>[...list,data]) //it is going to set message list as the message list it was before and then add then new message data to it

    })
},[socket])
  return (
    <div className='chat-window'>
        <div className='chat-header'>
            <p>Live Chat</p>
        </div>
        <div className='chat-body'>
        <ScrollToBottom className="message-container">
            {messageList.map((messageContent)=>{
                return (
                    <div className='message'
                    id={username===messageContent.author? "you" : "other"}>
                        <div>
                            <div className='message-content'>
                                <p>{messageContent.message}</p>
                             
                            </div>
                            <div className='message-meta'>
                            <p id='time'>{messageContent.time}</p>
                                <p id='author'>{messageContent.author}</p>
                            </div>
                        </div>
                    </div>
                )
            })}
            </ScrollToBottom>
        </div>
        <div className='chat-footer'>
            <input type="text" value={currentMessage} placeholder='Hey...'
                onChange={(event)=>{
                    setCurrentMessage(event.target.value)
                }}
                onKeyPress={(event)=>{
                    event.key==="Enter"&& sendMessage()
                }}
            />
            <button onClick={sendMessage}>&#9658;</button>
        </div>
    </div>
  )
}

export default Chat