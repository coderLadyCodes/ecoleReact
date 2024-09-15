import React, { useState } from 'react'
import { useWebSocket } from './WebSocketProvider'

const Chat = ({classroomId}) => {
    const {messages, sendMessage} = useWebSocket()
    const[input, setInput] = useState("")

    const handleSendMessage = () => {
        if (input.trim()){
            sendMessage(classroomId, {content: input} )
            setInput('')
        }
    }
  return (
    <div>
        <div>
            {(messages[classroomId] || []).map((msg, index)=> (
                <div key={index}>
                <strong>{msg.userName} : </strong> {msg.content}
                </div>
            ))}
        </div>
        <input type='text' value={input} onChange={(e) => setInput(e.target.value)}/>
        <button onClick={handleSendMessage}> Envoyer</button>
    </div>
  )
}

export default Chat