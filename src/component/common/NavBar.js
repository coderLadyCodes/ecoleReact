import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
  <nav className="navbar navbar-expand-lg  navbar-dark bg-danger mb-5">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/"}>Ecole S.M</Link>

    <div className="collapse navbar-collapse" id="navbarNav">
      <li className='nav-item dropdown'  style={{listStyle:'none'}}>
        <a className='nav-link dropdown-toggle' href="#" role='button' data-bs-toggle='dropdown'>SECTION PARENTS</a>
        <ul className='dropdown-menu'>
          <li className='dropdown-item'><Link className="nav-link active" aria-current="page" to={"/view-users"}>Liste des Parents</Link></li>
          <li className='dropdown-item'><Link className="nav-link" to={"/add-user"}>Ajouter un Parent</Link></li>
        </ul>
      </li>

    </div>
  </div>
</nav>
  );
};

export default NavBar
