import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Home from '../Home/Home'

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={Login} />
            <Route path='/login' component={Login} />
            <Route path='/registration' component={Registration} />
            <Route path='/home' component={Home} />
        </Switch>
    );
}

export default Main;