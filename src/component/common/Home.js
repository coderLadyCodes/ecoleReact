import React from 'react'
import homeBackground from '../../images/homeBackground.jpg'
import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
  return (
    <div className='home-container'>
      <h1 className='home-title'>Site Des Ecoles</h1>
      <img
        className='home-background-img'
        src={homeBackground}
        alt='Home Page Image'
      />
      
      <section className='home-section'>
        <h2 className='home-text'>Pour Les Maternelles et Primaires</h2>
        <h2 className='home-link'>
          <Link to='/signup' className='home-signup-link'>Connexion/Inscription</Link>
        </h2>
      </section>
    </div>
  );
}

export default Home

