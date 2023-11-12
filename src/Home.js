import React from 'react';
import homeBackground from './images/homeBackground.jpg';

function Home() {
  return (
    <div className='container'>
      <img className='img-fluid'
      src={homeBackground}
      style={{maxWidth: '100%', height:'auto'}}
      alt='Home Page Image'
      />   
    </div>
  )
}

export default Home
