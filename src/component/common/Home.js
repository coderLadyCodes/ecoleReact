import React from 'react';
import homeBackground from '../../images/homeBackground.jpg';

function Home() {
  return (
    <div className='container-fluid'>
      <img className='img-fluid'
      src={homeBackground}
      style={{width: '100%', height:'auto'}}
      alt='Home Page Image'
      
      />   
    </div>
  )
}

export default Home
