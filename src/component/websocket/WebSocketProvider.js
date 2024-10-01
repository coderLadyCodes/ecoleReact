import { Client, Stomp } from '@stomp/stompjs'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import SockJS from 'sockjs-client'

import { useAuth } from '../user/AuthProvider'
import axios from 'axios'

const WebSocketContext = createContext()


export const WebSocketProvider = ({children}) => {
    const {user, refreshToken, classroomId} =  useAuth()
    const[messages, setMessages]= useState([])
    const stompClientRef = useRef(null)
    //const [connecting, setConnecting] = useState(false)
    let webSocketConnected = false

    const fetchToken = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/get-token', {
                withCredentials: true 
            })

             if (response && response.data) {
                return response.data.token
            } else {
                console.warn('No data or token in response')
            }
        } catch (err) {
            console.error('Token fetch failed:', err)

            if (err.response && err.response.status === 401 && refreshToken) {

                try {
                    const newToken = await refreshToken() 
                    return newToken
                } catch (refreshError) {
                    console.error('Failed to refresh token:', refreshError)
                    throw refreshError
                }
            } else {
                throw err
            }
        }
    }

    //useEffect(()=> {
        const connectWebSocket = async (classroomId) =>{
            if (webSocketConnected || stompClientRef.current?.connected) {
                console.log('Already connected or currently connecting')
                return 
              }
            if (!user || !classroomId) {
                console.warn('User, Classroom ID, or connecting flag is not available')
                return
              }
              if (stompClientRef.current && stompClientRef.current.connected) {
                console.log('WebSocket is already connected')
                return
             }

             //if (connecting) {
                //console.log('WebSocket is already in the process of connecting')
                //return
             //}
             console.log("Connecting WebSocket...")
             webSocketConnected = true
             //setConnecting(true)

            let token

            try {
             token = await fetchToken()

            } catch (err) {
                console.error('Token fetch failed:', err)
                setConnecting(false)
                return
            }
           
            if (!token) {
                console.warn('No token available for WebSocket connection')
                //setConnecting(false)
                webSocketConnected = false
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
                    console.log('WebSocket connected')

                    client.subscribe(`/topic/classroom/${classroomId}`, (message) => {
                        console.log(`Subscribing to classroom ${classroomId}`)
                        try{
                           const parsedMessage = JSON.parse(message.body)
                           console.log('Received message:', parsedMessage) 

                           const messageContent = parsedMessage.message || parsedMessage.content || 'No message'
                           const userName = parsedMessage.user ? parsedMessage.user.name : 'Unknown'
                           const timestamp = parsedMessage.localDateTime || new Date().toISOString()
                           
                           if (typeof messageContent!== 'string' || messageContent.trim() === '') {
                            console.error('Message content is not a string')
                            return
                        }

                         setMessages((prevMessages) => { 
                            const updatedMessages = {
                            ...prevMessages,
                            [classroomId]: [
                                ...(prevMessages[classroomId] || []),
                                { content: messageContent, userName: userName, timestamp: timestamp },
                            ],
                        }
                        
                        console.log('Received message:', parsedMessage)
                        console.log('Updating messages for classroom::', updatedMessages)
                        return updatedMessages
                        })
                        }catch (err) {
                            console.error('Error parsing message:', err)
                        

                       
                    }})
       
                },
                onStompError: async (frame) => {
                    console.error('Broker reported error: ' + frame.headers['message'])
                    console.error('Additional details: ' + frame.body)
                    
                if (frame.headers['message'] === 'Token Expired'){
                    console.error('Token expired, attempting reconnection...')
                   try{
                    const newToken = await fetchToken()
                    console.log('Reconnecting with new token:', newToken)
                    client.connectHeaders.Authorization = `Bearer ${newToken}`
                    client.activate()
                   }  catch(err) {
                    console.error('Failed to reconnect with refreshed token:', err)
                   }
                }
                },
              })   

              client.activate()         
              stompClientRef.current = client
              //setConnecting(false)
              webSocketConnected = false
            }

        //if (user) {
            //connectWebSocket()
          //}

          const disconnectWebSocket  = () => {
            if(stompClientRef.current && stompClientRef.current.connected){
                stompClientRef.current.deactivate()
                stompClientRef.current = null
                webSocketConnected = false
                console.log('WebSocket disconnected')
            } 
        }

    //}, [user, classroomId, refreshToken])
    
    const sendMessage = (classroomId, messageObject) => {
        const message = messageObject.content
        if(stompClientRef.current && stompClientRef.current.connected) {
            //if (!classroomId || classroomId === 'undefined') {
                //console.error('classroomId is undefined or null.')
                //return
           // }

            stompClientRef.current.publish({destination: `/app/chat.sendMessage/${classroomId}`,
                body: JSON.stringify({ classroomId, message: message }),
            })
        }else {
            console.warn('Stomp client is not connected')
        }
    }

  return (
   <WebSocketContext.Provider value={{messages, sendMessage, connectWebSocket, disconnectWebSocket}}>
    {children}
   </WebSocketContext.Provider>
  )
}
export const useWebSocket = () =>{
    return useContext(WebSocketContext)
}

export default WebSocketProvider