import './App.css'
import Home from './component/common/Home'
import UsersView from './component/user/UsersView'
import NavBar from './component/common/NavBar'
import { BrowserRouter  as Router, Routes, Route, Navigate, useOutletContext} from 'react-router-dom'
import EditUser from './component/user/EditUser'
import AddStudent from './component/student/AddStudent'
import StudentsView from './component/student/StudentsView'
import StudentProfile from './component/student/StudentProfile'
import EditStudent from './component/student/EditStudent'
import HideShowComponents from './component/common/HideShowComponents'
import AddPost from './component/post/AddPost'
import PostView from './component/post/PostView'
import Signup from './component/common/Signup'
import Activation from './component/common/Activation'
import Connexion from './component/common/Connexion'
import Logout from './component/common/Logout'
import Identification from './component/common/Identification'
import Dashboard from './component/user/Dashboard'
import ChangePassword from './component/common/ChangePassword'
import PrivateRoutes from './component/common/PrivateRoutes'
import NewPassword from './component/common/NewPassword'
import { useAuth } from './component/user/AuthProvider'
import KidsParent from './component/student/KidsParent'
import EditPost from './component/post/EditPost'
import Posts from './component/post/Posts'
import Acces from './component/common/Acces'
import { Classroom } from './component/common/Classroom'
import { AccessCode } from './component/common/AccessCode'



function App() {
  const {role} = useAuth()
  return (
 
    <main> 
     
       
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
        <Route path='/acces' element={<Acces />} />
        <Route  path='/edit-student/:id' element={< EditStudent/>} />
        <Route  path='/posts' element={< Posts/>} />
        <Route  path='/post-view/:id' element={< PostView/>} />
        <Route  path='/accesscode' element={< AccessCode/>} />
        
       { role == 'SUPER_ADMIN' && (
          <> 
          <Route path='/users-view' element={<UsersView />} /> 
          {/*<Route  path='/view-user/:id' element={<ViewUser />} /> */}
          <Route  path='/students-view' element={<StudentsView />} /> 
          <Route  path='/add-post' element={< AddPost/>} />
          <Route  path='/edit-post/:id' element={< EditPost/>} /> 
          <Route  path='/classroom' element={< Classroom/>} /> 
          </>
        )}
        { role == 'ADMIN' && (
          <>
          <Route path='/users-view' element={<UsersView />} /> 
          {/*<Route  path='/view-user/:id' element={<ViewUser />} /> */}
          <Route  path='/students-view' element={<StudentsView />} />
          <Route  path='/add-post' element={< AddPost/>} />
          <Route  path='/edit-post/:id' element={< EditPost/>} />
          <Route  path='/classroom' element={< Classroom/>} />
          </>
        )}
        { role == 'PARENT' && (
          <>
            <Route path='/student-profile/:id' element={<StudentProfile />} />
            <Route path='/kids-parent' element={<KidsParent />} />
            <Route path='/edit-student/:id' element={<EditStudent />} />
            <Route  path='/classroom' element={< Classroom/>} />
          </>
        )}
      </Route>  
      </Routes>


  
    </main>
    
  )
}

export default App