import React, { useState } from "react";
import Menu from "./menu components/Menu";
import Logo from "./Logo";
import ShopModule from "./shop components/ShopModule";
import './Header.css';


function Header(props) {

    const [menu, setMenu] = useState(false);

    const menuHandler = () => {
        setMenu(!menu);
    }

    const linksHandler = () => {
        setMenu(false);
    }

    const buttonUp = {
        top: "-65px",
        // bottom: "unset",
        transition: "all 300ms ease-in-out"
    }

    const buttonDown = {
        top: "94vh",
        // bottom: "-60px",
        transition: "all 300ms ease-in-out"
    }

    return(
        <div className="header-container">
            <section>
                <div className="header">
                    <div className="logo">
                        <Logo />
                    </div>
                    <div className="menu">
                        <Menu 
                            menuToggle={menu}
                            linksHandler={linksHandler}
                        />
                    </div>
                    <div className="shop">
                        <ShopModule cartNum={{...props}}/>
                    </div> 
                </div>
                <div className="m-button-container">
                    <div onClick={menuHandler} className="m-button-group" style={menu? buttonDown: buttonUp}>
                        <a className="menu-button up">menu</a>
                        <a className="menu-button down">close</a>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Header;