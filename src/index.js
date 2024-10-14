import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import AuthProvider from './component/user/AuthProvider'
import { BrowserRouter as Router } from 'react-router-dom'
import WebSocketProvider from './component/websocket/WebSocketProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
  <Router>
     
  <AuthProvider>
  <WebSocketProvider>
    <App />
  </WebSocketProvider>
  </AuthProvider>
  
  </Router>
  </React.StrictMode>
)

