import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '/node_modules/bootstrap/dist/js/bootstrap.min.js'
import './App.css'
import Home from './component/common/Home'
import UsersView from './component/user/UsersView'
import NavBar from './component/common/NavBar'
import { BrowserRouter  as Router, Routes, Route} from 'react-router-dom'
import AddUser from './component/user/AddUser'
import EditUser from './component/user/EditUser'
import UserProfile from './component/user/UserProfile'
import AddStudent from './component/student/AddStudent'
import StudentsView from './component/student/StudentsView'
import StudentProfile from './component/student/StudentProfile'
import EditStudent from './component/student/EditStudent'
import HideShowComponents from './component/common/HideShowComponents'

function App() {
  return (
    <main> {/*  className="container-fluid"*/}
    <Router>
    <HideShowComponents>
    <NavBar />
    </HideShowComponents>
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        
        <Route exact path='/add-user' element={<AddUser />}></Route>

        <Route exact path='/view-users' element={<UsersView />}></Route>

        <Route exact path='/edit-user/:id' element={<EditUser />}></Route> 

        <Route exact path='/user-profile/:id' element={<UserProfile />}></Route>

        <Route exact path='/add-student' element={<AddStudent />}></Route>

        <Route exact path='/view-students' element={<StudentsView />}></Route>

        <Route exact path='/student-profile/:id' element={<StudentProfile />}></Route>

        <Route exact path='/edit-student/:id' element={< EditStudent/>}></Route>

      </Routes>
    </Router>
    </main>
  );
}

export default App;
