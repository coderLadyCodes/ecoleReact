import { Stomp } from '@stomp/stompjs'
import React, { createContext, useContext, useEffect, useState } from 'react'
import SockJS from 'sockjs-client'
import Cookies from 'universal-cookie'
import { useAuth } from '../user/AuthProvider'

const WebSocketContext = createContext()
const cookies = new Cookies()

export const WebSocketProvider = ({children}) => {
    const {user, refreshToken} =  useAuth()
    const [stompClient, setStompClient] = useState(null)
    const[messages, setMessages]= useState([])

    useEffect(()=> {
        const connectWebSocket = async () =>{
            if (!user) {
                console.log('User not authenticated, skipping WebSocket connection')
                return
              }
            let token = cookies.get('token')
            console.log('Token before connection:', token)

            if(!token){
                token = await refreshToken()
                console.log('Token after refresh:', token)
            }
            if (token){
              const socket = new SockJS('http://localhost:8080/ws')
              const client = Stomp.over(socket)             

            client.connect({
                Authorization: `Bearer ${token}`, 
            }, () =>{
                console.log('Connected to WebSocket') 

                client.subscribe('/topic/classroom', (message) => {
                    const parsedMessage = JSON.parse(message.body)
                    const {classroomId, content, userName} = parsedMessage

                    setMessages((prevMessages)=> ({
                        ...parsedMessage,[classroomId]: [...(prevMessages[classroomId] || []), {content, userName},],
                    }))
                })
            },async (error) =>{
                console.error('WebSocket connection error: ', error)
           

            if  (error.headers && error.headers['message'] === 'Access Denied') {
                console.log('Token expired, refreshing...')
                const newToken = await refreshToken()
                if (newToken) {
                    connectWebSocket() 
                }
            }
            })
            setStompClient(client)
       
        return () => {
            if (client) client.disconnect()
        }
    }
    }
    connectWebSocket()

    }, [user, refreshToken])

    const sendMessage = (classroomId, message) => {
        if(stompClient && stompClient.connected) {
            stompClient.send(`/app/chat.sendMessage/${classroomId}`, {}, JSON.stringify({ classroomId, ...message }))
        }
    }

  return (
   <WebSocketContext.Provider value={{messages, sendMessage}}>
    {children}
   </WebSocketContext.Provider>
  )
}
export const useWebSocket = () =>{
    return useContext(WebSocketContext)
}

export default WebSocketProvider