import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from './AuthProvider'

const NavBar = () => {
  return (
  <nav>
    <Link to={'/'}><p>Ecole S.M</p></Link>
    <Link to='/accueil'>Accueil</Link>
    <div className='mainNave'>
    <div>
        <ul>
          <li><Link  to='/view-users'>Liste des Parents</Link></li>
          <li><Link to='/view-students'>Liste des Eleves</Link></li>
          <li><Link to='/dashboard'>Profil</Link></li>
        </ul>
      </div>
    </div>
</nav>
  )
}

export default NavBar
