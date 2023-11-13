import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Home from './component/common/Home';
import UsersView from './component/user/UsersView';
import NavBar from './component/common/NavBar';
import { BrowserRouter  as Router, Routes, Route} from 'react-router-dom';
import AddUser from './component/user/AddUser';
import EditUser from './component/user/EditUser';
import UserProfile from './component/user/UserProfile';
import HideShowComponents from './component/common/HideShowComponents';

function App() {
  return (
    <main className="container ">
    <Router>
    <HideShowComponents>
    <NavBar />
    </HideShowComponents>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>

        <Route exact path="/view-users" element={<UsersView />}></Route>

        <Route exact path="/add-users" element={<AddUser />}></Route>

        <Route exact path="/edit-user/:id" element={<EditUser />}></Route>

        <Route exact path="/user-profile/:id" element={<UserProfile />}></Route>
      </Routes>
    </Router>
    </main>
  );
}

export default App;
