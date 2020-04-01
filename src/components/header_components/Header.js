import React from "react";
import Menu from "./menu components/Menu";
import Logo from "./Logo";
import ShopModule from "./shop components/ShopModule";
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