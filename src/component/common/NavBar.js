import React from 'react';
import {Link, link} from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to={"/"}>Ecole S.M</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to={"/view-users"}>Liste des Utilisateurs</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={"/add-user"}>Ajouter un Utilisateur</Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
  );
};

export default NavBar
