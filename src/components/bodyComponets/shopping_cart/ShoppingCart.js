import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom'

import './ShoppingCart.css';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CheckOutItem from './CheckOutItem';


const mapStateToProps = state => {

    return {
        cart: state.items.cart,
        cartTotal: state.items.cartTotal
    }
}


//Material Ui Style
const useStyles = makeStyles((theme) => ({
    buttonStyle: {
      minWidth: '100px',
      maxWidth: '100px',
      margin: theme.spacing(0.5),
    },
  }));

const ShoppingCart = (props) => {

    // sort the cart items
    const sortedItems = props.cart.sort((a, b) => {
        let itemA = a.productId.toUpperCase();
        let itemB = b.productId.toUpperCase();
        if (itemA < itemB) {
            return -1;
        }
        if (itemA > itemB) {
            return 1;
        }
        return 0;
    });

    const classes = useStyles();

    const history = useHistory();

    const passChangeQty = (event) => {
        props.changeQty(event)
    }

    return (
        <div className="cart-container">
            <div className="top-section">
                <div className="top-container">
                    <div className="button">
                        <Button onClick={() => history.goBack()} variant="outlined" size="small" className={classes.buttonStyle}>Back</Button>
                    </div>
                    <div className="button total">
                        <h1><span>$</span> {(props.cartTotal).toFixed(2)} <span>USD</span></h1>
                    </div>
                    <div className="button">
                        <Button variant="outlined" size="small" className={classes.buttonStyle}>Check Out</Button>
                    </div>
                </div>
            </div>
            <div className="items-container">
                <ul>
                    {
                        sortedItems.map(item => 
                            <CheckOutItem 
                                item={item}
                                passChangeQty={passChangeQty}
                            />)
                    }
                </ul>
                {props.cart.length === 0 && 
                    <div className="empty-cart-message">
                        <h2>Cart is empty</h2>
                    </div>
                }
            </div>
        </div>
    )
}

export default connect(mapStateToProps)(ShoppingCart);