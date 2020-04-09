import React, { useState } from 'react';
import './ShoppingCart.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckOutItem from './CheckOutItem';

//Material Ui Style
const useStyles = makeStyles((theme) => ({
    buttonStyle: {
      minWidth: '100px',
      maxWidth: '100px',
      margin: theme.spacing(0.5),
    },
  }));


const ShoppingCart = (props) => {

    const classes = useStyles()
    

    const passChangeQty= (event, id) => {
        props.changeQty(event, id)
    }
    console.log(props)
    return (
        <div className="cart-container">
            <div className="top-section">
                <div className="top-container">
                    <div className="button">
                        <Button variant="outlined" size="small" className={classes.buttonStyle}>Back</Button>
                    </div>
                    <div className="button total">
                        <h1><span>$</span>{(props.total.toFixed(2))} <span>USD</span></h1>
                    </div>
                    <div className="button">
                        <Button variant="outlined" size="small" className={classes.buttonStyle}>Check Out</Button>
                    </div>
                </div>
            </div>
            <div className="items-container">
                <ul>
                    {
                        props.cartItems.map(item => 
                            <CheckOutItem 
                                item={item}
                                passChangeQty={passChangeQty}
                            />)
                    }
                </ul>
            </div>
        </div>
        
    )
}

export default ShoppingCart;