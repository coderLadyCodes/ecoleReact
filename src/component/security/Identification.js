import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Identification = () => {
    const {userId} = useParams()

  return (
    <div>
        <h2>Bienvenue Sur Le Site De L'école Stuart Mill{userId} </h2>

        <Link to={'/connexion'}  type='submit'>Connectez Vous !</Link>
    </div>
  )
}
export default Identification