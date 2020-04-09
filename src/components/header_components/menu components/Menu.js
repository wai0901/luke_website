import React from "react";
import { Link } from "react-router-dom";
import './Menu.css';

const routes = [
    { path: '/women', class: 'menuLink', name: "women"},
    { path: '/men', class: 'menuLink', name: "men"},
    { path: '/girl', class: 'menuLink', name: "girl"},
    { path: '/boy', class: 'menuLink', name: "boy"},
    { path: '/baby-girl', class: 'menuLink', name: "baby girl"},
    { path: '/baby-boy', class: 'menuLink', name: "baby boy"},
    { path: '/mini', class: 'menuLink', name: "mini"},
    { path: '/accessories', class: 'menuLink', name: "accessories"},
]

function Menu(props) {


    const showMenu = {
        top: "0%",
        transition: "all 300ms ease-in-out",
        zIndex: "4"
    }
    const hideMenu = {
        top: "-100%",
        transition: "all 300ms ease-in-out",
        zIndex: "0"
    }

    return(
        <React.Fragment>
        <div className="menu-container" style={props.menuToggle? showMenu: hideMenu}>
            <ul className="menu-group">
                {
                    routes.map(route => (
                        <li key={route.name}><Link to={route.path} className={route.class}
                        onClick={props.linksHandler}
                        >{route.name}</Link></li>
                    ))
                }
            </ul>
        </div>
        </React.Fragment>
    )
}

export default Menu;