import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from './AuthProvider'

const NavBar = () => {
  return (
  <nav>
    <Link to={'/accueil'}><p>Accueil</p></Link>
    <div className='mainNave'>
    <div>
        <ul>
          <li><Link  to='/users-view'>Liste des Parents</Link></li>
          <li><Link to='/view-students'>Liste des Eleves</Link></li>
          <li><Link to='/dashboard'>Profil</Link></li>
        </ul>
      </div>
    </div>
</nav>
  )
}

export default NavBar
