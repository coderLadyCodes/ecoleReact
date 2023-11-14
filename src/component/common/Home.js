import React from 'react';
import homeBackground from '../../images/homeBackground.jpg';

function Home() {
  return (
    <div style={{display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
      <h1  style={{position:'absolute', top:'2.2%',fontFamily:'Splash, cursive', fontSize:'2.2rem', fontWeight:'bolder', color:'magenta'}}>Bienvenue à l'école Stuart Mill</h1> 
      <img className='img-fluid'
      src={homeBackground}
      style={{width: '100%', height:'100vh', backgroundSize:'cover', backgroundRepeat: 'no-repeat',backgroundPosition: 'center'}}
      alt='Home Page Image'/>  

      <section style={{width:'100%', position:'absolute', display:'flex',flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
      <h2 style={{fontFamily:'Bad Script, cursive', color:'magenta'}}>Moyenne Section</h2>
      <h2 className='h2home' style={{fontFamily:'Sulphur Point', color:'white', padding:'12px', border:'1px solid', borderRadius:'2%', cursor:'pointer'}}>Connexion/Inscription</h2>
      </section>
    </div>
  )
}

export default Home
