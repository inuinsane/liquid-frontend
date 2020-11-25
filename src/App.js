import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/Register';
import Home from './components/Layouts/Home';
import { AuthProvider } from './components/Context/AuthContext';
import Dashboard from './components/Layouts/Dashboard';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
