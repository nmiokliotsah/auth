import React from 'react';
import Login from '../Login/Login';
import Registration from '../Registration/Registration';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const Auth = () => {
    return (
        <div>
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Login">
                    <Login />
                </Tab>
                <Tab eventKey="profile" title="Registration">
                    <Registration />
                </Tab>
            </Tabs>
        </div>
    );
}

export default Auth;