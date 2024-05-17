import './App.css'
import Home from './component/common/Home'
import UsersView from './component/user/UsersView'
import NavBar from './component/common/NavBar'
import { BrowserRouter  as Router, Routes, Route, useParams, Link} from 'react-router-dom'
import AddUser from './component/user/AddUser'
import EditUser from './component/user/EditUser'
import UserProfile from './component/user/UserProfile'
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
import PasswordRefresh from './component/common/PasswordRefresh'
import AuthProvider from './component/common/AuthProvider'
import PrivateRoute from './component/common/PrivateRoute'


function App() {
 
  return (
    <main> {/*  className="container-fluid"*/}
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
        
        <Route element={<PrivateRoute />}>                                               
        <Route path = '/passwordRefresh' element={<PasswordRefresh/>}/>
        </Route>                             {/* ENGLOBE ALL PRIVATE ROUTES THIS MUST BE AT THE BUTTOM */}

        <Route path = '/dashboard' element={<Dashboard/>}/>

        <Route path = '/logout' element={<Logout/>}/>
        
        {/*<Route  path='/add-user' element={<AddUser />}></Route>*/}

        <Route  path='/view-user/:id' element={<ViewUser />}></Route>

        <Route  path='/view-users' element={<UsersView />}> </Route>

        <Route  path='/edit-user/:id' element={<EditUser />}></Route> 

        <Route exact path='/user-profile/:id' element={<UserProfile />}></Route>

        <Route  path='/add-student/:userId' element={<AddStudent />}></Route>

        <Route  path='/view-students' element={<StudentsView />}></Route>

        <Route  path='/student-profile/:userId' element={<StudentProfile />}></Route>

        <Route  path='/edit-student/:id' element={< EditStudent/>}></Route>

        <Route  path='/add-post' element={< AddPost/>}></Route>

        <Route  path='/post-view/:userId' element={< PostView/>}></Route>
     
      </Routes>
      </AuthProvider>
    </Router>
    </main>
  )
}

export default App