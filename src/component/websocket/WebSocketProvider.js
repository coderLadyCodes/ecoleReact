import { Client, Stomp } from '@stomp/stompjs'
import React, { createContext, useContext, useEffect, useState } from 'react'
import SockJS from 'sockjs-client'

import { useAuth } from '../user/AuthProvider'
import axios from 'axios'

const WebSocketContext = createContext()


export const WebSocketProvider = ({children}) => {
    const {user, refreshToken} =  useAuth()
    const [stompClient, setStompClient] = useState(null)
    const[messages, setMessages]= useState([])

    const fetchToken = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/get-token', {
                withCredentials: true 
            })
        
            return response.data.token   

        } catch (err) {
            console.error('Token fetch failed:', err)
            throw err
        }
    }

    useEffect(()=> {
        const connectWebSocket = async () =>{
            if (!user) {
            
                return
              }

            let token
            try {
             token = await fetchToken()

            } catch (err) {
                console.error('Token fetch failed:', err)
                return
            }

            {/*if(!token){

                try {
                    token = await refreshToken()
                    console.log('Token after refresh:', token)
                    
                } catch (err) {
                    console.error('Token refresh failed:', err)
                }
            } */}
           
            if (!token) {
                console.warn('No token available for WebSocket connection')
                return
            }

              const socket = new SockJS('http://localhost:8080/ws', null, {
                           transports: ['websocket', 'xhr-streaming'],
                           })

              const client = new Client({
                webSocketFactory: () => socket,
                connectHeaders: {
                    Authorization: `Bearer ${token}`,
                  },
                reconnectDelay: 5000,  
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
                onConnect: () => {

                    const classroomId = user.classroomId
                    if (classroomId){

                    client.subscribe('/topic/classroom', (message) => {
                        const parsedMessage = JSON.parse(message.body)
                        const { classroomId, content, userName } = parsedMessage   

                        setMessages((prevMessages) => ({ 
                            ...parsedMessage,
                            [classroomId]: [
                                ...(prevMessages[classroomId] || []),
                                { content, userName },
                            ],
                        }))
                    })
                } else{
                    console.warn('Classroom ID is not available for subscription')
                }
                },
                onStompError: (frame) => {
                    console.error('Broker reported error: ' + frame.headers['message'])
                    console.error('Additional details: ' + frame.body)
                },
              })   

              client.activate()        
              setStompClient(client) 
            }

        if (user) {
            connectWebSocket()
          }
       
        return () => {
            if (stompClient) stompClient.deactivate()
        
        }

    }, [user, refreshToken])

    const sendMessage = (classroomId, message) => {
        if(stompClient && stompClient.connected) {
            if (!classroomId || classroomId === "undefined") {
                console.error('classroomId is undefined or null.')
                return
            }

            stompClient.publish({destination: `/app/chat.sendMessage/${classroomId}`,
                body: JSON.stringify({ classroomId, ...message }),
            })
        }else {
            console.warn('Stomp client is not connected')
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