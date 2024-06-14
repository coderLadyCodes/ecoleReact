import React, { useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'

const HideShowComponents = ({children}) => {
    const location = useLocation()
    const [showNavBar, setShowNavBar] = useState(false)
    useEffect(() => {
        if(location.pathname === '/' || location.pathname === '/signup' || location.pathname ==='/connexion'
          || location.pathname === '/activation' || location.pathname ==='/identification'){
            setShowNavBar(false)
        }else {
            setShowNavBar(true)
        }
    }, [location])

  return (
    <div>{showNavBar && children}</div>
  )
}

export default HideShowComponents
