import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '/node_modules/bootstrap/dist/js/bootstrap.min.js';
import './App.css';
import UsersView from './component/user/UsersView';

function App() {
  return (
    <div className="App">
    <h2>welcome to ecole front end</h2> 
    <UsersView />
    </div>
  );
}

export default App;
