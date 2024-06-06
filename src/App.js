import './App.css'
import Home from './component/common/Home'
import UsersView from './component/user/UsersView'
import NavBar from './component/common/NavBar'
import { BrowserRouter  as Router, Routes, Route, Navigate} from 'react-router-dom'
import EditUser from './component/user/EditUser'
import AddStudent from './component/student/AddStudent'
import StudentsView from './component/student/StudentsView'
import StudentProfile from './component/student/StudentProfile'
import EditStudent from './component/student/EditStudent'
import HideShowComponents from './component/common/HideShowComponents'
import ViewUser from './component/user/ViewUser'
import AddPost from './component/post/AddPost'
import PostView from './component/post/PostView'
import Signup from './component/common/Signup'
import Activation from './component/common/Activation'
import Connexion from './component/common/Connexion'
import Logout from './component/common/Logout'
import Identification from './component/common/Identification'
import Dashboard from './component/common/Dashboard'
import ChangePassword from './component/common/ChangePassword'
import AuthProvider, { useAuth } from './component/common/AuthProvider'
import PrivateRoutes from './component/common/PrivateRoutes'
import NewPassword from './component/common/NewPassword'
import Accueil from './component/common/Accueil'


function App() {
const {role} = useAuth         // CHECK THE ROLE BASED ROUTES FOR ALL USERS : SUPER ADMIN, ADMIN, PARENT "SEE IF IT WORKS, TEST IT !!"
  return (
    
    <main>
    <Router>
    <AuthProvider> 
   <HideShowComponents>
    <NavBar />
    </HideShowComponents> 
      <Routes>
  
        <Route  path='/' element={<Home />} />
        <Route  path='/signup' element={<Signup />}/>
        <Route  path='/activation' element={<Activation />}/>
        <Route path = '/identification' element={<Identification/>}/> 
        <Route path = '/connexion' element={<Connexion/>}/> 
        <Route path='*' element={<Navigate to='/' />}></Route>
        <Route  path = '/change-password' element={<ChangePassword />} />
        <Route  path = '/new-password' element={<NewPassword />} />
        
        <Route element={<PrivateRoutes />}>  
        <Route  path = '/dashboard' element={<Dashboard />} exact/>                            
        <Route  path = '/logout' element={<Logout />} exact/>
        <Route path='/edit-user' element={<EditUser />} />
        <Route path='/add-student' element={<AddStudent />} />
        <Route path='/student-profile/:id' element={<StudentProfile />} />
        <Route path='/accueil' element={<Accueil />} />
        <Route  path='/edit-student/:id' element={< EditStudent/>} />
        <Route  path='/view-students' element={<StudentsView />} />

        {role === 'SUPER_ADMIN' && (
          <>
          <Route path='/view-users' element={<UsersView />} />  
          <Route  path='/view-user/:id' element={<ViewUser />} />  
          <Route  path='/add-post' element={< AddPost/>} />
          <Route  path='/post-view/:userId' element={< PostView/>} />
          </>
        )}
        {role === 'ADMIN' && (
          <>
          <Route path='/view-users' element={<UsersView />} />
          <Route  path='/view-user/:id' element={<ViewUser />} />
          <Route  path='/add-post' element={< AddPost/>} />
          <Route  path='/post-view/:userId' element={< PostView/>} />
          </>
        )}
          {role === 'PARENT' && (
                <>
                  <Route path='/view-students' element={<StudentsView />} />
                  <Route path='/edit-student/:id' element={<EditStudent />} />
                </>
              )}
        </Route>  
      </Routes>
      </AuthProvider>
    </Router>
    
    </main>
  )
}

export default App