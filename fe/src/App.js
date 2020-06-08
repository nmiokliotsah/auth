import React from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import { Switch, Route} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import withAuth from './components/WithAuth/withAuth';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';

function App() {
  return (
    <div className="App">
      <Switch>  
        <Route path="/home" component={withAuth(Home)} />
        <Route path="/" component={Auth} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Registration} />
      </Switch>
    </div>
  );
}

export default App;
