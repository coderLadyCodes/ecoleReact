import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from './AuthProvider'

const NavBar = () => {
  const {role} = useAuth()
  return (
  <nav>
    <Link to={'/accueil'}><p>Accueil</p></Link>
    <div className='mainNave'>
    <div>
      { role == 'ADMIN' && (
        <ul>
          <li><Link  to='/users-view'>Liste des Parents</Link></li>
          <li><Link to='/view-students'>Liste des Eleves</Link></li>
          <li><Link to='/dashboard'>Profil</Link></li>
        </ul>
      )}
            { role == 'SUPER_ADMIN' && (
        <ul>
          <li><Link  to='/users-view'>Liste des Parents</Link></li>
          <li><Link to='/view-students'>Liste des Eleves</Link></li>
          <li><Link to='/dashboard'>Profil</Link></li>
        </ul>
      )}
            { role == 'PARENT' && (
        <ul>
          <li><Link to='/view-students'>Liste des Eleves</Link></li>
          <li><Link to='/dashboard'>Profil</Link></li>
        </ul>
      )}       
      </div>
    </div>
</nav>
  )
}

export default NavBar
