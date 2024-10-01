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
    const [userName, setUserName] = useState(null)
    const [userId, setUserId] = useState('')
    const [classroomId, setClassroomId] = useState(null)
    const navigate = useNavigate()

     useEffect(() => {

        const requestInterceptor = axios.interceptors.request.use(
          (config) => {
            config.withCredentials = true
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
                const newAccessToken = await refreshToken()
                 originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return axios(originalRequest)
              }catch (err) {
                console.error('Token refresh failed:', err)
                setUser(null)
                localStorage.removeItem('user')
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
      }, [navigate])

{/*      useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const userData = JSON.parse(storedUser)
          console.log("Stored user data found: ", userData)
          setUser(userData.username)
          setRole(userData.role)
          setUserName(userData.userName)
          setUserId(userData.userId)
        } else {
          console.log("No stored user data found")
        }
      }, [])*/}
 

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
                withCredentials: true,
              })
            
              const user = JSON.parse(response.config.data).username
              setUser(user)

              const role = response.data.role
              setRole(role)

              const userId = response.data.id
              setUserId(userId)

              const userName = response.data.userName
              setUserName(userName)

              const classroomId = response.data.classroomId
              setClassroomId(classroomId)

              localStorage.setItem('classroomId', classroomId)
              localStorage.setItem('user', JSON.stringify({userName, role, classroomId}))
              navigate('/dashboard')     
           
        } catch (error){
            console.error("error is : ", error)
            alert("Login failed. Please check your credentials.")
        }
        }

        const refreshToken = async () => {
          try {
            const response = await axios.post('http://localhost:8080/refresh-token',{}, {
              withCredentials: true,
            }) 
            const newAccessToken  = response.data.bearer
            cookies.set('token', newAccessToken, { path: '/', expires: new Date(Date.now() + 3600 * 1000) })
  
            return newAccessToken
          }catch (error) {
            console.error("Error refreshing access token:", error)
            throw error
          }
        }
     
        const logout = async () => {
            try{
                const res = await axios.post('http://localhost:8080/deconnexion',{},{withCredentials: true})
                setUser(null) 
                localStorage.removeItem('user')  
                cookies.remove('token', { path: '/' })
                cookies.remove('refresh', { path: '/' })
                setAuthentificationDTO({username: '', password: ''})
               
                navigate('/')
                
            }catch(error) {
                console.error(error)
                console.log("error logout : ", error)
                alert("Logout failed. Please try again.")
            }}
        

        return (
        <AuthContext.Provider value={{user, setUser, login, logout, handleInputChange, authentificationDTO, setAuthentificationDTO, refreshToken, userName, setUserName, role, setRole, userId, setUserId, classroomId}}>
            {children}
        </AuthContext.Provider> )
   
    }
    export const useAuth = () =>{
      return useContext(AuthContext)
  }

export default AuthProvider


