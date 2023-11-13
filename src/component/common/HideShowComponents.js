import React, { useEffect, useState} from 'react';
import { useLocation } from 'react-router-dom';

const HideShowComponents = ({children}) => {
    const location = useLocation();
    const [showNavBar, setShowNavBar] = useState(false);
    useEffect(() => {
        if(location.pathname === '/'){
            setShowNavBar(false);
        }else {
            setShowNavBar(true);
        }
    }, [location]);

  return (
    <div>{showNavBar && children}</div>
  )
}

export default HideShowComponents
