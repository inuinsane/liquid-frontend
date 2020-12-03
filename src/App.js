import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './components/Context/AuthContext';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';


function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/dashboard" component={Dashboard} />
          </Switch>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
