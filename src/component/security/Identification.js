import React from 'react'
import { Link, useParams } from 'react-router-dom'
import './Identification.css'

const Identification = () => {
    const {userId} = useParams()

  return (
    <div className='identification-container'>
        <h2 className='identification-title'>Bienvenue Sur Le Site De L'école Stuart Mill{userId} </h2>

        <Link to={'/connexion'}  type='submit'>Connectez Vous !</Link>
    </div>
  )
}
export default Identification