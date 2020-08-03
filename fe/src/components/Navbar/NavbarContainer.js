import React, { useState } from 'react';
import Navbar from './Navbar';
import { useHistory } from "react-router-dom";

const NavbarContainer = () => {
    const history = useHistory();
    const [active, setActive] = useState(history.location.pathname);
    const onClick = e => {
        const location = history.location.pathname;

        setActive(location);
    }

    return <Navbar onClick={onClick} active={active} />
}

export default NavbarContainer;