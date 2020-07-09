import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = props => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
            <div className="container">
                <a href="#" className="navbar-brand">
                    <span className="text-uppercase font-weight-bold">Company</span>
                </a>

                <button type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" className="navbar-toggler"><span className="navbar-toggler-icon"></span></button>

                <div id="navbarSupportedContent" className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className={props.active === "/login" ? "nav-item active" : 'nav-item'} onClick={props.onClick}>
                            <Link className="nav-link" to='/login'>Login</Link>
                        </li>
                        <li className={props.active === "/registration" ? "nav-item active" : 'nav-item'} onClick={props.onClick}>
                            <Link className="nav-link" to="/registration">Registration</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;