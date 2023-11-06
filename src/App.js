import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import Home from './Home';
import UsersView from './component/user/UsersView';
import NavBar from './component/common/NavBar';
import { BrowserRouter  as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
    <Router>
    <NavBar /> 
      <Routes>
        <Route exact path="/" element={<Home />}>
        </Route>
      </Routes>
    </Router>

    <Router>
      <Routes>
        <Route exact path="/view-users" element={<UsersView />}>
        </Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
