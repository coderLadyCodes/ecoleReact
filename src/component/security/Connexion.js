import { Link} from 'react-router-dom'
import { useAuth } from '../user/AuthProvider'
import './Connexion.css'

const Connexion = () => {
const {login, authentificationDTO, handleInputChange} = useAuth()

  return (
    <div className='connexion-container'>
      <h2 className='connexion-title'>Connexion</h2>
      <form onSubmit={login} method='post' className='connexion-form'>
        <div className='connexion-input'>
          <label htmlFor='username' className='connexion-label'>Email</label>
          <input
            placeholder='Email'
            type='email'
            name='username'
            onChange={handleInputChange}
            value={authentificationDTO.username}
            required
            className='connexion-text-input'
          />
        </div>

        <div className='connexion-input'>
          <label htmlFor='password' className='connexion-label'>Mot de Passe</label>
          <input
            placeholder='mot de passe'
            type='password'
            name='password'
            onChange={handleInputChange}
            value={authentificationDTO.password}
            required
            className='connexion-text-input'
          />
          <p className='forgot-password-link'>
            <Link to='/change-password'>Mot de passe oublié? Réinitialiser le mot de passe</Link>
          </p>
        </div>

        <div className='connexion-submit-container'>
          <button type='submit' className='connexion-submit-btn'>Connecter</button>
        </div>
      </form>
    </div>
  )
}

export default Connexion