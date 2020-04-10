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
        transition: "all 300ms ease-in-out",
        zIndex: "2"
    }

    const buttonDown = {
        top: "94vh",
        transition: "all 300ms ease-in-out",
        zIndex: "4"
    }

    const indexUp = {
        zIndex: "1"
    }

    const indexDown = {
        zIndex: "8"
    }

    return(
        <div className="header-container"  style={menu? indexUp: indexDown}>
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
                        <p className="menu-button up">menu</p>
                        <p className="menu-button down">close</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Header;