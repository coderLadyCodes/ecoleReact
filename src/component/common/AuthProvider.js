import axios from "axios"
import { createContext, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"

const AuthContext = createContext()
const cookies = new Cookies()
export const AuthProvider = ({children}) => {
    const [authentificationDTO, setAuthentificationDTO] = useState({
        username:'',
        password:'',
      })
    const [user, setUser] = useState(null)
    const [role, setRole] = useState('')
    const [token, setToken] = useState(null)
    const [userName, setUserName] = useState(null)
    const navigate = useNavigate()

     // Axios interceptor to include the token in all requests
     useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
          (config) => {
            const token = cookies.get('token')
            if (token) {
              config.headers.Authorization = `Bearer ${token}`
            }
            return config
          },
          (error) => {
            return Promise.reject(error)
          }
        )
        const responseInterseptor = axios.interceptors.response.use(
          (response) => response,
          async (error) => {
            const originalRequest = error.config
            if (error.response.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true
              try{
                const newToken = await refreshToken()
                axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
                originalRequest.headers['Authorization'] = `Bearer ${newToken}`
                return axios(originalRequest)
              }catch (err) {
                console.error('Token refresh failed:', err)
                setUser(null)
                setToken(null)
                navigate("/connexion")
                return Promise.reject(err)
              }
            }
            return Promise.reject(error)
          }
        )
    
        return () => {
          axios.interceptors.request.eject(requestInterceptor)
          axios.interceptors.response.eject(responseInterseptor)
        }
      }, [token, navigate])
      
        // end of interceptor

    const handleInputChange = (e) => {
    const {name, value} = e.target
    setAuthentificationDTO((prvAuthentificationDTO)=>({...prvAuthentificationDTO, [name]: value}))
    }
    const login = async (e) => {
     e.preventDefault()
        if(!authentificationDTO.username || !authentificationDTO.password){
            alert('Completez Tout Les Champs')
            return
          }
          if (!authentificationDTO.password.trim()) {
            alert('Le mot de passe ne peut pas être vide');
            return;
          }
        try {
            const response = await axios.post('http://localhost:8080/connexion',authentificationDTO,{
                headers: {
                  'Content-Type': 'application/json',
                   
                },
                withCredentials: true
              })

              setUser(JSON.parse(response.config.data).username)
              const token = response.data.bearer
              setToken(token)
              cookies.set('token', token, {httpOnly:true, secure:true, path: '/' }) 

              const role = response.data.role
              setRole(role)

              //DECODE TOKEN TO EXTRACT THE NAME OF THE USER
              const decodeToken = parseJwt(token)
              const userName = decodeToken.name
              setUserName(userName)
              navigate('/dashboard')  
           
        } catch (error){
            console.error("error is : ", error)
            alert("Login failed. Please check your credentials.")
        }
        }

         //DECODE TOKEN TO EXTRACT THE NAME OF THE USER
          const parseJwt = (token) => {
            try{
          const base64Url = token.split('.')[1]
          const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
          const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          }).join(''))
          return JSON.parse(jsonPayload)
            } catch (e) {
              console.error("Invalid JWT token", e)
              return null
            }
        }

        const refreshToken = async () => {
          try {
            const response = await axios.post('http://localhost:8080/refresh-token',{}, {
              withCredentials: true,
            })  
            const newToken = response.data.refresh  
            cookies.set('token', newToken, { path: '/' })    
            return newToken 
          }catch (error) {
            console.error("Error refreshing access token:", error)
            throw error
          }
        }
     
        const logout = async () => {
            try{
                const res = await axios.post('http://localhost:8080/deconnexion',{},{withCredentials: true})
                setUser(null)
                setToken(null)
                cookies.remove('token',token, { path: '/' })
                navigate('/')
                
            }catch(error) {
                console.error(error)
                console.log("error logout : ", error)
                alert("Logout failed. Please try again.")
            }}
        

        return (
        <AuthContext.Provider value={{user, setUser, login, token, setToken, logout, handleInputChange, authentificationDTO, setAuthentificationDTO, refreshToken, userName, setUserName, role, setRole}}>
            {children}
        </AuthContext.Provider> )
   
    }

export default AuthProvider

export const useAuth = () =>{
    return useContext(AuthContext)
}
