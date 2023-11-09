import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Home from './Home';
import UsersView from './component/user/UsersView';
import NavBar from './component/common/NavBar';
import { BrowserRouter  as Router, Routes, Route} from 'react-router-dom';
import AddUser from './component/user/AddUser';

function App() {
  return (
    <main className="container mt-5">
    <Router>
    <NavBar /> 
      <Routes>
        <Route exact path="/" element={<Home />}></Route>

        <Route exact path="/view-users" element={<UsersView />}></Route>

        <Route exact path="/add-users" element={<AddUser />}></Route>
      </Routes>
    </Router>
    </main>
  );
}

export default App;
