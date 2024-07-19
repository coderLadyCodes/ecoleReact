import { Link} from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'

const Connexion = () => {
const {login, authentificationDTO, handleInputChange} = useAuth()

  return (
    <div>
      <h2>Connexion</h2>
      <form onSubmit={login} method='post'>
      <div>
            <label htmlFor='username'>Email</label>
            <input placeholder='Email' type='email'name='username' onChange={handleInputChange} value={authentificationDTO.username} required/>
      </div>
      <div>
            <label htmlFor='password'>Mot de Passe</label>
            <input placeholder='mot de passe' type='password' name='password' onChange={handleInputChange} value={authentificationDTO.password} required/>
            <p><Link to={'/change-password'}  type='submit'>Mot de passe oublié? réinitialiser le mot de passe</Link></p>
      </div>
      <div>
              <button type='submit'>Connecter</button>
      </div>
      </form>
    </div>
  )
}

export default Connexion