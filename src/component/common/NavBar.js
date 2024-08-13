import React from 'react'
import {Link} from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'

const NavBar = () => {
  const {role} = useAuth()
  return (
  <nav>
    <div className='mainNave'>
    <div>
      { role == 'ADMIN' && (
        <ul>
          <li><Link to='/dashboard'>Profil</Link></li>
          <li><Link to='/accesscode'>Acceder à la classe</Link></li>
        </ul>
      )}
            { role == 'SUPER_ADMIN' && (
        <ul>
          <li><Link to='/dashboard'>Profil</Link></li>
          <li><Link  to='/users-view'>Liste des Utilisateurs</Link></li>
          <li><Link to='/students-view'>Liste des Eleves</Link></li>
          <li><Link to='/accesscode'>Acceder à la classe</Link></li>
          <li><Link to='/classrooms'>Acceder aux Classes</Link></li>
        </ul>
      )}
            { role == 'PARENT' && (
        <ul>
          <li><Link to='/kids-parent'>Mes enfants</Link></li>
          <li><Link to='/dashboard'>Profil</Link></li>
          <li><Link to='/accesscode'>Acceder à la classe</Link></li>
        </ul>
      )}       
      </div>
    </div>
</nav>
  )
}

export default NavBar
