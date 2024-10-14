import React, { useEffect, useState } from 'react'
import { useWebSocket } from './WebSocketProvider'
import { useLocation, useParams } from 'react-router-dom'
import './Chat.css'

const Chat = () => {
    const location = useLocation()
    const {users} = location.state || {}
    const {classroomId} =  useParams()
    const {messages, sendMessage, connectWebSocket, disconnectWebSocket} = useWebSocket()
    const[input, setInput] = useState("")

    useEffect(() => {
        if (classroomId) {
            connectWebSocket(classroomId) 
        }
        return () => {
          disconnectWebSocket() // Disconnect when leaving the chat
      }
    }, [classroomId])

    const handleSendMessage = () => {
        if (input.trim()){
            sendMessage(Number(classroomId), {content: input} )
            setInput('')
        }
    }

     // Trigger send on pressing Enter key
     const handleKeyDown = (event) => {
      if (event.key === 'Enter' && !event.shiftKey) { // Prevents sending when Shift + Enter is pressed for new line
          event.preventDefault()
          handleSendMessage()
      }
  }

    const formatedDateTime = (timestampe) => {
      const date = new Date(timestampe)
      return date.toLocaleString()
    }

  return (
    <div className="chat-container">
    
    {/*<div className="user-list">
      <h3>Users</h3>
      <ul>
    {users && users.length > 0 ? (
      users.map((user, index) => (
        <li key={index} className="user-item">{user.userName}</li>
      ))
    ) : (
      <div></div>
    )}
  </ul>
    </div>*/}

    <div className='chat-content'>
      <div className='messages'>
        {(messages[classroomId] || []).map((msg, index) => (
          <div key={index} className="message">
            {msg.userName}:  <strong>{msg.content}</strong>
            <div className='timestamp'>
              <em>{formatedDateTime(msg.timestamp)}</em>
            </div>
          </div>
        ))}
      </div>
      <div className='message-input'>
        <textarea 
          type='text' 
          value={input} 
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}  
          placeholder='Votre message ici...'
           rows='1'
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  </div>
  )
}

export default Chat