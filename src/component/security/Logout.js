import React from 'react'
import { useAuth } from '../user/AuthProvider'

const Logout = () => {
  const auth = useAuth()
  return (
    <div>
      <button onClick={()=> auth.Logout()}>Deconnecter</button>
    </div>
  )
}

export default Logout