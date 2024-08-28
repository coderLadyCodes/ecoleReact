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
import Signup from './component/security/Signup'
import Activation from './component/security/Activation'
import Connexion from './component/security/Connexion'
import Logout from './component/security/Logout'
import Identification from './component/security/Identification'
import Dashboard from './component/user/Dashboard'
import ChangePassword from './component/security/ChangePassword'
import PrivateRoutes from './component/security/PrivateRoutes'
import NewPassword from './component/security/NewPassword'
import { useAuth } from './component/user/AuthProvider'
import KidsParent from './component/student/KidsParent'
import EditPost from './component/post/EditPost'
import Posts from './component/post/Posts'
import Acces from './component/classroom/Acces'
import Classrooms from './component/classroom/Classrooms'
import { AccessCode } from './component/classroom/AccessCode'
import EditClassroom from './component/classroom/EditClassroom'
import Classroom from './component/classroom/Classroom'
import UsersByClassroomId from './component/user/UsersByClassroomId'
import StudentByClassroom from './component/student/StudentByClassroom'
import StudentsByClassroom from './component/student/StudentsByClassroom'
import UserProfile from './component/user/UserProfile'
import EditUserProfileById from './component/user/EditUserProfileById'
import RegularUpdates from './component/updates/RegularUpdates'
import ShowRegularUpdates from './component/updates/ShowRegularUpdates'
import EditRegularUpdates from './component/updates/EditRegularUpdates'
import RegularUpdatesList from './component/updates/RegularUpdatesList'



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
        <Route path='/student-profile/:id' element={<StudentProfile />} /> {/*MOVE IT TO ADMIN SUPERADMIN PARENT*/}
        <Route path='/acces' element={<Acces />} />
        <Route  path='/edit-student/:id' element={< EditStudent/>} />
        <Route  path='/posts/classroom/:classroomId' element={< Posts/>} />
        <Route  path='/post-view/:id' element={< PostView/>} />
        <Route  path='/accesscode' element={< AccessCode/>} />
        
       { role == 'SUPER_ADMIN' && (
          <> 
          <Route path='/classroom/:classroomId/users' element={<UsersByClassroomId />} />     
          <Route path='/users-view' element={<UsersView />} /> 
          <Route path='/user-profile/:userId' element={<UserProfile />} /> 
          <Route path='/users-classroom' element={<UsersByClassroomId />} />
          <Route  path='/students-view' element={<StudentsView />} /> 
          <Route  path='/classroom/:classroomId/add-post' element={< AddPost/>} />
          <Route  path='/edit-post/:id' element={< EditPost/>} /> 
          <Route  path='/classrooms' element={< Classrooms/>} /> 
          <Route  path='/edit-classroom/:id' element={< EditClassroom/>} /> 
          <Route  path='/classroom/:classroomId' element={< Classroom/>} />
          <Route  path='/classroom/:classroomId/students' element={< StudentsByClassroom/>} />
          <Route  path='/classroom/:classroomId/student/:id' element={< StudentByClassroom/>} /> 
          <Route  path='/edit-user/:userId' element={< EditUserProfileById/>} />
          <Route path='/regular-updates/:studentId' element={< RegularUpdates/>} />
          <Route path='/show-regular-updates/:studentId/ruId' element={< ShowRegularUpdates/>} />
          <Route path='/regular-updates/:studentId/:ruId' element={< EditRegularUpdates/>} /> 
          <Route path='/show-list-updates/:studentId/:ruId' element={< RegularUpdatesList/>} />    
          </>
        )}
        { role == 'ADMIN' && (
          <>
          <Route path='/classroom/:classroomId/users' element={<UsersByClassroomId />} /> 
          <Route path='/user-profile/:userId' element={<UserProfile />} />
          <Route  path='/students-view' element={<StudentsView />} />
          <Route  path='/classroom/:classroomId/add-post' element={< AddPost/>} />
          <Route  path='/edit-post/:id' element={< EditPost/>} />
          <Route  path='/edit-classroom/:id' element={< EditClassroom/>} /> 
          <Route  path='/classroom/:classroomId' element={< Classroom/>} /> 
          <Route  path='/classroom/:classroomId/students' element={< StudentsByClassroom/>} /> 
          <Route  path='/classroom/:classroomId/student/:id' element={< StudentByClassroom/>} /> 
          </>
        )}
        { role == 'PARENT' && (
          <>
            <Route path='/student-profile/:id' element={<StudentProfile />} />
            <Route path='/kids-parent' element={<KidsParent />} />
            <Route path='/edit-student/:id' element={<EditStudent />} />
            <Route path='/classroom/:classroomId' element={< Classroom/>} /> 
            <Route path='/regular-updates/:studentId' element={< RegularUpdates/>} /> 
            <Route path='/show-regular-updates/:studentId/:ruId' element={< ShowRegularUpdates/>} /> 
            <Route path='/regular-updates/:studentId/:ruId' element={< EditRegularUpdates/>} /> 
            <Route path='/show-list-updates/:studentId/:ruId' element={< RegularUpdatesList/>} /> 
          </>
        )}
      </Route>  
      </Routes>


  
    </main>
    
  )
}

export default App