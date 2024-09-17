import React, { useEffect, useState } from 'react'
import { useWebSocket } from './WebSocketProvider'
import { useParams } from 'react-router-dom'

const Chat = () => {

    const {classroomId} =  useParams()
    const {messages, sendMessage} = useWebSocket()
    const[input, setInput] = useState("")

    useEffect(() => {
        if (!classroomId) {
            console.error("No classroomId found!")
        }
    }, [classroomId])

    const handleSendMessage = () => {
        if (input.trim()){
            sendMessage(Number(classroomId), {content: input} )
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