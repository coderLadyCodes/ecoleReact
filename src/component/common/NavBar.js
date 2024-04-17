import React from 'react'
import {Link,useParams} from 'react-router-dom'

const NavBar = () => {

const {id, userId} = useParams()
//const {pathname} = useLocation()
  return (
  <nav>
  <div>
    <Link to={"/"}>Ecole S.M</Link>

    <div id="navbarNav">
      <li  style={{listStyle:'none', marginLeft:'2rem'}}>
        <a href="#" role='button' data-bs-toggle='dropdown'>SECTION PARENTS</a>
        <ul>
          <li><Link  to="/view-users">Liste des Parents</Link></li>
          <li><Link  to="/add-user">Ajouter un Parent</Link></li>
          <li><Link  to={`/user-profile/${id}`}>Profil Complet du Parent</Link></li>
          {/*<li className='dropdown-item'><Link className="nav-link" to="/user-profile/:userId">Profil Complet du Parent</Link></li>*/}
        </ul>
      </li>

      <li style={{listStyle:'none', marginLeft:'2rem'}}>
        <a href="#">SECTION ELEVES</a>
        <ul>
          <li><Link to="/view-students">Liste des Eleves</Link></li>
          {/*<li className='dropdown-item'><Link className="nav-link" to="/student-profile/userId">Enfant</Link></li>*/}
          {/*<li className='dropdown-item'><Link className="nav-link" to={"/add-student"}>Ajouter un Eleve</Link></li>*/}
        </ul>
      </li>

      <li style={{listStyle:'none', marginLeft:'2rem'}}>
        <a href="#" role='button'>Articles</a>
        <ul>
          <li><Link to="/add-post">créer un article</Link></li>
        </ul>
      </li>
    </div>
  </div>
</nav>
  )
}

export default NavBar
