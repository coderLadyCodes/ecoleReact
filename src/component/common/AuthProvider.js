import axios from "axios"
import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom"

const AuthContext = createContext()
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const navigate = useNavigate()
 
    const login = async (username, password) => {
        try {
            const response = await axios.post('http://localhost:8080/connexion',JSON.stringify({ username, password }),{
                headers: {
                  'Content-Type': 'application/json',
                  ['Authorization']: `Bearer ${token}`,
                }
              })
              if(response.status === 200){
                console.log("response body is : ", response)
                setUser(response.user)
                console.log("user is ", user)
                navigate("/dashboard")
              }
            
           
        } catch (error){
            console.error("error is : ", error)
        }
        }
     
        const logout = async () => {
            try{
                await axios.post('http://localhost:8080/logout', { withCredentials: true })
                setUser(null)
                //setToken("")
               // localStorage.removeItem("token")
                navigate("/connexion")
            }catch(error) {
                console.error(error)
            }
          
        }
        return (
        <AuthContext.Provider value={{ user, setUser, login,token, setToken, logout}}>
            {children}
        </AuthContext.Provider> )
   
    }

export default AuthProvider

export const useAuth = () =>{
    return useContext(AuthContext)
}
