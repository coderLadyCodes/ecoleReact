import React from 'react';
import {Link} from 'react-router-dom';

const NavBar = () => {
  return (
  <nav className="navbar navbar-expand-lg  navbar-dark bg-danger mb-5">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/"}>Ecole S.M</Link>
    {/*<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
  </button> */}
    <div className="collapse navbar-collapse" id="navbarNav">
      <li className='nav-item dropdown'  style={{listStyle:'none'}}>
        <a className='nav-link dropdown-toggle' href="#" role='button' data-bs-toggle='dropdown'>USER</a>
        <ul className='dropdown-menu'>
          <li className='dropdown-item'><Link className="nav-link active" aria-current="page" to={"/view-users"}>Liste des Utilisateurs</Link></li>
          <li className='dropdown-item'><Link className="nav-link" to={"/add-users"}>Ajouter un Utilisateur</Link></li>
        </ul>
      </li>
      {/*<ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/view-users"}>Liste des Utilisateurs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/add-users"}>Ajouter un Utilisateur</Link>
        </li>
      </ul> */}
    </div>
  </div>
</nav>
  );
};

export default NavBar
