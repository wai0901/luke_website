import React from "react";
import { Link } from "react-router-dom";
import './Menu.css';

function Menu() {
    return(
        <ul className="menu-container">
            <li><Link to="/sales" className="menuLink">sales</Link></li>
            <li><Link to="/women" className="menuLink">women</Link></li>
            <li><Link to="/men" className="menuLink">men</Link></li>
            <li><Link to="/girl" className="menuLink">girl</Link></li>
            <li><Link to="/boy" className="menuLink">boy</Link></li>
            <li><Link to="/baby-girl" className="menuLink">baby girl</Link></li>
            <li><Link to="/baby-boy" className="menuLink">baby boy</Link></li>
            <li><Link to="/mini" className="menuLink">mini</Link></li>
            <li><Link to="/accessories" className="menuLink">accessories</Link></li>
        </ul>
    )
}

export default Menu;