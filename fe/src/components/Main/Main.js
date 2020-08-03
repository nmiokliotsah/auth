import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Home from '../Home/Home'
import withAuth from '../CheckAuth/withAuth';
import withoutAuth from '../CheckAuth/withoutAuth';

const Main = () => {
    return (
        <Switch>
            <Route exact path='/' component={withAuth(Home)} />
            <Route path='/login' component={withoutAuth(Login)} />
            <Route path='/registration' component={withoutAuth(Registration)} />
        </Switch>
    );
}

export default Main;