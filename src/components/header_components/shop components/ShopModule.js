import React from "react";
import { ShoppingCartOutlined, LockOpen, Search } from '@material-ui/icons';
import './ShopModule.css';

function ShopModule() {
    return(
        <ul className="shop-container">
            <li><Search style={{ fontSize: 22 }}>Filled</Search></li>
            <li><LockOpen style={{ fontSize: 22 }}>Filled</LockOpen></li>
            <li><ShoppingCartOutlined style={{ fontSize: 22 }}>Filled</ShoppingCartOutlined></li>
        </ul>
        
    )
}

export default ShopModule;