import React from "react";
import Menu from "./header_components/Menu";
import Logo from "./header_components/Logo";
import ShopModule from "./header_components/ShopModule";
import './Header.css';


function Header() {
    return(
        <div className="header-container">
            <div className="logo">
                <Logo />
            </div>
            <div className="menu">
                <Menu />
            </div>
            <div className="shop">
                <ShopModule />
            </div> 
        </div>
    )
}

export default Header;